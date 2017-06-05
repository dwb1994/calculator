import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Header extends Component {
    render() {
        return (
            <header className="m-header">
                <h2 className="title">{this.props.title}</h2>
                {this.props.left?
                    <div className="left" onClick={this.props.left.callback}>{this.props.left.name}</div>:null
                }
                {this.props.right?
                    <div className="right" onClick={this.props.right.callback}>{this.props.right.name}</div>:null
                }
            </header>
        )
    }
};

Header.propTypes = {
    title: PropTypes.string,
    left: PropTypes.object,
    right: PropTypes.object
};

Header.defaultProps = {
    title: '标题',
    left: {},
    right: {}
};

export default Header;
