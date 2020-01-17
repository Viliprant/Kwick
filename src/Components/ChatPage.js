import React from 'react';

import ListUsers from './ListUsers';
import Chat from './Chat';
import '../ComponentsCSS/chatPage.css';

//REDUX
import {connect} from 'react-redux';

function Profil(props){
    return(
        <div id="wrapper-profil">
            <div id="profil">
                <div id="circle-profil"></div>
                <div id="username-profil">
                    <span>{props.username}</span>
                </div>
            </div>
        </div>
    )
}

class ChatPage extends React.Component{

    render(){
        return(
            <div id="wrapper-chatpage">
                <div id="wrapper-userside">
                    <Profil username={this.props.username}/>
                    <div id="wrapper-listusers">
                        <ListUsers/>
                    </div>
                </div>
                <div id="wrapper-chatside">
                    <Chat/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const newState = {...state};
    return {
        username: newState.username
    }
  }

export default connect(
    mapStateToProps,//Listener
    null //actions
    )(ChatPage)