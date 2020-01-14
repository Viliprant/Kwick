import React from "react";
import {Link} from "react-router-dom";

import '../ComponentsCSS/offlineForms.css';
import logo from '../assets/Kwick-logo.png';
import promisedJSONP from '../Helpers/promisedJsonp';

class SignUp extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            inputIdentifiant: "",
            inputMdp: "",
            inputConfirmMdp: ""
        }
    }

    onSubmitSignUp = event => {
        event.preventDefault();
        const isValid = this.verifyRegistration();
        if(isValid)
        {
            console.log('isValid:',isValid)
        }
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    sendRegistrationToAPI = (identifiant, mdp) => {
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/signup';
        console.log("Sendind to API...");
        
        promisedJSONP(`${url}/${identifiant}/${mdp}`)
            .then((response) => {
                console.log('Response:', response);
            })
    }

    verifyRegistration = () => {
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

        this.sendRegistrationToAPI(formValue.inputIdentifiant, formValue.inputMdp);

        return true;
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

export default SignUp;