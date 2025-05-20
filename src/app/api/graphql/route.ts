import { createYoga, createSchema } from "graphql-yoga";
import { NextRequest, NextResponse } from "next/server";

import { resolvers } from "./resolvers";

const yoga = createYoga({
  schema: createSchema({
    typeDefs: `
      type Turbine {
        id: ID!
        manufacturerSerialId: String! 
        serialId: Manufacturer! 
        location: String!
        installationDate: String!
        lastMaintenance: String!
        nextMaintenance: String!
        status: String!
        powerOutput: Int!
        issueReported: String
        technicianAssigned: String
      }

      type Manufacturer {
        manufacturerSerialId: ID!
        manufacturerName: String!
        modelName: String!
        country: String!
        description: String
        ratedPower: Int!
        offshore: Boolean!
        onshore: Boolean!
        turbines: [Turbine!]!
      }

      type Query {
        turbines: [Turbine!]!
        manufacturers: [Manufacturer!]!
        turbine(id: String!): Turbine
        manufacturer(id: String!): Manufacturer
      }
    `,
    resolvers,
  }),
  fetchAPI: {
    Response: NextResponse,
    Request: NextRequest,
  },
});

// Directly export GET and POST functions
export async function GET(request: NextRequest) {
  return yoga.handleRequest(request, {});
}

export async function POST(request: NextRequest) {
  return yoga.handleRequest(request, {});
}
