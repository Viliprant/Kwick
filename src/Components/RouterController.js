
import React from 'react';

import OfflineRouter from './OfflineRouter';
import OnlineRouter from './OnlineRouter';

function ToggleRouter(props)
{
    if(props.isConnected)
    {
        return <OnlineRouter/>
    }

    return <OfflineRouter/>
}

export default class RouterController extends React.Component{

    constructor(props) {
        super(props);
        this.state = {isConnected: false};
    }

    render() {

        return(
            <ToggleRouter isConnected={this.state.isConnected}/>
        )
    }
}

