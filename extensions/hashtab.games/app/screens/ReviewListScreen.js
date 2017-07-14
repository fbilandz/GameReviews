import React, { Component } from 'react';
import {
    ListView,
} from '@shoutem/ui';
import {
    ActivityIndicator,
} from 'react-native';
import { Review } from '../components/Review';
import { connect } from 'react-redux';
import { closeModal, openInModal } from '@shoutem/core/navigation';
import {
    addReviews,
    addAReview,
    reviewsLoading,
    reviewsLoaded,
    reviewsFetchError,
} from '../redux/actions';
import { ext } from '../const';

export class ReviewListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props,
        }
        this.getMoreReviews = this.getMoreReviews.bind(this);
        this.getMoreReviews();
    }
    insertIntoReducer(data) {
        const { addReviews, article } = this.props;
        /*
        Object.keys(data).map(function (dataKey, index) {
          addAReview(data[dataKey], dataKey);
        });*/
        addReviews(data, article.id);
    }
    getMoreReviews() {
        const { addReviews, reviewsLoading, reviewsFetchError, reviewsLoaded } = this.props;
        reviewsLoading();
        fetch('https://gamereviewsapp.firebaseio.com' + '/reviews/reviews/' + this.props.article.id + '.json' + '?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk' + '&orderBy=%22username%22&limitToFirst=5&print=pretty%27')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                //  selected review are saved in responseJson.selReview
                this.insertIntoReducer(responseJson);
                this.setState({
                    loading: false,
                });
                reviewsLoaded();
                console.log(this.state);
                //  addReviews(this.state.data)
            })
            .catch((error) => {
                reviewsFetchError();
                console.log(error);
            });
    }
    renderRow(data, rowId) {
        return <Review data={data} key={rowId} />;
    }
    render() {
        const { reviews, id, loader } = this.props;
        return (
            (reviews !== undefined && reviews[id] !== undefined && reviews !== null && reviews[id] !== null) ?
                <ListView
                    data={reviews[id]}
                    renderRow={this.renderRow}
                    loading={loader.isLoading}
                //  onLoadMore={this.getMoreReviews}
                /> : loader.isLoading ? <ActivityIndicator size="small" /> : <Text>No reviews yet</Text>
        );
    }
}

const mapStateToProps = (state) => {
    const { reviews, loader } = state[ext()];
    return {
        reviews,
        loader,
    };
};

const mapDispatchToProps = {
    openInModal,
    closeModal,
    addReviews,
    addAReview,
    reviewsLoaded,
    reviewsFetchError,
    reviewsLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewListScreen);
