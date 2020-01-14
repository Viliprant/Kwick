import React from "react";
import {Link} from "react-router-dom";

import '../ComponentsCSS/offlineForms.css';
import logo from '../assets/Kwick-logo.png';

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
        this.verifyRegistration();
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        });
    }

    verifyRegistration(){
        console.log("Vérifié");
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