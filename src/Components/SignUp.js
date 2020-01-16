import React from "react";
import {Link} from "react-router-dom";

import '../ComponentsCSS/offlineForms.css';
import logo from '../assets/Kwick-logo-144.png';
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI';
import {handleChange} from '../Helpers/helpersComponent'

//REDUX
import {connect} from 'react-redux';
import {connectUser} from '../redux/actions'

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputIdentifiant: "",
            inputMdp: "",
            inputConfirmMdp: ""
        }
        this.handleChange = handleChange.bind(this);
    }

    onSubmitSignUp = async (event) => {
        event.preventDefault();
        const userData = await this.verifyRegistration();
        if(userData !== false)
        {
            this.props.connectUser(userData);
        }
    }

    verifyRegistration = async () => {
        const formValue = {...this.state};

        //Minimum 8 caractères
        if(formValue.inputMdp.length < 8)
        {
            console.log('8 caractères minimum. Actuel:', formValue.inputMdp.length)
            return false;
        }

        //Coherence des deux mots de passe
        if(formValue.inputMdp !== formValue.inputConfirmMdp)
        {
            console.log('Les deux mots de passe ne correspondent pas.')
            return false;
        }

        const userData = await this.sendRegistrationToAPI(formValue.inputIdentifiant, formValue.inputMdp);
        if(userData === false)
        {
            return false
        }

        return userData;
    }

    sendRegistrationToAPI = async (identifiant, mdp) => {
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/signup';
        
        return await promisedJSONP(`${url}/${identifiant}/${mdp}`)
            .then((response) => {
                if(!verifyStateResponse(response))
                {
                    return false
                }

                const userData = {
                    id: response.result.id,
                    token: response.result.token,
                    username: this.state.inputIdentifiant
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
                        <h1>Inscription</h1>
                    </div>
                        
                    <form onSubmit={this.onSubmitSignUp}>
                        <input type="text" id="login" className="fadeIn second" name="inputIdentifiant" value={this.state.inputIdentifiant} onChange={this.handleChange} placeholder="Identifiant"/>
                        <input type="password" id="password" className="fadeIn third" name="inputMdp" value={this.state.inputMdp} onChange={this.handleChange} placeholder="Mot de passe"/>
                        <input type="password" id="confirmPassword" className="fadeIn fourth" name="inputConfirmMdp" value={this.state.inputConfirmMdp} onChange={this.handleChange} placeholder="Confirmer le mot de passe"/>
                        <input type="submit" className="fadeIn fifth" value="S'inscrire"/>
                    </form>

                    <div id="formFooter">
                        <Link to="/">Déjà inscrit ?</Link>
                    </div>

                </div>
            </div> 
        );
    }
}

export default connect(
    null,//Listener
    {connectUser}//actions
    )(SignUp)