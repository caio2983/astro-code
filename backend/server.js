const app = require("express")();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

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

app.use(cors());

app.get("/credit/:credits/:id", (req, res) => {
  const credits = req.params.credits;
  const id = req.params.id;

  console.log("transaction done");
  const result = resolvers.creditTransaction(Number(credits), Number(id));

  res.json(result);
});

app.get("/users", (req, res) => {
  const users = resolvers.users();
  console.log("users route");
  res.json(users);
});

app.listen(3000, () => {
  console.log("server on");
  resolvers.createUser("User 0");
  resolvers.createUser("User 1");
  resolvers.createUser("User 2");
  console.log(providers.users);
  resolvers.creditTransaction(50, 1);
});
