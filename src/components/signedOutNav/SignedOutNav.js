import React, {Component} from 'react';

class SignedOutNav extends Component {
    render() {
        return (
            <div>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item">
                            {/*<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>*/}
                            <h2>Sports Scheduler</h2>
                        </span>

                        <span role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                           data-target="navbarBasicExample">
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                            <span aria-hidden="true"/>
                        </span>
                    </div>
                </nav>
            </div>
        );
    }
}

export default SignedOutNav;