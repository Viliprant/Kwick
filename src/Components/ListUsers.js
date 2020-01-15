import React from 'react';

import '../ComponentsCSS/listUsers.css';

function Users(props){
    return(
        <>
            <div className="wrapper-user">

            </div>
        </>
    )
}

class ListUsers extends React.Component{
    render(){
        return(
            <div>
                <div id="wrapper-tittle">
                    <span>Utilisateurs connectés :</span>
                </div>
                <div id="wrapper-list-users">
                    <Users/>
                    <Users/>
                    <Users/>
                </div>
            </div>
        )
    }
}

export default ListUsers;