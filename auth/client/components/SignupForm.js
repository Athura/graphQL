import React, { Component } from 'react';
import AuthForm from './AuthForm';
import Header from './Header';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] };
    }

    //same as login form's
    componentWillUpdate(nextProps) {
        if(!this.props.data.user && nextProps.data.user){
            hashHistory.push('/dashboard');
        }
    }

    //refetches to get the new current user
    onSubmit({ email, password }){
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
                <h3>Sign Up</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);