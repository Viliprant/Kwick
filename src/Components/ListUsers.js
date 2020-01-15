import React from 'react';

import '../ComponentsCSS/listUsers.css';

function Users(props){
    return(
        <>
            <div>

            </div>
        </>
    )
}

class ListUsers extends React.Component{
    render(){
        return(
            <>
                <div id="wrapper-tittle">
                    <span>Utilisateurs connectés :</span>
                </div>
                <Users/>
            </>
        )
    }
}

export default ListUsers;