import React, { Component } from 'react';
import Header from './Header';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';
import { graphql } from 'react-apollo';

class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = { errors: [] };
    }

    //not ideal, but this pushes a user to the dashboard if we detect that they're logged in
    componentWillUpdate(nextProps){
       // this.props  the old, current set of props
       // nextProps  the next set of props that will be in place when component rerenders

       if(!this.props.data.user && nextProps.data.user) {
           //redirect to dashboard
           hashHistory.push('/dashboard');
       }
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

//added query to rerender component everytime query is called
export default graphql(query)(
    graphql(mutation)(LoginForm)
);