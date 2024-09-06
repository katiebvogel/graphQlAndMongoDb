import {ObjectId} from 'mongodb';

export const userTypeDef = /* GraphQL */`
    type Query {
        users: [User!]!

        user(id: ID!): User
    }

    type Mutation {
        createUser(user: NewUserInput!): User
        deleteUser(id: ID!): Boolean
        updateUser(id: ID!, update: UpdateUserInput): User
    }

    input NewUserInput {
        name: String!
        email: String!
    }

    input UpdateUserInput {
        name: String!
    }

    type User {
        id: ID!
        name: String,
        email: String
    }
`;

export const userResolvers = {
    Query: {

        users: (obj, args, { mongo}) => {

            return mongo.users.find().limit(5).toArray();
        },

        user: (obj, {id}, { mongo }) => {
            console.log('id', id);
            const user = mongo.users.findOne({_id: new ObjectId(id)});
            return user;
        }
    },


    Mutation: {
        createUser: async(_, {user}, { mongo }) => {

            const response = await mongo.users.insertOne(user);
            console.log('response', response);
            return {
                id: 1,
                ...user,
            };
        },

        deleteUser: async(obj, {id}, {mongo}) => {
           const response =  await mongo.users.deleteOne({_id: new ObjectId(id)});
           console.log(response);
            return true;
        },

        updateUser: async(obj, {id, update}, {mongo}) => {
            const response = await mongo.users.updateOne(
                {_id: new ObjectId(id)}, 
                {$set: {name: update.name}}
            );
            console.log(response);
            return mongo.users.findOne({_id: new ObjectId(id)});
        }

        //ex mutation in Ruru
        /** mutation UpdateUser {
         updateUser(id: "59b99dc8cfa9a34dcd7885de", update: {name: "hello"}) {
            id
        name
        email
        }
        } */

    },

    User: {
        id: ({id, _id}) => {
            return _id || id;
        },
        name: (obj) => {
            return obj.name.trim().toUpperCase();
        }
    }

}