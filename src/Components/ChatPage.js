import React from 'react';

import ListUsers from './ListUsers';
import Chat from './Chat';
import '../ComponentsCSS/chatPage.css';

class ChatPage extends React.Component{
    render(){
        return(
            <div id="wrapper-chatpage">
                <div id="wrapper-listusers">
                    <ListUsers/>
                </div>
                <div id="wrapper-chatside">
                    <Chat/>
                </div>
            </div>
        )
    }
}

export default ChatPage;