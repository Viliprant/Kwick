import React from 'react';

import '../ComponentsCSS/listUsers.css';

function User(props){
    return(
        <>
            <div className="wrapper-user">
                <div className="profil-user">
                    <span>{props.username[0]}</span>
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
            listLoggedUsers: [{id:1,username: "Albert"}, {id:2,username: "Gertrude"}, {id:3,username: "Constantin"}, {id:4,username: "Giselle"}]
        }
    }

    render(){
        return(
            <div>
                <div id="wrapper-tittle">
                    <span>Utilisateurs connectés :</span>
                </div>
                <div id="wrapper-list-users">
                    {this.state.listLoggedUsers.map((user) =>
                        <User key={user.id.toString()} username={user.username} />
                    )}
                </div>
            </div>
        )
    }
}

export default ListUsers;