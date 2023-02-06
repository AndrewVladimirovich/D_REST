import React from 'react'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: '', password: ''}
    }

    handleChange(event) {
        this.setState(
            state: {
                [event.target.name]: event.target.value
            }
        )
    }

    handleSubmit(event) {
        console.log(this.state.login + ' ' + this.state.password)
        event.preventDefault()
    }

    render() {
        return (
        <form onSubmit={(event:FormEvent<HTMLFormElement>) => this.handleSubmit(event)}>
            <input type="text" name="login" placeholder="login" value={this.state.login} onChange={(event:ChangeEvent<HTMLInputElement>) => this.handleChange(event)}>
            </input>
            <input type="password" name="password" placeholder="password" value={this.state.password} onChange={(event:ChangeEvent<HTMLInputElement>) => this.handleChange(event)}>
            </input>
            <input type="submit" value="Login">
            </input>
        </form>
        )
    }
}


export default LoginForm
