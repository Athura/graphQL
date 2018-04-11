import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';

import query from '../queries/fetchSongs';

//controlled input, used to update component level state and then push to the parent to render
class SongCreate extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: ''
        };
    }

    onSubmit(event) {
        event.preventDefault();
        
       this.props.mutate({
           variables: {
               title: this.state.title
           },
           //solves the adding song -> reload page to see the new song, normally query: query 
           //but since keys are the same we can shorten to just query
           refetchQueries: [{ query }]
       }).then(() => hashHistory.push("/"));
    }

    render() {
        return(
            <div>
                <Link to="/" >Back</Link>
                <h3>Create a new song</h3>
                <form onSubmit={this.onSubmit.bind(this)} >
                    <label>Song Title:</label>
                    <input 
                        onChange = {event => this.setState({ title: event.target.value })}
                        value={this.state.title}
                    />
                </form>
            </div>
        );
    }
}

const mutation = gql`
    mutation AddSong($title: String){
        addSong(title: $title){
            title
        }
    }
`;

export default graphql(mutation)(SongCreate);