import gql from 'graphql-tag';

//make sure you have a backtick
// use id as unique key because less likely t oget the same key
export default gql`
    {
        songs {
            id
            title
        }
    }
`;