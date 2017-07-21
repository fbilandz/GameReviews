import React, {
  Component,
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { ListView } from '@shoutem/ui';
import { connect } from 'react-redux';
import { ext } from '../const';
import _ from 'lodash';
import { Review } from '../components/Review';
import { navigateTo } from '@shoutem/core/navigation';

export class MyReviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tried: false,
    };
    this.getMyReviews = this.getMyReviews.bind(this);
    this.renderRow = this.renderRow.bind(this);
    // this.getMyReviews();
  }
  componentWillMount() {
    this.getMyReviews();
  }
  getMyReviews() {
    const { reviews, userId } = this.props;
    const s = [];

    this.setState({
      data: s,
      tried: true,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(MyReviews);
