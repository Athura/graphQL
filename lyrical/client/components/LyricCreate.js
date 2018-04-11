import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ''
        };
    }

    onSubmit(event){
        event.preventDefault();

        this.props.mutate({
            variables: {
                content: this.state.content,
                //get this from songDetail's render method
                songId: this.props.songId
            }
        }).then(() => this.setState({ content: '' }));
    }

    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)} >
                <label>Add a Lyric</label>
                <input 
                    value={this.state.content}
                    onChange = {event => this.setState({ content: event.target.value })}
                />
            </form>
        )
    }
}

//need to include likes because of apollo else we will receive a setState
const mutation = gql`
    mutation AddLyricToSong($content: String, $songId: ID){
        addLyricToSong(content: $content, songId: $songId) {
            id
            lyrics {
                id
                content
                likes
            }
        }
    }
`;

// songDetail
export default graphql(mutation)(LyricCreate);