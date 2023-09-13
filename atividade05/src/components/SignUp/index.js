import React, { Component } from 'react';
import { withRouter } from '../RouterHook';
import { Link } from 'react-router-dom'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'


import 'materialize-css';
import { Button, TextInput, Icon } from 'react-materialize';

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

const SignUpPage = () => (

    <div className={'signPanel'}>
        <h3>Crie sua conta:</h3>
        <SignUpForm />
    </div>
);

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = async event => {
        console.log(event.target.value)
        if (event.target.value == 'cancelar')
            this.props.router.navigate(ROUTES.LANDING);
        console.log(this.state)
        const { username, email, passwordOne } = this.state;
        event.preventDefault()
        try {
            await this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
            this.setState({ ...INITIAL_STATE })
            console.log(this.state)
            alert(`Usário ${email} cadastrado !!!`)
            this.props.router.navigate(ROUTES.HOME);
        } catch (error) {
            this.setState({ error })
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })

    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        // alert(isInvalid)

        return (
            <form onSubmit={this.onSubmit}>
                <TextInput
                    label="Nome de Usuário"
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholde="Full Name"
                />
                <TextInput
                    label="E-mail"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    placeholde="Email address"
                />
                <TextInput
                    label="Senha"
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholde="Password"
                /><br />
                <TextInput
                    label="Comfirmar a Senha"
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholde="Password"
                /><br />
                <Button
                    className="waves-effect waves-light btn blue"
                    style={{ marginRight: '5px' }}
                    disabled={isInvalid}
                    type="submit">Cadastrar <Icon right>
                    send
                </Icon></Button>
                {/* <input name='cancelar' type="submit" value={'Cancelar'}/> */}
                <Link to={ROUTES.LANDING}>Cancelar</Link>
                {error && <p className='errorMessages'>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => {
    return (<p>
        Cadastre uma nova Conta?<Link to={ROUTES.SIGN_UP}>Cadastrar</Link>
    </p>);
}


const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpPage;

export { SignUpForm, SignUpLink };