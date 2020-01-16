import React from 'react';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser, updateTimeStamp} from '../redux/actions';

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
        this.refresh = setInterval(()=>{
            this.updateUsersLogged();
        }, 1000);
    }

    updateUsersLogged(){
        this.getUsersLoggedFromAPI()
            .then((usersList)=>{
                this.setState({
                    listLoggedUsers: usersList
                });
                this.props.updateTimeStamp();

            })
            .catch((error) => {
                this.props.disconnectUser();
            })
    }

    async getUsersLoggedFromAPI(){
        const token = this.props.token;
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/user/logged';
        
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
        this.updateUsersLogged();
    }

    componentWillUnmount(){
        clearInterval(this.refresh);
    }

    render(){
        return(
            <div>
                <div id="wrapper-tittle">
                    <span>Utilisateurs connectés :</span>
                </div>
                <div id="wrapper-list-users">
                    {this.state.listLoggedUsers.map((username) =>{
                        if(username !== this.props.username)
                        {
                            return <User key={username} username={username} />
                        }
                        return false;
                    }
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const newState = {...state};
    return {
        token: newState.token,
        username: newState.username
    }
  }

export default connect(
    mapStateToProps,//Listener
    {disconnectUser, updateTimeStamp} //actions
    )(ListUsers)