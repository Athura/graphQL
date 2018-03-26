const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        ssoUserName: { type: GraphQLString },
        age: { type: GraphQLInt },
    }
});

//root query points to all possible entry points into a graph ql api
//resolves purpose is to actually find the user, or data we're looking for. args is what is passed into id 
// _ = lodash which is a helper library to walk through data to find what you want
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});