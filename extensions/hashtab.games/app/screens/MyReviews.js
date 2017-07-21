import React, {
  Component,
} from 'react';

import {
  Picker,
  TouchableOpacity,
  Item,
} from 'react-native';
import {
  reviewsLoaded,
  reviewsFetchError,
} from '../redux/actions';
import { ListView } from '@shoutem/ui';
import { connect } from 'react-redux';
import { ext } from '../const';
import { loginRequired } from 'shoutem.auth';
import _ from 'lodash';
import { Review } from '../components/Review';
import { navigateTo } from '@shoutem/core/navigation';

export class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tried: false,
      userReviews: null,
      articleKeys: null,
    };
    this.getMyReviews = this.getMyReviews.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.getReviewByUser = this.getReviewByUser.bind(this);
  }
  componentWillMount() {
    this.getReviewByUser();
  }
  getMyReviews() {
    const { reviews, userId } = this.props;
    const s = [];

    this.setState({
      data: s,
      tried: true,
    });
  }

  mapToMap(reviews, keys, articleId) {
    var newObj = {}, found = true, i = 0;
    Object.keys(reviews[keys]).map(function (dataKey, index) {
      newObj[dataKey] = reviews[articleId][dataKey];
    });
    console.log(newObj);
    return newObj;
  }

  getReviewByUser(user) {
    user = 'Billy';
    fetch('https://gamereviewsapp.firebaseio.com/reviews/reviews/.json?auth=JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk&orderByChild=username&print=pretty')
      .then((response) => response.json())
      .then((responseJson) => {
        let userReviews = responseJson;
        const articleKeys = Object.keys(responseJson);
        const articleValues = Object.values(responseJson);
        for (let i = 0; i < articleKeys.length; i++) {
          let insert = {};
          let currentValues = Object.values(Object.values(articleValues[i]));
          let reviewKeys = Object.keys(articleValues[i]);
          for (let j = 0; j < currentValues.length; j++) {
            if (currentValues[j].username !== user) {
              console.log(userReviews[articleKeys[i]][reviewKeys[j]]);
              delete userReviews[articleKeys[i]][reviewKeys[j]];
            }
          }
        }
        console.log(articleKeys);
        this.setState({
          articleKeys,
          userReviews,
          tried: true,
        });
      })
      .catch((error) => {
        reviewsFetchError();
        console.log(error);
      });
  }
  edit(id, value) {
    const { navigateTo, article, userId } = this.props;
    const route = {
      screen: ext('FullReviewScreen'),
      props: {
        id,
        value,
        user: userId,
      },
    };
    navigateTo(route);
  }
  renderRow(data, id) {
    return (
      <TouchableOpacity onPress={() => this.edit(data.id, data.value)}>
        <Review data={data} key={id} />
      </TouchableOpacity>
    );
  }
  render() {
    const { s } = this.props;
    //const { tried, data } = this.state;
    console.log("props iz my reviewsa", this.props);
    //if (!tried) this.getMyReviews();
    return (

      (s !== undefined || s !== null || s.length !== 0) ?
        <ListView
          data={s}
          renderRow={this.renderRow}
        /> : <Text>No reviews yet</Text>

    );
  }
  }
}

const mapStateToProps = (state) => {
  const { reviews } = state[ext()];
  const userId = _.get(state, ['shoutem.auth', 'user', 'id']);
  const s = [];
  _.keys(reviews).map((value, index) => {
    _.keys(reviews[value]).map((data, i) => {
      if (reviews[value][data].userId === userId) {
        const x = reviews[value][data];
        x.id = data;
        x.value = value;
        s.push(x);
      }
    });
  });
  return {
    s,
    userId,
  };
};

const mapDispatchToProps = {
  navigateTo,
};

export default loginRequired(connect(mapStateToProps, mapDispatchToProps)(MyReviews));
