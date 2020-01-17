
import React from 'react';

import {isToday} from '../Helpers/helpersComponent';

function Message(props){

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

export default Message;