import React, {
  Component,
} from 'react';

import {
  Picker,
  TouchableOpacity,
  Item,
  ActivityIndicator,
  Text,
} from 'react-native';
import {
  reviewsLoaded,
  reviewsFetchError,
  reviewsLoading,
  addReviews,
} from '../redux/actions';
import { ListView, Screen } from '@shoutem/ui';
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
    this.getGames = this.getGames.bind(this);
    this.getMyReviews = this.getMyReviews.bind(this);
    this.renderRow = this.renderRow.bind(this);
    // his.getReviewByUser = this.getReviewByUser.bind(this);
  }
  componentWillMount() {
    this.getGames();
  }
  getSomething() {
    const { articleKeys } = this.state;
    const { userId } = this.state;
    _.keys(articleKeys).map((value, index) => {
      this.getReviewByUser(userId, value);
    });
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

  getGames() {
    const { reviewsLoading, reviewsLoaded, userId, addReviews } = this.props;
    reviewsLoading();
    fetch('https://gamereviewsapp.firebaseio.com/reviews/reviews.json?auth=JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk&orderByChild=username&print=pretty')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const articleKeys = Object.keys(responseJson);
        const userReviews = responseJson;
        for (let i = 0; i < articleKeys.length; i++) {
          addReviews(userReviews[articleKeys[i]], articleKeys[i]);
        }
        const articleValues = Object.values(responseJson);
        for (let i = 0; i < articleKeys.length; i++) {
          let currentValues = Object.values(Object.values(articleValues[i]));
          let reviewKeys = Object.keys(articleValues[i]);
          console.log(currentValues, reviewKeys);
          for (let j = 0; j < currentValues.length; j++) {
            if (currentValues[j].userId !== userId) {
              console.log(userReviews[articleKeys[i]][reviewKeys[j]]);
              delete userReviews[articleKeys[i]][reviewKeys[j]];
            }
          }
        }
        this.setState({
          articleKeys,
          tried: true,
          userReviews,
          selected: articleKeys[0],
        });
        reviewsLoaded();
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
  renderPicker(item, index) {
    console.log(item, index);
    return (<Picker.Item label={item} value={item} key={index} />);
  }
  renderRow(data, id) {
    return (
      <TouchableOpacity onPress={() => this.edit(data.id, data.value)}>
        <Review data={data} key={id} />
      </TouchableOpacity>
    );
  }
  render() {
    const { s, loader } = this.props;
    const { userReviews, articleKeys, selected } = this.state;
    // sthis.getReviewByUser();
    //  const { tried, data } = this.state;
    console.log('props iz my reviewsa', this.state);
    //  if (!tried) this.getMyReviews();
    if (userReviews !== null) {
      return (
        <Screen>
          <Picker
            mode="dropdown"
            selectedValue={selected}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({
                selected: itemValue,
              });
            }}
          >
            {
              _.keys(articleKeys).map((item, index) => {
                return this.renderPicker(articleKeys[item], index);
              })
            }
          </Picker>
          <ListView
            data={userReviews[selected]}
            renderRow={this.renderRow}
          />
        </Screen>
      );
    }
    else if (loader.isLoading) {
      return (<ActivityIndicator size="large" />);
    }
    else {
      return (
        <Text>No reviews yet</Text>
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { reviews, loader } = state[ext()];
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
    loader,
  };
};

const mapDispatchToProps = {
  navigateTo,
  reviewsLoaded,
  reviewsLoading,
  reviewsFetchError,
  addReviews,
};

export default loginRequired(connect(mapStateToProps, mapDispatchToProps)(MyReviews));
