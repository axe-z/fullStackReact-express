import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Paiements from './Paiements.js'

class Header extends Component {
  renderContent(){
    //puisque 3 state possible null, good ou false on va mettre un switch, break marche pas..
    switch (this.props.auth) {  //qui est notre user model.
      case null:
        return  //rien a l ecran
      case false:
        return  (<li>
          <a href="/auth/google">Login Avec Google</a>
        </li>)
      default:
        return  [
        <li key={0}><Paiements /></li>,
        <li key={2} style={{margin: '0px 10px 0px 20px', fontWeight: 'bold'}}> Credits: {this.props.auth.credits} </li>,
        <li key={1}><a href="/api/logout" style={{fontWeight: 'bold'}}>Quitter </a></li>
        ]
    }
  }

  render() {
  //  console.log('map', this.props)  //si loguer on a le id, sinon false
    return (
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <Link to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo">  Email-Pro  </Link>
          <ul className="right">
          {this.renderContent()}
            {/* <li>
              <a href="/auth/google">Login Avec Google</a>
            </li> */}
          </ul>
        </div>
      </nav>
    );
  }
}
//mapStateToProps: donne acces au data sur le state
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(Header)
