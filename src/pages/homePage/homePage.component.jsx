import React from 'react';
import { signOutUserStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

const HomePage = ({signOutUserStart}) => {
    return (
        <div>
            <h1>
                Secret Page
                <Button onClick={() => signOutUserStart()}>SignOut</Button>
             </h1>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOutUserStart: () => dispatch(signOutUserStart())
    }
}

export default connect(null, mapDispatchToProps)(HomePage);