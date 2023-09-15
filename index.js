var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
var cors = require("cors");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Activity {
    id: Int!,
    name: String!,
    imageUrl: String!,
    rating: Int!,
    date: String!,
    description: String!,
    categories: [String]!
  }

  type Query {
    hello: [Activity]!
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return [
      {
        id: 0,
        name: "Attend The Floating Lantern Festival",
        imageUrl: "./assets/lanterns.png",
        rating: 3,
        date: "06 05 2022",
        description:
          "In the warmth of the moonlight, thousands of glowing lanterns drift gracefully into the sky, creating the magic and serenity of Thailands enchanting floating lantern festival.",
        categories: ["aquatic", "colorful"],
      },
      {
        id: 1,
        name: "Feed a Wild Deer",
        imageUrl: "./assets/deer.JPG",
        rating: 4,
        date: "07 17 2019",
        description:
          "With a polite nudge, the wild deer of Nara nibbled treats from an outstretched hand, forging an unforgettable moment of connection in the magical city of Nara, Japan.",
        categories: ["nearby", "risky"],
      },
      {
        id: 2,
        name: "Drink Curaçao in Curaçao ",
        imageUrl: "./assets/Curaçao.png",
        rating: 5,
        date: "04 19 2011",
        description:
          "Sipping a vibrant blue cocktail on sun-kissed shores in the Caribbean, I felt the islands warmth and spirit infuse every delicious, refreshing sip.",
        categories: ["mixological", "tropical", "aquatic"],
      },
      {
        id: 3,
        name: "See The Pyramids of Giza",
        imageUrl: "./assets/pyramids.png",
        rating: 2,
        date: "08 28 2021",
        description:
          "Standing before the awe-inspiring Pyramids of Giza, I felt humbled by their sheer scale and the magnificent history they represented.",
        categories: ["wonderous", "rare"],
      },
    ];
  },
};

var app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(3000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
