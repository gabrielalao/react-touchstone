import classNames from 'classnames';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Tappable from 'react-tappable';

const DIRECTIONS = {
	'reveal-from-right': -1,
	'show-from-left': -1,
	'show-from-right': 1,
	'reveal-from-left': 1
};

var defaultControllerState = {
	direction: 0,
	fade: false,
	leftArrow: false,
	leftButtonDisabled: false,
	leftIcon: '',
	leftLabel: '',
	leftAction: null,
	rightArrow: false,
	rightButtonDisabled: false,
	rightIcon: '',
	rightLabel: '',
	rightAction: null,
	title: ''
};

function newState (from) {
	var ns = Object.assign({}, defaultControllerState);
	if (from) Object.assign(ns, from);
	delete ns.name; // may leak from props
	return ns;
}

var NavigationBar = React.createClass({
	contextTypes: {
		app: React.PropTypes.object
	},

	propTypes: {
		name: React.PropTypes.string,
		className: React.PropTypes.string
	},

	getInitialState () {
		return newState(this.props);
	},

	componentDidMount () {
		if (this.props.name) {
			this.context.app.navigationBars[this.props.name] = this;
		}
	},

	componentWillUnmount () {
		if (this.props.name) {
			delete this.context.app.navigationBars[this.props.name];
		}
	},

	componentWillReceiveProps (nextProps) {
		this.setState(newState(nextProps));
		if (nextProps.name !== this.props.name) {
			if (nextProps.name) {
				this.context.app.navigationBars[nextProps.name] = this;
			}
			if (this.props.name) {
				delete this.context.app.navigationBars[this.props.name];
			}
		}
	},

	update (state) {
		// FIXME: what is happening here
		state = newState(state);
		this.setState(newState(state));
	},

	updateWithTransition (state, transition) {
		state = newState(state);
		state.direction = DIRECTIONS[transition] || 0;

		if (transition === 'fade' || transition === 'fade-contract' || transition === 'fade-expand') {
			state.fade = true;
		}

		this.setState(state);
	},

	renderLeftButton () {
		var className = classNames('NavigationBarLeftButton', {
			'has-arrow': this.state.leftArrow
		});

		return (
			<Tappable onTap={this.state.leftAction} className={className} disabled={this.state.leftButtonDisabled} component="button">
				{this.renderLeftArrow()}
				{this.renderLeftLabel()}
			</Tappable>
		);
	},

	renderLeftArrow () {
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade || this.state.direction) {
			transitionName = 'NavigationBarTransition-Fade';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		var arrow = this.state.leftArrow ? <span className="NavigationBarLeftArrow" /> : null;

		return (
			<ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration}>
				{arrow}
			</ReactCSSTransitionGroup>
		);
	},

	renderLeftLabel () {
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade) {
			transitionName = 'NavigationBarTransition-Fade';
		} else if (this.state.direction > 0) {
			transitionName = 'NavigationBarTransition-Forwards';
		} else if (this.state.direction < 0) {
			transitionName = 'NavigationBarTransition-Backwards';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		return (
			<ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration}>
				<span key={Date.now()} className="NavigationBarLeftLabel">{this.state.leftLabel}</span>
			</ReactCSSTransitionGroup>
		);
	},

	renderTitle () {
		var title = this.state.title ? <span key={Date.now()} className="NavigationBarTitle">{this.state.title}</span> : null;
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade) {
			transitionName = 'NavigationBarTransition-Fade';
		} else if (this.state.direction > 0) {
			transitionName = 'NavigationBarTransition-Forwards';
		} else if (this.state.direction < 0) {
			transitionName = 'NavigationBarTransition-Backwards';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		return (
			<ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration}>
				{title}
			</ReactCSSTransitionGroup>
		);
	},

	renderRightButton () {
		var transitionName = 'NavigationBarTransition-Instant';
		if (this.state.fade || this.state.direction) {
			transitionName = 'NavigationBarTransition-Fade';
		}
		var transitionDuration = transitionName === 'NavigationBarTransition-Instant' ? 50 : 500;

		var button = (this.state.rightIcon || this.state.rightLabel) ? (
			<Tappable key={Date.now()} onTap={this.state.rightAction} className="NavigationBarRightButton" disabled={this.state.rightButtonDisabled} component="button">
				{this.renderRightLabel()}
				{this.renderRightIcon()}
			</Tappable>
		) : null;
		return (
			<ReactCSSTransitionGroup transitionName={transitionName} transitionEnterTimeout={transitionDuration} transitionLeaveTimeout={transitionDuration}>
				{button}
			</ReactCSSTransitionGroup>
		);
	},

	renderRightIcon () {
		if (!this.state.rightIcon) return null;

		var className = classNames('NavigationBarRightIcon', this.state.rightIcon);

		return <span className={className} />;
	},

	renderRightLabel () {
		return this.state.rightLabel ? <span key={Date.now()} className="NavigationBarRightLabel">{this.state.rightLabel}</span> : null;
	},

	render () {
		return (
			<div className={classNames('NavigationBar', this.props.className)}>
				{this.renderLeftButton()}
				{this.renderTitle()}
				{this.renderRightButton()}
			</div>
		);
	}
});

export default NavigationBar;
