import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions'; //import de tout le rep, ouff action et types (nom prefait)
 class Payments extends Component {

  render() {
      // console.log("NOTRE KEY EST", process.env.REACT_APP_STRIPE_KEY )
    return (
      <StripeCheckout
        name = "Email-Pro"
        description = "5$ pour accès a 5 credits courriels"
        //quand on va recevoir le token
        token={token => /*console.log('token est:', token)*/ this.props.handleToken(token)}
        amount={500}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">AJOUT DE CRÉDITS</button>
        </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments)
///////////////////////////////////////////////////////////////////////////////////////////////
                              ///video 96/////
///////////////////////////////////////////////////////////////////////////////////////////////
