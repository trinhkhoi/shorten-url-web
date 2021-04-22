import React, { useState, useEffect } from 'react'
import HomePage from './shorten-link.js'
import Head from 'next/head'
import axios from 'axios'

export default () => {
  useEffect(() => {
    var storedAccessToken = localStorage.getItem('accessToken')
    if (storedAccessToken) {
      axios('http://localhost:8080/private/authen/verify', {
        headers: {
          Authorization: 'Bearer ' + storedAccessToken
        }
      }).then((res) => {
      }).catch(function (error) {
        if (error.status == 401 || error.status == 403 || typeof error.status === "undefined") {
          localStorage.setItem("accessToken", '')
        }
      });
    }
  },[])
  return (
    <div>
      <Head>
      <title>Example for shorten link</title>
      </Head>
      <HomePage/>
    </div>  
   )
  }