import React from 'react';
import Container from 'react-container';

var ErrorView = React.createClass({

	propTypes: {
		children: React.PropTypes.node
	},

	render () {
		return (
			<Container fill className="View ErrorView">
				{this.props.children}
			</Container>
		);
	}
});

export default ErrorView;
