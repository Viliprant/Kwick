import React from 'react';

import '../ComponentsCSS/chat.css';
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI';
import Message from './Message';
import {isToday, getTimestampOfDay} from '../Helpers/helpersComponent';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser, updateTimeStamp} from '../redux/actions';

class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            listMessages: []
        }
        this.textareaMessage = React.createRef();
        this.divChat = React.createRef(); // for scroll
        this.isComponentMounted = true; // for asyn functions
        this.timestampOlderMessage = new Date();
    }

    updateMessage(newtimestampOlderMessage){
        const timestampOlderMessage = newtimestampOlderMessage;
        const previousScrollPositionFromBottom = this.divChat.current.scrollHeight;
        this.getMessagesFromAPI(timestampOlderMessage)
            .then((listMessages)=>{
                if(this.isComponentMounted)
                {
                    this.setState({
                    listMessages: listMessages
                    });
                    this.props.updateTimeStamp();
                    if(isToday(timestampOlderMessage))
                    {
                        this.divChat.current.scrollTo(0, this.divChat.current.scrollHeight - 650);
                    }
                    else{
                        this.divChat.current.scrollTo(0, this.divChat.current.scrollHeight - previousScrollPositionFromBottom);
                    }
                }
                
            })
    }

    async getMessagesFromAPI(newtimestampOlderMessage){
        const token = this.props.token;
        const timestampOlderMessage = newtimestampOlderMessage;
        const timestamp = getTimestampOfDay(timestampOlderMessage);
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/talk/list';
        
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

    onClickSendMessage= async () => {
        const message = encodeURI(this.textareaMessage.current.value);
        const stateRequest = await this.sendMessagesToAPI(message);
        if(stateRequest)
        {
            this.props.updateTimeStamp();
            this.updateMessage(this.timestampOlderMessage);
            this.textareaMessage.current.value = "";
        }
    }

    async sendMessagesToAPI(message){
        const token = this.props.token;
        const id = this.props.id;
        const messageToSend = message;
        const url = 'http://greenvelvet.alwaysdata.net/kwick/api/say';
        
        return await promisedJSONP(`${url}/${token}/${id}/${messageToSend}`)
            .then((response) => {
                if(!verifyStateResponse(response))
                {
                    return false;
                }
                return true;
            })
            .catch(() => {
                return false;
            })
    }

    getScrollbarPosition = (event) => {
        const isDown = event.target.scrollHeight - event.target.scrollTop === this.divChat.current.clientHeight;
        if(isDown)
        {
            this.refreshChat();
        }
    }

    refreshChat = () => {
        this.timestampOlderMessage = new Date();
        this.updateMessage(this.timestampOlderMessage);
    }

    getOlderMessages = () => {
        this.timestampOlderMessage = new Date((getTimestampOfDay(this.timestampOlderMessage) - 1) * 1000);
        this.updateMessage(this.timestampOlderMessage);
    }

    componentDidMount(){
        this.updateMessage(this.timestampOlderMessage);
    }

    componentWillUnmount(){
        this.isComponentMounted = false;
    }

    render(){
        return(
            <div id="wrapper-chat">
                <div id="wrapper-list-message" ref={this.divChat} 
                onScroll={this.getScrollbarPosition}>
                    <div id="wrapper-options">
                        <div id="button-getoldermesasges" onClick={this.getOlderMessages}>
                            <span>Voir les messages précédents</span>
                        </div>
                        <div id="button-refresh" onClick={this.refreshChat}>
                            <span>Ré-actualiser</span>
                        </div>
                    </div>
                    {this.state.listMessages.map((message, index) =>
                        <Message key={index} infosMessages={message} isOwnMessage={this.props.username === message.user_name} />
                    )}
                </div>
                <div id="wrapper-send-text-area">
                    <textarea id="send-text-area" name="textareaMessage" ref={this.textareaMessage} ></textarea>
                    <div id="send-input" onClick={this.onClickSendMessage}></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const newState = {...state};
    return {
        token: newState.token,
        id: newState.id,
        username: newState.username
    }
  }

export default connect(
    mapStateToProps,//Listener
    {disconnectUser, updateTimeStamp} //actions
    )(Chat)