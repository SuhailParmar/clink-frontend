import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css'

const Navigation = ({ routes }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    {/* Toggle */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    {/* Menu */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          {routes.map(r =>
            <NavLink to={r.endpoint} className="nav-link" key={r.endpoint}>
              {r.name}
            </NavLink>
          )}
        </li>
      </ul>
    </div>
  </nav>
)

export default Navigation;
