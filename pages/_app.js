import React from 'react'
import App, { Container } from 'next/app'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'react-widgets/dist/css/react-widgets.css';
// Import the CSS
config.autoAddCss = false

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp