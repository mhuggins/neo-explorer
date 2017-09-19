import React from "react";
import TimeAgo from "react-timeago";

import getAssetName from "../../helpers/getAssetName";
import assetShape from "../../shapes/assetShape";

export default class Asset extends React.Component {
  static displayName = "Asset";

  static propTypes = {
    asset: assetShape.isRequired
  };

  render = () => {
    const { asset } = this.props;

    return (
      <div className="asset-component">
        <h1>Asset {asset.txid}</h1>

        <dl>
          <dt>Name:</dt>
          <dd>{getAssetName(asset, "en")}</dd>

          <dt>Type:</dt>
          <dd>{asset.type}</dd>

          <dt>Precision:</dt>
          <dd>{asset.precision}</dd>

          <dt>Issued:</dt>
          <dd>{asset.issued.toLocaleString()}</dd>

          <dt>Amount:</dt>
          <dd>{asset.amount.toLocaleString()}</dd>

          <dt>Admin:</dt>
          <dd>{asset.admin}</dd>

          <dt>Owner:</dt>
          <dd>{asset.owner}</dd>

          <dt>Registered:</dt>
          <dd><TimeAgo date={asset.registered} /></dd>
        </dl>
      </div>
    );
  }
}
