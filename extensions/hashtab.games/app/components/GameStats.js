import React from 'react';
import { connectStyle } from '@shoutem/theme';
import {
    Title,
    Subtitle,
    View,
} from '@shoutem/ui';
import moment from 'moment';
import { ext } from '../const';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';

export class GameStats extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
                <View styleName="horizontal space-between">
                    <View styleName="horizontal" style={{ alignSelf: 'center' }}>
                        <Title>Rating: </Title>
                        <Title>{this.props.rating === undefined ? null : this.props.rating.toFixed(1)} </Title>
                        <StarRating
                            starColor={'#fdbc50'}
                            starSize={30}
                            disable
                            rating={1}
                            maxStars={1}
                        />
                    </View>

                    <View styleName="md-gutter-right">
                        <Title>Last review : </Title>
                        <Subtitle>{this.props.lastReview === undefined ? null : moment(this.props.lastReview.timeStamp).fromNow()}</Subtitle>
                    </View>
                </View>
            </View>
        );
    }
}

export default connect()(connectStyle(ext('GameStats'))(GameStats)
);
