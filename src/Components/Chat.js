import React from 'react';

import '../ComponentsCSS/chat.css';
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser, updateTimeStamp} from '../redux/actions';

function Message(props){

    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
      }

    const convertTimestampToDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // en milisecondes
        let dateToReturn = date;
        if(isToday(date))
        {
            dateToReturn = `${date.getHours()}:${date.getMinutes()}`;
        }
        else{
            const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute:'numeric' };
            dateToReturn = date.toLocaleDateString('fr-FR', options);
        }
        return dateToReturn;
    }

    return(
        <div className={"wrapper-messages " + (props.isOwnMessage ? 'own-messages' : 'other-messages')}>
            <div className="author-message">
                {props.isOwnMessage ? '' : props.infosMessages.user_name}
            </div>
            <p className="content-message">
                {props.infosMessages.content}
            </p>
            <div className="date-message">
                {convertTimestampToDate(props.infosMessages.timestamp)}
            </div>
        </div>
    )
}

class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            listMessages: []
        }
    }

    async getMessagesFromAPI(){
        const token = this.props.token;
        const timestamp = 0;
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/talk/list';
        console.log("Sendind to API...");
        
        return await promisedJSONP(`${url}/${token}/${timestamp}`)
            .then((response) => {
                let listMessages = [];
                if(!verifyStateResponse(response))
                {
                    return Promise.reject(listMessages);
                }
                listMessages = response.result.talk;
                return Promise.resolve(listMessages);
            })
            .catch(() => {
                const listMessages = [];
                return Promise.reject(listMessages);
            })
    }

    componentDidMount(){
        this.getMessagesFromAPI()
            .then((listMessages)=>{
                this.setState({
                    listMessages: listMessages
                });
                this.props.updateTimeStamp();

            })
            .catch((error) => {
                this.props.disconnectUser();
            })
    }

    render(){
        return(
            <div id="wrapper-chat">
                <div id="wrapper-list-message">
                    {this.state.listMessages.map((message, index) =>
                        <Message key={index} infosMessages={message} isOwnMessage={false} />
                    )}
                </div>
                <div id="wrapper-send-text-area">
                    <textarea id="send-text-area"></textarea>
                    <div id="send-input">

                    </div>
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
    {disconnectUser, updateTimeStamp} //actions
    )(Chat)