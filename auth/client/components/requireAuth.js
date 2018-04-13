//Higher order component (HOC)
// look at index.js routing area to see example
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

export default (WrappedComponent) => {
class requireAuth extends Component {
    
    componentWillUpdate(nextProps){
       // console.log(this.props.data.loading, this.props.data.user); To debug
        if(!nextProps.data.loading && !nextProps.data.user){
            hashHistory.push('/login');
        }
    }

    render(){
        return <WrappedComponent {...this.props} />;
    }
}

 return graphql(currentUserQuery)(requireAuth);
};