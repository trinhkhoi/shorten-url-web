import React, { useEffect, useState } from 'react'

export default () => {

    const [accessToken, setAccessToken] = useState('')
    useEffect(() => {
        var storedAccessToken = localStorage.getItem('accessToken')
        if (storedAccessToken) {
            setAccessToken(storedAccessToken)
        }
      }, [])
    return (
        <div>
            <header>
                {/* Start Main menu */}
                <div id="menu_wrapper">
                    <div className="logo_small_wrapper">
                        {/* begin logo */}
                        <a className="logo_link" href="/">
                            <img className="jl_logo_n" src={'https://bondle.app/wp-content/uploads/2019/08/bondle-logo-color.png'} alt="sprasa" />
                        </a>
                        {/* end logo */}
                        <div>
                            <a id="register" href="/register" className="btn btn-primary btn-lg btn-space">Register</a>
                            {!accessToken ? <a href="/login" className="btn btn-primary btn-lg btn-space">Login</a> : ''}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}