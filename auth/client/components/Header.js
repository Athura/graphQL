import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

class Header extends Component {
    //sign the user out
    //don't need query variables
    //need to think about how we're going to update the component, use refetchQueries and send query: query -> query
    onLogoutClick(){
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }


    renderButtons() {
        //destructuring
        const { loading, user } = this.props.data;

        //if this.props.data.loading
        if(loading){
            return <div>Loading</div>;
        }

        //if a user does exist then display logout, else if the user doesnt exist then display login button
        //this.props.data.user
        if(user){
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)} >
                        Logout
                    </a>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup" >
                            Signup
                        </Link>
                    </li>
                    <li>
                        <Link to ="/login">
                            Login
                        </Link> 
                    </li>
                </div>
            );
        }
    }

    render(){
        console.log(this.props.data);
        return (
            <nav>
                <div className="nav-wrapper">
                <Link to ="/" className="brand-logo left">
                    Home
                </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default graphql(mutation)(
    graphql(query)(Header)
);