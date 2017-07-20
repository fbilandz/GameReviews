import React from 'react';
import { connectStyle } from '@shoutem/theme';
import {
	Title,
	Caption,
	Icon,
	Tile,
	Image,
	View,
} from '@shoutem/ui';
import moment from 'moment';
import { ext } from '../const';
import { connect } from 'react-redux';

export class GameBanner extends React.PureComponent {
	constructor(props) {
		super(props);
	}

	renderRow(data, rowId) {
		return <Review data={data} key={rowId} />;
	}
	render() {
		return (
			<Image
				styleName="large-banner placeholder"
				source={this.props.articleImage}
				animationName="hero"
			>
				<Tile animationName="hero">
					<Title styleName="centered">{this.props.article.title.toUpperCase()}</Title>
					{/* Virtual prop makes View pass Tile color style to Caption */}
					<View styleName="horizontal md-gutter-top" virtual>{}
						<Caption styleName="collapsible" numberOfLines={1}>{this.props.article.newsAuthor}</Caption>
						<Caption styleName="md-gutter-left">
							{moment(this.props.article.timeUpdated).fromNow()}
						</Caption>
					</View>
				</Tile>
				<Icon name="down-arrow" styleName="scroll-indicator" />
			</Image>
		);
	}
}

export default connect()(connectStyle(ext('GameBanner'))(GameBanner)
);
