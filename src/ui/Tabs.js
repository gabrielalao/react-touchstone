import blacklist from 'blacklist';
import classnames from 'classnames';
import React from 'react';
import Tappable from 'react-tappable';

export var Navigator = React.createClass({
	propTypes: {
		className: React.PropTypes.string
	},

	render () {
		var className = classnames('Tabs-Navigator', this.props.className);
		var otherProps = blacklist(this.props, 'className');

		return <div className={className} { ... otherProps } />;
	}
});

export var Tab = React.createClass({
	propTypes: {
		selected: React.PropTypes.bool
	},

	render () {
		var className = classnames('Tabs-Tab', { 'is-selected': this.props.selected });
		var otherProps = blacklist(this.props, 'selected');

		return <Tappable className={className} { ... otherProps } />;
	}
});

export var Label = React.createClass({
	render () {
		return <div className="Tabs-Label" { ... this.props }/>;
	}
});
