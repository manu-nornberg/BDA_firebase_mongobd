import React from 'react';
import { Navigate } from 'react-router';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'
import ListProds from './listProds'
import Navigation from '../Navigation';

function Home(props) {

    return ((props.firebase.isLogged) ?
        <div >
            <div className='titlePage'>
                <div className='logout'>
                    <Navigation logout={true} />
                </div>
                Produtos
            </div>
            <ListProds firebase={props.firebase}></ListProds>
        </div>
        : <Navigate to={ROUTES.SIGN_IN} />
    );
}

const HomePage = withFirebase(Home)
export default HomePage;