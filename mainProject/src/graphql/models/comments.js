export const typeDef = /* GraphQL */` 
    type Query {
        comments: [Comment]
    }

    type Comment {
        _id: ID
        text: String
        email: String

        user: User
    }
    `;


export const resolvers = {
    Query: {
        comments: (obj, args, {mongo}) => {
            return mongo.comments.find().limit(5).toArray();
        }
    },

    Comment: {
        user: (obj, args, {mongo}) => {
            return mongo.users.findOne({email: obj.email});
        }
    }
};
