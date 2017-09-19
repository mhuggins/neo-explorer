/* eslint-disable no-console */

import "isomorphic-fetch";
import _ from "lodash";

async function getNodes({ retry }) {
  try {
    const response = await fetch("http://api.neonwallet.com/v2/network/nodes");

    if (response.status !== 200) {
      throw new Error(`Bad response: ${response.state}`);
    }

    return response;
  } catch (err) {
    if (retry > 0) {
      console.log(`${err.message}, retrying...`);
      return getNodes({ retry: retry - 1 });
    } else {
      throw err;
    }
  }
}

export default async function findBestNode({ retry = 3 } = {}) {
  const response = await getNodes({ retry });
  const { nodes } = await response.json();

  const filteredNodes = _.filter(nodes, "block_height");
  const sortedNodes = _.orderBy(filteredNodes, ["block_height", "time"], ["desc", "asc"]);

  return sortedNodes[0];
}
