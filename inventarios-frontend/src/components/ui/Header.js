import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Inventarios
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-link"
                aria-current="page"
              >
                Activos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/usuarios"
                activeClassName="active"
                className="nav-link"
                aria-current="page"
              >
                Usuarios
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/marcas"
                activeClassName="active"
                className="nav-link "
                aria-current="page"
              >
                Marcas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/estados"
                activeClassName="active"
                className="nav-link "
                aria-current="page"
              >
                Estados
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/tipos"
                activeClassName="active"
                className="nav-link "
                aria-current="page"
              >
                Tipos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export { Header };
