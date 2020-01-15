import React from 'react';

import '../ComponentsCSS/chat.css';

function Message(props){
    return(
        <div className="wrapper-message">
            <div className="author-message">
                Pierre
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
    render(){
        return(
            <div id="wrapper-chat">
                <div id="wrapper-list-message">
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
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

export default Chat;