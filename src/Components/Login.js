import React from "react";

import '../ComponentsCSS/offlineForms.css';

export default class Login extends React.Component {

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
                        <input type="submit" className="fadeIn fourth" value="Se connecter"/>
                    </form>

                </div>
            </div> 
        );
    }
}
