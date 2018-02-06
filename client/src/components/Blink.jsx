import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Home from './Home.jsx';
import Upload from './Upload.jsx';
import Entities from './Entities.jsx';
import Footer from './Footer.jsx';
import './styles/Blink.scss';

export default function Blink() {
  return (
    <Router>
      <div className="b-app">
        <Header />
        <div className="b-main">
          <Route exact path="/" component={Home} />
          <Route path="/upload" component={Upload} />
          <Route path="/entities" component={Entities} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}
