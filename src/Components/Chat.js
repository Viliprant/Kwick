import React from 'react';

import '../ComponentsCSS/chat.css';
import {promisedJSONP, verifyStateResponse} from '../Helpers/helpersAPI';
import {getTimestampOfDay} from '../Helpers/helpersComponent';

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
            const options = { hour: 'numeric', minute:'numeric' };
            dateToReturn = date.toLocaleDateString('fr-FR', options);
            dateToReturn = dateToReturn.slice(dateToReturn.length - 5);
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
            <div style={{position:"relative"}}>
                <p className="content-message">
                    {props.infosMessages.content}
                </p>
                <div className="triangle"></div>
            </div>
            
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
        this.textareaMessage = React.createRef();
        this.divChat = React.createRef(); // for scroll
    }

    updateMessage(){
        this.getMessagesFromAPI()
            .then((listMessages)=>{
                this.setState({
                    listMessages: listMessages
                });
                this.props.updateTimeStamp();
                this.divChat.current.scrollTo(0, this.divChat.current.scrollHeight - 650);
            })
    }

    async getMessagesFromAPI(){
        const token = this.props.token;
        const timestamp = getTimestampOfDay(new Date());
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
            this.updateMessage();
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
            this.updateMessage();
        }
    }

    componentDidMount(){
        this.updateMessage();
    }

    render(){
        return(
            <div id="wrapper-chat">
                <div id="wrapper-list-message" ref={this.divChat} 
                onScroll={this.getScrollbarPosition}>
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