import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SideNav = () => {
    const [active, setActive] = useState('');

    const toggleActive = () => {
        if(active === ''){
            setActive('is-active');
        }
        else{
            setActive('');
        }
    }

    return (
        <div>
            {/* <% let isActiveClass = function (menu) { return menu === activeMenu ? 'is-active' : '' } %> */}
            <aside id="main-sidebar" className="aside">
            <nav className="menu active-menu--<%= activeMenu %>">
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li>                    
                        <NavLink className="<%= isActiveClass('home') %>" to={"/"}>
                            <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Dashboard</span>
                        </NavLink>
                    </li>
                    </ul>
                    <p className="menu-label">Schedule</p>
                    <ul className="menu-list">
                    <li>
                        <NavLink className="<%= isActiveClass('home') %>" to={"/schedule"}>
                            <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Schedule</span>
                        </NavLink>               
                    </li>
                    <li>
                        <NavLink className="<%= isActiveClass('home') %>" to={"/createGame"}>
                            <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Add Game</span>
                        </NavLink>               
                    </li>
                    
                    <li>
                        <NavLink className="<%= isActiveClass('home') %>" to={"/export"}>
                            <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Export</span>
                        </NavLink>
                    </li>
                    
                </ul>

                <p className="menu-label">Employees</p>
                <ul className="menu-list">
                <li>
                    <NavLink className="<%= isActiveClass('home') %>" to={"/employees"}>
                        <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Employees</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="<%= isActiveClass('home') %>" to={"/availability"}>
                        <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Availability</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink className="<%= isActiveClass('home') %>" to={"/createEmployee"}>
                        <span className="icon is-small"><i className="fa fa-tachometer"></i></span> <span className="menu-text">Add Employee</span>
                    </NavLink>
                </li>
                </ul>

            </nav>

            <div id="sidebar-toggler">
                <span className="icon is-small"><i className="fa fa-angle-double-left"></i></span>
            </div>
        </aside>     
        </div>
    )
}

export default SideNav;