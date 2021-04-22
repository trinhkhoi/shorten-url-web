import React, {useState } from 'react'
import axios from 'axios'
function RevertShortLink() {

    const [shortUrl, setShortUrl] = useState('')
    const [originalUrl, setOriginalUrl] = useState('')
    const [message, setMessage] = useState('')
    const [validateShortUrlMessage, setValidateShortUrlMessage] = useState('')
    function onRevertShortLink(e) {
        e.preventDefault()
        clearMessage()
        if (shortUrl) {
            axios(`http://localhost:8080/public/url/revert?shortUrl=${shortUrl}`).then(function (response) {
                setOriginalUrl(response.data.data)
            }).catch(function (error) {
            console.log(error.response.data.message);
            if(error.response.status === 400) {
                setMessage(error.response.data.message)
            }
            });
        } else {
            setValidateShortUrlMessage('The short url is required')
        }
    }

    function clearMessage() {
        setMessage('')
        setValidateShortUrlMessage('')
    }

    return (
        <div>
            <section className="home_section1">
                <form action="#" method="POST" onSubmit={onRevertShortLink}>
                    <div className="mb-4">
                        <label><strong>Short Url</strong></label>
                        <input className="form-control" id="shortUrl" type="text" name="shortUrl" placeholder="Please enter a short URL ..." onChange={(e) => setShortUrl(e.target.value)}/>
                        <label className="text-danger"><i>{validateShortUrlMessage}</i></label>
                    </div>
                    <div className="btn-action">
                        <button className="btn btn-primary btn-lg">Revert</button>
                    </div>
                    <label className="text-danger"><i>{message}</i></label>
                    <div className="result-info">
                        <label><strong>Original Url</strong><i className="lni lni-user"></i></label><br/>
                        <label className="lbl-short-url"><a href={`${originalUrl}`}>{originalUrl}</a><i className="lni lni-user"></i></label>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default RevertShortLink