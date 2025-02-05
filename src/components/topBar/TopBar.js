import React from 'react'

export default function TopBar() {
    return (
        <>
        <header className="hero">
        <div className="hero-head">
            <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    {/* <a className="navbar-item is--brand">
                    <img
                        className="navbar-brand-logo"
                        src="<%= data.config.publicPath %>/img/logo-64.png"
                        alt="Brand logo"
                    />
                    </a> */}
                    <h1>Team Vision</h1>

                    <button className="button navbar-burger" data-target="navMenu">
                    <span></span>
                    <span></span>
                    <span></span>
                    </button>
                </div>

                <div className="navbar-menu navbar-end" id="navMenu">
                    {/* <a className="navbar-item nav-tag">
                    <span className="icon is-small">
                        <i className="fa fa-envelope-o animated"></i>
                    </span>
                    <span className="tag is-success counter">2</span>
                    </a>
                    <a className="navbar-item nav-tag">
                    <span className="icon is-small">
                        <i className="fa fa-bell-o animated"></i>
                    </span>
                    <span className="tag is-danger counter">6</span>
                    </a> */}
                    <div className="navbar-item has-dropdown is-hoverable">
                    <a href="#" className="navbar-link">
                        {/* <figure className="image is-32x32" style="margin-right: 0.5em">
                        <img src="https://avatars1.githubusercontent.com/u/7221389?v=4&s=32" /> */}
                        {/* </figure> */}
                        Siman
                    </a>

                    <div className="navbar-dropdown is-right">
                        <a className="navbar-item" href="https://mazipan.space/" target="_blank" rel="noopener noreferrer">
                        <span className="icon is-small">
                            <i className="fa fa-user-o"></i>
                        </span>
                        &nbsp; Profile
                        </a>
                        <hr className="navbar-divider" />
                        <a href="#" className="navbar-item">
                        <span className="icon is-small">
                            <i className="fa fa-power-off"></i>
                        </span>
                        &nbsp; Logout
                        </a>
                    </div>
                    </div>
                </div>
            </nav>
        </div>
        </header>

        </>
    )
}
