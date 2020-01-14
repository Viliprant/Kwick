import React from "react";
import {Link} from "react-router-dom";

import '../ComponentsCSS/offlineForms.css';
import logo from '../assets/Kwick-logo.png';
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI';
import {handleChange} from '../Helpers/helpersComponent'

//REDUX
import {connect} from 'react-redux';
import {connectUser} from '../redux/actions'

class Login extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputIdentifiant: "",
            inputMdp: ""
        }
        this.handleChange = handleChange.bind(this);
    }

    onSubmitLogin = async (event) => {
        event.preventDefault();
        const userData = await this.verifyConnection();
        if(userData !== false)
        {
            console.log('Change Store...');
            this.props.connectUser(userData);
        }
    }

    verifyConnection = async () => {
        const formValue = {...this.state};

        //Vérifier le contenu pour l'identifiant
        if(formValue.inputIdentifiant.length === 0)
        {
            console.log('Le champ "identifiant" doit être rempli.')
            return false;
        }

        //Vérifier le contenu pour le mot de passe
        if(formValue.inputMdp.length === 0)
        {
            console.log('Le champ "Mot de passe" doit être rempli.')
            return false;
        }

        const userData = await this.sendConnectionToAPI(formValue.inputIdentifiant, formValue.inputMdp);
        if(userData === false)
        {
            return false
        }

        return userData;
    }

    sendConnectionToAPI = async (identifiant, mdp) => {
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/login';
        console.log("Sendind to API...");
        
        return await promisedJSONP(`${url}/${identifiant}/${mdp}`)
            .then((response) => {
                if(!verifyStateResponse(response))
                {
                    return false
                }

                const userData = {
                    id: response.result.id,
                    token: response.result.token
                }
                return userData;
            })
            .catch(() => {
                return false;
            })
    }

    render(){
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">

                    <div className="fadeIn first">
                        <img src={logo} alt=""/>
                        <h1>Connexion</h1>
                    </div>
                        
                    <form onSubmit={this.onSubmitLogin}>
                        <input type="text" id="login" className="fadeIn second" name="inputIdentifiant" value={this.state.inputIdentifiant} onChange={this.handleChange} placeholder="Identifiant"/>
                        <input type="password" id="password" className="fadeIn third" name="inputMdp" value={this.state.inputMdp} onChange={this.handleChange} placeholder="Mot de passe"/>
                        <input type="submit" className="fadeIn fourth" value="Se connecter"/>
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
    {connectUser}//actions
    )(Login)