import React, { Component } from 'react';
import {
  ListView,
} from '@shoutem/ui';
import {
  ActivityIndicator,
  TouchableOpacity,
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
  mapReviews,
} from '../redux/actions';
import { ext } from '../const';
import _ from 'lodash';

export class ReviewListScreen extends Component {
  static propTypes = {
    getReviews: React.PropTypes.func,
    map: React.PropTypes.object,
    mapReviews: React.PropTypes.func,
    article: React.PropTypes.object,
    reviews: React.PropTypes.object,
    loader: React.PropTypes.object,
    id: React.PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      props,
    };
    this.getMoreReviews = this.getMoreReviews.bind(this);
    this.noMoreReviews = this.noMoreReviews.bind(this);
    this.initialReviews = this.initialReviews.bind(this);
    this.refresh = this.refresh.bind(this);
  }
  componentWillMount() {
    this.initialReviews();
  }
  getMoreReviews() {
    const { mapReviews, article, reviews, map } = this.props;
    console.log(reviews);
    const keys = Object.keys(map[article.id]);
    console.log(keys);
    const newObj = {};
    let found = true;
    let i = 0;
    _.keys(reviews[article.id]).map(function (dataKey) {
      if (i === 5) found = false;
      if (found) {
        newObj[dataKey] = reviews[article.id][dataKey];
        i++;
      }
      let ind = 0;
      console.log(dataKey);
      for (; ind < keys.length; ind++) {
        if (keys[ind] === dataKey.toString()) break;
      }
      if (ind !== keys.length) i--;
    });
    console.log(newObj);
    mapReviews(newObj, article.id);
  }
  initialReviews() {
    const { mapReviews, article, reviews, map } = this.props;
    console.log(reviews);
    const keys = _.keys(map[article.id]);
    console.log(keys);
    const newObj = {};
    let found = true;
    let i = 0;
    _.keys(reviews[article.id]).map(function (dataKey, index) {
      if (i === 10) found = false;
      if (found) {
        newObj[dataKey] = reviews[article.id][dataKey];
        i++;
      }
      let ind = 0;
      console.log(dataKey);
      for (; ind < keys.length; ind++) {
        if (keys[ind] == dataKey.toString()) break;
      }
      if (ind !== keys.length) i--;
    });
    console.log(newObj);
    mapReviews(newObj, article.id);
  }
  noMoreReviews(id) {
    const { reviews, map } = this.props;
    console.log('Loadanje');
    if (reviews[id].length === map[id].length) return null;
    return this.getMoreReviews;
  }
  refresh() {
    const { getReviews } = this.props;
    getReviews();
    this.getMoreReviews();
  }
  renderRow(data, rowId) {
    let x = true;
    return (
      <Review data={data} key={rowId} expandable={x} />
    );
  }
  render() {
    const { map, id, loader, getReviews } = this.props;
    return (
      (map !== undefined && map[id] !== undefined && map !== null && map[id] !== null) ?
        <ListView
          data={map[id]}
          renderRow={this.renderRow}
          loading={loader.isLoading}
          onLoadMore={this.getMoreReviews}
          onRefresh={() => this.refresh()}
        />
        :
        loader.isLoading ?
          <ActivityIndicator size="small" /> : <Text>No reviews yet</Text>
    );
  }
}

const mapStateToProps = (state) => {
  const { reviews, loader, map } = state[ext()];
  return {
    reviews,
    loader,
    map,
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
  mapReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewListScreen);
