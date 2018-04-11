import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { optimistic } from 'apollo-client/optimistic-data/store';

class LyricList extends Component {
    onLike(id, likes){
        this.props.mutate({
             variables: { id },
             //Optimistic UI update/response
             optimisticResponse: {
                 //need to specifiy if its a query/mutation and so on. Basically duplicate the code for the mutation, 
                 //look at the mutation preview in network log for variables.
                __typename: 'Mutation',
                likeLyric: {
                    id: id,
                    __typename: 'LyricType',
                    likes: likes + 1
                }
             }
             })
    }

    renderLyrics(){
        return this.props.lyrics.map(({ id, content, likes }) => {
            return (
                <li key={id} className="collection-item">
                        {content}
                    <div className="vote-box">
                        <i className="material-icons"
                        //provide a second likes here for the optimistic update
                            onClick = {() => this.onLike(id, likes)}
                        >thumb_up</i>
                        {likes}
                    </div>
                </li>
            );
        })
    }

    render() {
        return (
            <ul className="collection">
                {this.renderLyrics()}
            </ul>
        );
    }
}

const mutation = gql`
    mutation LikeLyrics($id:ID){
        likeLyric(id: $id){
        id
        likes
        }
    }
`;

export default graphql(mutation)(LyricList);