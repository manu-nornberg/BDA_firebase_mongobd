import React, { useEffect, useState } from 'react';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes'
import { useNavigate, Navigate } from 'react-router';
import { SignUpLink } from '../SignUp';
import Navigation from '../Navigation';

import 'materialize-css';
import { Button, TextInput, Icon } from 'react-materialize';

function SignInPage() {

    return (
        <div className={'signPanel'}>
            <h3>Entrar:</h3>
            <Navigation />
            <SignInFormFirebase />
            <SignUpLink />
        </div>
    )
}

function SignInForm(props) {
    const [state, setState] = useState({
        email: '',
        password: '',
        error: null,
        user: false
    });

    const navigate = useNavigate();

    useEffect(() => {
        navigate(state.user ? ROUTES.HOME : ROUTES.LANDING)
    }, []);

    const onChange = event => {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    async function onSubmit(event) {
        event.preventDefault()
        console.log(state)
        try {
            const loggedUser = await props.firebase.doSignInWithEmailAndPassword(state.email, state.password)
            if (loggedUser.accessToken) {
                setState({ ...state, user: props.firebase.isLogged })
                console.log([state.user, props.firebase.auth, props.firebase.isLogged])
            }
        } catch (error) {
            console.log(error)
            setState({ ...state, error: error })
        }
    }
    const errorStyle = { color: "red", fontWeight: "bold", fontStyle: "italic" };

    const isInvalid =
        state.password === '' ||
        state.email === '';

    return ((!state.user) ?
        <>
            <form onSubmit={onSubmit}>
                <TextInput
                    label="E-mail"
                    name="email"
                    value={state.email}
                    onChange={onChange}
                    type="email"
                    placeholde="Email address"
                /><br />
                <TextInput
                    label="Password"
                    name="password"
                    value={state.password}
                    onChange={onChange}
                    type="password"
                    placeholde="Password"
                /><br />
                <Button
                    className="waves-effect waves-light btn"
                    style={{ marginRight: '5px' }}
                    disabled={isInvalid}
                    type="submit">Entrar
                    <Icon right>
                        send
                    </Icon>
                    </Button>
            </form>
            <p className={"errorMessages"}>{state.error && state.error.message }</p>
        </> : <Navigate to={ROUTES.HOME} />
    );
}

const SignInFormFirebase = withFirebase(SignInForm)

export default SignInPage;

export { SignInFormFirebase };