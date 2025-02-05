import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class SignedInNav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a href="/" className="navbar-item">
                            {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>*/}
                            <h2>Sports Scheduler</h2>
                        </a>

                        {/* <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                           data-target="navbarBasicExample">
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                        </a> */}
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <Link to="/" className="navbar-item">
                                Dashboard
                            </Link>

                            <Link to="/schedule" className="navbar-item">
                                Schedule
                            </Link>

                            <Link to="/employees" className="navbar-item">
                                Employees
                            </Link>

                            <Link to="/settings" className="navbar-item">
                                Settings
                            </Link>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <a href="/" className="button is-light">
                                        Log out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SignedInNav;