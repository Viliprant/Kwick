import React from "react";
import {Link} from "react-router-dom";

import '../ComponentsCSS/offlineForms.css';
import logo from '../assets/Kwick-logo.png';

class SignUp extends React.Component {

    onSubmitSignUp(event){
        event.preventDefault();
        console.log(event)
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
                        <input type="text" id="login" className="fadeIn second" name="login" placeholder="Identifiant"/>
                        <input type="password" id="password" className="fadeIn third" name="login" placeholder="Mot de passe"/>
                        <input type="password" id="confirmPassword" className="fadeIn fourth" name="login" placeholder="Confirmer le mot de passe"/>
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