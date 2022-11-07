// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql, GraphQLClient } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export default function comments(req, res) {
  const GraphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer`,
    },
  });
}
