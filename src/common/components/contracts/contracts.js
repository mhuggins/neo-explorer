import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";

import contractShape from "../../shapes/contractShape";

const { arrayOf } = PropTypes;

export default class Contracts extends React.Component {
  static displayName = "Contracts";

  static propTypes = {
    contracts: arrayOf(contractShape).isRequired
  };

  render = () => {
    return (
      <div className="contracts-component">
        <h2>Contracts</h2>
        <table width="100%">
          <thead>
            <tr>
              <td>Hash</td>
              <td>Name</td>
              <td>Author</td>
              <td>Registered</td>
            </tr>
          </thead>
          <tbody>
            {this.renderContracts()}
          </tbody>
        </table>
      </div>
    );
  }

  renderContracts = () => {
    return this.props.contracts.map((contract) => {
      return (
        <tr key={contract.hash}>
          <td><Link to={`/contracts/${contract.hash}`}>{contract.hash}</Link></td>
          <td>{contract.name}</td>
          <td>{contract.author} bytes</td>
          <td><TimeAgo date={contract.registered} /></td>
        </tr>
      );
    });
  }
}
