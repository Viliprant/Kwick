import React from 'react';

import '../ComponentsCSS/chat.css';

//REDUX
import {connect} from 'react-redux';
import {disconnectUser, updateTimeStamp} from '../redux/actions';

function Message(props){
    return(
        <div className={"wrapper-messages " + (props.isOwnMessage ? 'own-messages' : 'other-messages')}>
            <div className="author-message">
                {props.isOwnMessage ? '' : 'Pierre'}
            </div>
            <p className="content-message">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sapien augue, vestibulum nec molestie vitae, malesuada in massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas dignissim varius fringilla. Nam elementum dapibus enim at bibendum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi accumsan, augue vel hendrerit sodales, ante nunc rutrum orci, et porttitor velit metus eu dolor. Donec luctus ante non nunc molestie, eget euismod neque aliquet. Suspendisse gravida odio metus, vitae mattis metus euismod cursus. Maecenas interdum, nunc ut blandit commodo, arcu justo ornare ante, et venenatis leo quam eu diam. Nulla facilisis tristique lorem et dapibus.
            </p>
            <div className="date-message">
                12:30
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

    render(){
        return(
            <div id="wrapper-chat">
                <div id="wrapper-list-message">
                    <Message isOwnMessage={true}/>
                    <Message isOwnMessage={false}/>
                    <Message isOwnMessage={true}/>
                    <Message isOwnMessage={false}/>
                    <Message isOwnMessage={false}/>
                    <Message isOwnMessage={true}/>
                    <Message isOwnMessage={false}/>
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