import React, { Component } from 'react';
import Header from './Header';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { graphql } from 'react-apollo';

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = { errors: [] };
    }

    //email: email, password: password
    //if request fails then the catch will show the error on the browser
    // use .catch(res => { debugger }) to start debugging process
    // use res.graphQLErrors.map(error => error.message) to display error messages in dev tools
    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => { 
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
         });
    }

    render() {
        return (
            <div>
                <Header />
                <h3>Login</h3>
                <AuthForm 
                    errors={this.state.errors} 
                    onSubmit={this.onSubmit.bind(this)} 
                />
            </div>
        );
    }
}

export default graphql(mutation)(LoginForm);