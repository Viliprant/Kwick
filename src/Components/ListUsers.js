import React from 'react';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser} from '../redux/actions'

import '../ComponentsCSS/listUsers.css';
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI';

function User(props){
    return(
        <>
            <div className="wrapper-user">
                <div className="profil-user">
                    <span>{props.username[0].toUpperCase()}</span>
                </div>
                <div className="infos-user">
                    <span>{props.username}</span>
                </div>
            </div>
        </>
    )
}

class ListUsers extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            listLoggedUsers: []
        }
    }

    async getUsersLoggedFromAPI(){
        const token = this.props.token;
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/user/logged';
        console.log("Sendind to API...");
        
        return await promisedJSONP(`${url}/${token}`)
            .then((response) => {
                let usersList = [];
                if(!verifyStateResponse(response))
                {
                    return Promise.reject(usersList);
                }
                usersList = response.result.user;
                return Promise.resolve(usersList);
            })
            .catch(() => {
                const usersList = [];
                return Promise.reject(usersList);
            })
    }

    componentDidMount(){
        this.getUsersLoggedFromAPI()
            .then((usersList)=>{
                this.setState({
                    listLoggedUsers: usersList
                })
            })
            .catch((error) => {
                this.props.disconnectUser();
            })
    }

    render(){
        return(
            <div>
                <div id="wrapper-tittle">
                    <span>Utilisateurs connectés :</span>
                </div>
                <div id="wrapper-list-users">
                    {this.state.listLoggedUsers.map((username) =>
                        <User key={username} username={username} />
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const newState = {...state};
    return {
        token: newState.token
    }
  }

export default connect(
    mapStateToProps,//Listener
    {disconnectUser} //actions
    )(ListUsers)