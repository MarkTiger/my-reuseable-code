const { ApolloServer, gql } = require('apollo-server');
const { connect } = require('./config/mongodb');

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;

const bookList = [
  {
    title: 'Test',
    author: 'Author;',
  },
  {
    title: 'Beta',
    author: 'Bros',
  },
];

const resolvers = {
  Query: {
    books() {
      return bookList;
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

connect();

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
