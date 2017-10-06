
import React, {Component} from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions'; //import de tout le rep, ouff action et types (nom prefait)
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';




class App extends Component {
  componentDidMount(){    //bonne place pour faire un call ajax.
    this.props.fetchUser('App regarde si y a un utilisateur actuel');
  }
  render() {
    return (

         <BrowserRouter>
           <div className="container">
           <Header /> {/* va etre partout  */}
            <Route exact={true} path="/" component={Landing} /> {/*ou juste exact */}
           <Route exact path="/surveys" component={Dashboard} />   {/*on voit landing si pas EXACT / est dans le chemin  */}
           <Route path="/surveys/new" component={SurveyNew} /> {/*Dashboard est inclut si pas exact a Dashboard */}
           </div>
         </BrowserRouter>

    );
  }
}


//mapStateToProps est pas utilisé donc null. mapDispatchToProps met sur props nos actions , puisque notre action dispatch  au reducer , on passe actions directement (call ajax axios)
export default connect(null, actions)(App)
