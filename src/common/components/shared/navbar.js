import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classNames from "classnames";

import SvgIcon from "./svgIcon";
import menuSvg from "../../icons/menu.svg";

const { string, bool, func, node, arrayOf } = PropTypes;

export default class Navbar extends React.Component {
  static displayName = "Navbar";

  static propTypes = {
    title: string.isRequired,
    links: arrayOf(node),
    open: bool,
    onToggle: func
  };

  static defaultProps = {
    links: [],
    open: false,
    onToggle: () => {}
  };

  render = () => {
    return (
      <div className={classNames("navbar-component", this.props.className)}>
        <div className="nav-topbar">
          <h1><Link to="/">{this.props.title}</Link></h1>

          <ul className="nav-links">
            {this.renderLinks()}
          </ul>

          <button className="nav-toggle" type="button" onClick={this.props.onToggle}>
            <SvgIcon className="nav-toggle-icon" svg={menuSvg} />
          </button>
        </div>

        <ul className={classNames("nav-drawer", { open: this.props.open })}>
          {this.renderLinks()}
        </ul>
      </div>
    );
  }

  renderLinks = () => {
    return this.props.links.map((link, i) => (
      <li key={i} className="nav-link">{link}</li>
    ));
  }
}
