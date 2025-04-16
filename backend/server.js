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

    thirdParty.credits = Number(thirdParty.credits) + Number(creditsSent);
    console.log("user0 test after transaction", user0);
    console.log("third party test after transaction", thirdParty);
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

app.use("/credit/:credits/:id", (req, res, next) => {
  resolvers.creditTransaction(req.params.credits, req.params.id);
  console.log("after transaction", providers.users);
  res.send(providers.users);
});

app.listen(3000, () => {
  console.log("server on");
  resolvers.createUser("User 0");
  resolvers.createUser("User 1");
  resolvers.createUser("User 2");
  console.log(providers.users);
  resolvers.creditTransaction(50, 1);
});
