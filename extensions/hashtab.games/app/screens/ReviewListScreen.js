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
