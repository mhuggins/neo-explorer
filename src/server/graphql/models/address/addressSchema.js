import _ from "lodash";
import { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLList, GraphQLNonNull } from "graphql";
import { GraphQLDateTime } from "graphql-iso-date";

import TransactionSchema from "../transaction/transactionSchema";

const BalanceSchema = new GraphQLObjectType({
  name: "AddressBalance",
  description: "Address asset balance",
  fields: {
    asset: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Asset txid"
    },
    value: {
      type: new GraphQLNonNull(GraphQLFloat),
      description: "Asset value"
    }
  }
});

export default new GraphQLObjectType({
  name: "Address",
  description: "Address on the NEO Blockchain",
  fields: () => ({
    address: {
      type: new GraphQLNonNull(GraphQLString),
      description: "Address hash"
    },
    balance: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(BalanceSchema))),
      description: "Address balance by asset",
      resolve: (address) => _.map(address.balance, (value, asset) => ({ asset, value }))
    },
    registered: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: "Address registered timestamp"
    },
    transactions: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TransactionSchema))),
      description: "Address transactions",
      resolve: (address) => address.getTransactions({ order: [["blocktime", "desc"]] })
    }
  })
});
