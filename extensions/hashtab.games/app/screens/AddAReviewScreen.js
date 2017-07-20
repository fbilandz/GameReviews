import React, {
  Component,
} from 'react';

import {
  Text,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import { Button } from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import { ext } from '../const';
import StarRating from 'react-native-star-rating';
import { connect } from 'react-redux';
import { addAReview, mapReviews, editAReview } from '../redux/actions';
import { loginRequired } from 'shoutem.auth';
import moment from 'moment';
import _ from 'lodash';

export class AddAReviewScreen extends Component {
  static propTypes = {
    rating: React.PropTypes.number,
    props: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      review: "",
      rating: props.rating !== undefined || props.rating !== null ? props.rating : 0,
      props,
    };
    this.addAReview = this.addAReview.bind(this);
    this.editReview = this.editReview.bind(this);
  }
  componentWillMount() {
    if (this.state.props.review) {
      this.setState({
        review: this.state.props.review,
      });
    }
  }
  editReview() {
    const { userId, username, editAReview } = this.props;
    const { review, rating, props } = this.state;
    fetch('https://gamereviewsapp.firebaseio.com/reviews/reviews/' + props.id + '/' + props.name + '.json?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk',
      {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: review,
          rating,
          timeStamp: moment(),
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(this.state);
        console.log(review);
        editAReview({ text: review, rating, userId, username, timeStamp: responseJson.timeStamp }, props.name, props.id);
        props.onClose();
      });
  }
  addAReview() {
    const { onClose, mapReview, addAReview, id, userId, username } = this.props;
    console.log(this.state)
    fetch('https://gamereviewsapp.firebaseio.com/reviews/reviews/' + this.props.id + '.json?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          userId,
          text: this.state.review,
          rating: this.state.rating,
          timeStamp: moment(),
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(this.state);
        addAReview({
          rating: this.state.rating,
          text: this.state.review,
          username,
        },
          responseJson.name,
          this.props.id
        );
        onClose();
      });
  }
  render() {
    const styles = this.props.style;
    const { props } = this.state;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          editable
          onChangeText={(text) => this.setState({ review: text })}
          numberOfLines={4}
          multiline
          placeholder="Write a review"
          value={this.state.review}
          placeholderTextColor="orange"
        />
        <StarRating
          rating={this.state.rating}
          selectedStar={(rate) => this.setState({ rating: rate })}
          maxStars={10}
        />
        <Button
          onPress={props.type === 'EDIT' ? this.editReview : this.addAReview}
        >
          <Text>{props.type === 'EDIT' ? 'Edit' : 'Add'} a review</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  textInput: {
    width: Dimensions.get('window').width * 0.8,
  },
};
const mapDispatchToProps = {
  addAReview,
  mapReviews,
  editAReview,
};

const mapStateToProps = (state) => {
  const userId = _.get(state, ['shoutem.auth', 'user', 'id']);
  const username = _.get(state, ['shoutem.auth', 'user', 'name']);
  console.log(userId, username);
  return {
    userId,
    username,
  };
};

export default loginRequired(
  connect(mapStateToProps, mapDispatchToProps)(
    connectStyle(
      ext('AddAReviewScreen'), styles)(AddAReviewScreen)
  )
);
