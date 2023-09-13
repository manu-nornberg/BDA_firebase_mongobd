import React from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'

const Navigation = (props) => ((props.logout) ?
    <div>
        <ul>
            <li>
                <Link to={ROUTES.SIGN_OUT}>Sair</Link>
            </li>
        </ul>
    </div>
    : <></>
)

export default withFirebase(Navigation);