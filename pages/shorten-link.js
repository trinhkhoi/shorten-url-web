import React, { useEffect, useState } from 'react'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import GenerateShortLink from '../components/GenerateShortLink.js'
import RevertShortLink from '../components/RevertShortLink.js'
import axios from 'axios'

export default () => {

  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [histories, setHistories] = useState([])
  const [accessToken, setAccessToken] = useState('')
  const [validateOriginalUrlMessage, setValidateOriginalUrlMessage] = useState('')

  useEffect(() => {
    var storedAccessToken = localStorage.getItem('accessToken')
    if (storedAccessToken) {
      setAccessToken(storedAccessToken)
      getHistoryShortUrlByCustomer(storedAccessToken)
    } else {
      getHistoryShortUrlByDefault()
    }
  }, [])

  /** Get all history short urls by customer */
  function getHistoryShortUrlByCustomer(storedAccessToken) {
    axios(`http://localhost:8080/private/url/shorten/histories`, {
      headers: {
        Authorization: 'Bearer ' + storedAccessToken
      }
      })
    .then(function (response) {
      console.log(response)
      if (response.data.data) {
        const historyLinks = JSON.parse(response.data.data)
        setHistories(historyLinks)
      }
    })
    .catch(function (error) {
      if (error.status == 401 || error.status == 403 || typeof error.status === "undefined") {
        localStorage.setItem("accessToken", '')
      }
    });
  }

  /** get history short urls which store on localstorage */
  function getHistoryShortUrlByDefault() {
    var existedLinks = localStorage.getItem('links')
    if (!existedLinks) {
      localStorage.setItem('links', JSON.stringify([]))
    } else {
      const historyLinks = JSON.parse(existedLinks)
      setHistories(historyLinks)
    }
  }

  /** Generate short url without special customer */
  function onGenerateShortLinkPublic(e) {
    e.preventDefault()
    if (validateInputOriginalUrl()) {
      axios.post(`http://localhost:8080/public/url/shorten`, {
        longUrl: longUrl
      })
      .then(function (response) {
        handleResponseGenerateShortLink(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  /** Generate short url for special customer */
  function onGenerateShortLinkPrivate(e) {
    e.preventDefault()
    if (validateInputOriginalUrl()) {
      axios.post(`http://localhost:8080/private/url/shorten`, 
        {
          longUrl: longUrl
        }, 
        {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        }
      )
      .then(function (response) {
        handleResponseGenerateShortLink(response)
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  /** Validate input original url */
  function validateInputOriginalUrl() {
    setValidateOriginalUrlMessage('')
    if (longUrl) {
      return true
    }

    /** Set error messsage */
    setValidateOriginalUrlMessage('The original url is required')
    return false
  }

  /** Handle response after generating short url */
  function handleResponseGenerateShortLink(response) {
    setShortUrl(response.data.data)
    let isCheck = histories.find((item) => item.shortUrl === response.data.data)
    console.log(histories)
    console.log(isCheck)
    if (!isCheck || isCheck.length === 0) {
      var newShortLink = {shortUrl: response.data.data, longUrl }
      setHistories([...histories, newShortLink])
      const historyLinks = JSON.parse(localStorage.getItem('links'))
      historyLinks.push(newShortLink)
      localStorage.setItem('links', JSON.stringify(historyLinks))
    }
  }

  return (
    <div>
      <Header />
      <div className="jl_home_bw">
        <GenerateShortLink 
          setLongUrl={setLongUrl} 
          shortUrl={shortUrl} 
          onGenerateShortLink={accessToken ? onGenerateShortLinkPrivate : onGenerateShortLinkPublic}
          validateOriginalUrlMessage={validateOriginalUrlMessage} />
        <RevertShortLink />
        <section className="home_section2">
          <div className="history-short-link">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Short Url History</th>
                </tr>
              </thead>
              <tbody>
                { histories.map((item, i) => (
                  <tr key={i}>
                    <td><a href={`${item.longUrl}`}>{item.shortUrl}</a></td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </section>
      </div>
      {/* end content */}
      <Footer />
    </div>
  )
}