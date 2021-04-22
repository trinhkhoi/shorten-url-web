import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>

          {/* CSS here */}
          <link rel="stylesheet" href="/css/bootstrap.css"/>
          <link rel="stylesheet" href="/css/style.css"/>
          <link rel="stylesheet" href="/css/responsive.css"/>
        </Head>
        <body className="mobile_nav_class jl-has-sidebar">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default MyDocument