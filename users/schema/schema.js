const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql;

const users= [
    { id: '23', firstName: 'Bill', lastName: 'Bateman', ssoUserName: 'bill.bateman@gmail.com', age: 20 },
    { id: '47', firstName: 'Samantha', lastName: 'Bateman', ssoUserName: 'sam.bateman@gmail.com', age: 21 }
];

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
                return _.find(users, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});