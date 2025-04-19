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
  type Transaction {
  idThirdParty: ID!
  nameThirdParty: String!
  creditsSent: Int!

  }
`);

const providers = {
  users: [],
  transactions: [],
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
    let missingCredits = 0;
    const thirdParty = providers.users.find((item) => item.id === Number(id));

    const user0 = providers.users.find((item) => item.id === 0);
    if (creditsSent <= user0.credits) {
      user0.credits = user0.credits - creditsSent;
    } else {
      console.log("You don't have enough credits for that");
      missingCredits = 1;

      return 1;
    }

    const transaction = {
      id: id,
      nameThirdParty: thirdParty.name,
      creditsSent: creditsSent,
    };

    providers.transactions.push(transaction);

    thirdParty.credits = Number(thirdParty.credits) + Number(creditsSent);

    return providers.users;
  },
  getTransactions() {
    return providers.transactions;
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

  const result = resolvers.creditTransaction(Number(credits), Number(id));

  if (result == 1) {
    res.send(null);
  } else {
    res.json(result);
  }
});

app.get("/users", (req, res) => {
  const users = resolvers.users();
  res.json(users);
});

app.get("/transactions", (req, res) => {
  res.json(providers.transactions);
});

app.listen(3000, () => {
  console.log("Server on");
  resolvers.createUser("User 0");
  resolvers.createUser("User 1");
  resolvers.createUser("User 2");
  resolvers.createUser("User 4");
  resolvers.createUser("User 5");
  resolvers.creditTransaction(50, 1);
});
