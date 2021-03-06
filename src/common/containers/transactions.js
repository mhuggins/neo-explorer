import { gql } from "react-apollo";
import { compose, setDisplayName } from "recompose";

import withGraphQuery from "../hocs/graphql/withGraphQuery";
import withGraphProgress from "../hocs/graphql/withGraphProgress";
import withTitle from "../hocs/withTitle";
import Transactions from "../components/transactions/transactions";
import Loading from "../components/loading";
import Failed from "../components/failed";

const query = gql`
  { transactions {
    txid
    blockhash
    blocktime
    type
    size
  } }
`;

export default compose(
  withGraphQuery(query),
  withGraphProgress({ Loading, Failed }),
  withTitle("Transactions"),
  setDisplayName("TransactionsContainer")
)(Transactions);
