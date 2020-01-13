
import React from 'react';

import OfflineRouter from './OfflineRouter';
import OnlineRouter from './OnlineRouter';

//REDUX
import {connect} from 'react-redux';

function ToggleRouter(props)
{
    if(props.isConnected)
    {
        return <OnlineRouter/>
    }

    return <OfflineRouter/>
}

class RouterController extends React.Component{

    render() {

        return(
            <ToggleRouter isConnected={this.props.isConnected}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const newState = {...state};
    return {
        isConnected: newState.isConnected
    }
}

export default connect(
    mapStateToProps,//listener,
    null//actions
)(RouterController);

