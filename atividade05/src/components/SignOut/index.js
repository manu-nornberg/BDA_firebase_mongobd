import React, { useEffect } from 'react';
import { useNavigate} from 'react-router';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'

const SignOut = (props)=>{
    props.firebase.doSignOut()
    const navigate = useNavigate()

    useEffect(() => {
        navigate(ROUTES.LANDING)
    }, []);
    
    return (<></>)   
}

export default withFirebase(SignOut);