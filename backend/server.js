const app = require("express")();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type User {
    id: ID
    name: String
    repo: String
    credits: Int
  }
  type Query {
    user(id: ID!): User
    users: [User]
  }
  type Mutation {
    createUser(name: String!): User
  }
`);

const providers = {
  users: [],
};

let id = 0;

const resolvers = {
  user({ id }) {
    return providers.users.find((item) => item.id === Number(id));
  },
  users() {
    return providers.users;
  },
  createUser(name) {
    const user = {
      id: id++,
      name: name,
      credits: 1000,
    };

    providers.users.push(user);

    return user;
  },
  creditTransaction(creditsSent, id) {
    const thirdParty = providers.users.find((item) => item.id === Number(id));

    const user0 = providers.users.find((item) => item.id === 0);
    if (creditsSent <= user0.credits) {
      user0.credits = user0.credits - creditsSent;
    } else {
      console.log("You don't have enough credits for that");
    }

    thirdParty.credits = thirdParty.credits + creditsSent;
    console.log("user0 teste depois", user0);
    console.log("third party teste depois", thirdParty);
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("server on");
  resolvers.createUser("User0");
  resolvers.createUser("User1");
  resolvers.createUser("User2");
  console.log(providers.users);
  resolvers.creditTransaction(50, 1);
});
