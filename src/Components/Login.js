import React from "react";
import {Link} from "react-router-dom";

import '../ComponentsCSS/offlineForms.css';
import logo from '../assets/Kwick-logo.png';
import {handleChange} from '../Helpers/helpersComponent'

//REDUX
import {connect} from 'react-redux';
import {toggleConnection} from '../redux/actions'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputIdentifiant: "",
            inputMdp: ""
        }
        this.handleChange = handleChange.bind(this);
    }

    render(){
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">
                        <img src={logo} alt=""/>
                        <h1>Connexion</h1>
                    </div>
                        
                    <form>
                        <input type="text" id="login" className="fadeIn second" name="inputIdentifiant" value={this.state.inputIdentifiant} onChange={this.handleChange} placeholder="Identifiant"/>
                        <input type="password" id="password" className="fadeIn third" name="inputMdp" value={this.state.inputMdp} onChange={this.handleChange} placeholder="Mot de passe"/>
                        <input type="button" className="fadeIn fourth" value="Se connecter"/>
                    </form>
                    
                    <div id="formFooter">
                        <Link to="/signup">Pas encore inscrit ?</Link>
                    </div>

                </div>
            </div> 
        );
    }
}

export default connect(
    null,//Listener
    {toggleConnection}//actions
    )(Login)
;