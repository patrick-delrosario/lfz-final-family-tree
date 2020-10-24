import React from 'react';

class Header extends React.Component {
  render() {
    return <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <div className="container bg-info">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="#"><i className="fas fa-street-view"><h5>Family Tree App</h5></i></a>
              <a className="nav-item nav-link active" href="#">My Families <span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link disabled" href="#">Album</a>
              <a className="nav-item nav-link disabled" href="#">Member List</a>
              <a className="nav-item nav-link disabled" href="#">Tree</a>
            </div>
          </div>
        </nav>
      </header>
    </>;
  }
}

export default Header;
