export const userTypeDef = /* GraphQL */`
    type Query {
        user: User
    }

    type Mutation {
        createUser(user: NewUserInput!): User
    }

    input NewUserInput {
        name: String!
        age: Int!
    }

    type User {
        id: Int
        name: String,
        age: Int
    }
`;

export const userResolvers = {
    Query: {
        user: () => {
            return {
                id: 1,
                name: '    Katie  ',
                age: 8
            }
        }
    },

    Mutation: {
        createUser: async(_, {user}, {mongo }) => {
            const movies = await mongo.movies.find().toArray();
            console.log('movies', movies);
            return {
                id:1,
                ...user
            };
        },
    },

    User: {
        name: (obj) => {
            return obj.name.trim().toUpperCase();
        }
    }

}