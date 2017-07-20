import React from 'react';
import { connectStyle } from '@shoutem/theme';
import {
  Title,
  View,
  ListView,
} from '@shoutem/ui';
import { Text, ActivityIndicator } from 'react-native';
import { ext } from '../const';
import { connect } from 'react-redux';
import { Review } from '../components/Review';

export class GameReviews extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const { article, initial, loader } = this.props;
        return (
            <View>
                <Title styleName="h-center">Reviews</Title>
                {
                    (initial !== undefined && initial[article.id] !== undefined && initial !== null && initial[article.id] !== null) ?
                        <ListView
                            data={initial[article.id]}
                            renderRow={this.renderRow}
                            loading={loader.isLoading}
                        //  onLoadMore={this.getMoreReviews}
                        /> : loader.isLoading ? <ActivityIndicator size="small" /> : <Text>No reviews yet</Text>
                }
            </View>
        );
    }
}

export default connect()(connectStyle(ext('GameReviews'))(GameReviews)
);
