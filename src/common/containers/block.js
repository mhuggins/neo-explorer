import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Block from "../components/block/block";
import Loading from "../components/loading";
import Failed from "../components/failed";
import NotFound from "./notFound";

const query = gql`
  query ($hash: String!) {
    block(hash: $hash) {
      hash
      index
      confirmations
      merkleroot
      nextconsensus
      nonce
      previousblockhash
      script {
        invocation
        verification
      }
      size
      time
      version
      transactions {
        txid
        type
        blocktime
      }
    }
  }
`;

export default compose(
  withGraphQuery(query, { options: ({ match }) => ({ variables: { hash: match.params.hash } }) }),
  withGraphProgress({ Loading, Failed, NotFound, required: ["block"] }),
  withTitle(({ block }) => `Block ${block.hash}`),
  setDisplayName("BlockContainer")
)(Block);
