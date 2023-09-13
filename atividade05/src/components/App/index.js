import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import SignUpPage from '../SignUp'
import SignInPage from '../SignIn'
import HomePage from '../Home'
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'
import SignOut from '../SignOut';

const application = (props) => (
    <Router>
        <div>
            <Routes>
                <Route exact path={ROUTES.SIGN_UP} element={<SignUpPage />} />
                <Route exact path={ROUTES.SIGN_IN} element={<SignInPage />} />
                <Route exact path={ROUTES.SIGN_OUT} element={<SignOut />} />
                <Route exact path={ROUTES.HOME} element={<HomePage />} />
                <Route exact path={ROUTES.LANDING} element={<SignInPage />} />
            </Routes>
        </div>
    </Router>
);
const App = withFirebase(application)
export default App;