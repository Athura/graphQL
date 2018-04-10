import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class SongList extends Component {
    render() {
        console.log(this.props);

        return (
            <div>
                SongList
            </div>
        );
    }
}

//make sure you have a backtick
const query = gql`
    {
        songs {
            title
        }
    }
`;

export default graphql(query)(SongList);
