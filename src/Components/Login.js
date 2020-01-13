import React from "react";

import '../ComponentsCSS/offlineForms.css';

//REDUX
import {connect} from 'react-redux';
import {toggleConnection} from '../redux/actions'

class Login extends React.Component {
    render(){
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">
                        <h1>Connexion</h1>
                    </div>
                        
                    <form>
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="Identifiant"/>
                        <input type="password" id="password" className="fadeIn third" name="login" placeholder="Mot de passe"/>
                        <input type="button" className="fadeIn fourth" value="Se connecter" onClick={this.props.toggleConnection}/>
                    </form>

                </div>
            </div> 
        );
    }
}

export default connect(
    null,//Listener
    {toggleConnection}//actions
)(Login)