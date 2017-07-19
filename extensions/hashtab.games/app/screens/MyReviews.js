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
    _.keys(reviews).map((value, index) => {
      _.keys(reviews[value]).map((data, i) => {
        if (reviews[value][data].userId === userId) s.push(reviews[value][data]);
      });
    });

    console.log("gettam");
    this.setState({
      data: s,
      tried: true,
    });
  }
  edit() {

  }
  renderRow(data, id) {
    return (
      <TouchableOpacity onPress={this.edit}>
        <Review data={data} key={id} />
      </TouchableOpacity>);
  }
  render() {
    const { tried, data } = this.state;
    if (!tried) this.getMyReviews();
    return (

      (data !== undefined || data !== null) ?
        <ListView
          data={data}
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
  return {
    reviews,
    userId,
  };
};

export default connect(mapStateToProps, null)(MyReviews);
