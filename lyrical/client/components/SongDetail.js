import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

class SongDetail extends Component {
    render() {
        //destructuring of this.props.data.song
        const { song } = this.props.data;

        //can look at loading property or props
        if(!song) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to="/" >Back</Link>
                <h3>{song.title}</h3>
                <LyricList lyrics={song.lyrics} />
                <LyricCreate songId={this.props.params.id} />
            </div>
        );
    }
}

// takes the props going to song detail then provide the query variables id from props.param.id
// use this format when fetching a very particular record
export default graphql(fetchSong, {
    options: (props) => { return { variables: { id: props.params.id } } }
})(SongDetail);