import React from 'react'
function GenerateShortLink({ setLongUrl, shortUrl, onGenerateShortLink, validateOriginalUrlMessage }) {

    return (
        <div>
            <section className="home_section1">
                <form action="#" method="POST" onSubmit={onGenerateShortLink}>
                    <div className="mb-4">
                        <label><strong>Original Url</strong><i className="lni lni-user"></i></label>
                        <input className="form-control" id="longUrl" type="text" name="longUrl" placeholder="Please enter a original URL ..." onChange={(e) => setLongUrl(e.target.value)}/>
                        <label className="text-danger"><i>{validateOriginalUrlMessage}</i></label>
                    </div>
                    <div className="btn-action">
                        <button className="btn btn-primary btn-lg">Shorten</button>
                    </div>
                    <div className="result-info">
                        <label><strong>Short Url</strong><i className="lni lni-user"></i></label><br/>
                        <label className="lbl-short-url"><a href={`${shortUrl}`}>{shortUrl}</a><i className="lni lni-user"></i></label>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default GenerateShortLink