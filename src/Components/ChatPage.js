import React from 'react';

import ListUsers from './ListUsers';
import Chat from './Chat';

class ChatPage extends React.Component{
    render(){
        return(
            <div>
                <div>
                    <ListUsers/>
                </div>
                <div>
                    <Chat/>
                </div>
            </div>
        )
    }
}

export default ChatPage;