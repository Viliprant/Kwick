
import React from 'react';

import OfflineRouter from './OfflineRouter';
import OnlineRouter from './OnlineRouter';

//REDUX
import {connect} from 'react-redux';

function ToggleRouter(props)
{
    if(props.id != null)
    {
        return <OnlineRouter/>
    }

    return <OfflineRouter/>
}

class RouterController extends React.Component{

    render() {

        return(
            <ToggleRouter id={this.props.id}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const newState = {...state};
    return {
        id: newState.id,
        token: newState.token
    }
}

export default connect(
    mapStateToProps,//listener,
    null//actions
)(RouterController);

