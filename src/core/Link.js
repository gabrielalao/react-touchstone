import blacklist from 'blacklist';
import React from 'react';
import Tappable from 'react-tappable';
import Transitions from '../mixins/Transitions';

var Link = React.createClass({
	mixins: [Transitions],
	propTypes: {
		children: React.PropTypes.any,
		options: React.PropTypes.object,
		transition: React.PropTypes.string,
		to: React.PropTypes.string,
		viewProps: React.PropTypes.any
	},

	doTransition () {
		var options = Object.assign({ viewProps: this.props.viewProps, transition: this.props.transition }, this.props.options);
		console.info('Link to "' + this.props.to + '" using transition "' + this.props.transition + '"' + ' with props ', this.props.viewProps);
		this.transitionTo(this.props.to, options);
	},

	render () {
		var tappableProps = blacklist(this.props, 'children', 'options', 'transition', 'viewProps');

		return (
			<Tappable onTap={this.doTransition} {...tappableProps}>
				{this.props.children}
			</Tappable>
		);
	}
});

export default Link;
