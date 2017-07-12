import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions

} from 'react-native';
import { Button } from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme'
import { ext } from '../const';
import StarRating from 'react-native-star-rating'

export class AddAReviewScreen extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      review: "Neki je",
      rating: null || 0,
      props: props
    }
    this.addAReview = this.addAReview.bind(this)
  }
  addAReview() {
    const { onClose } = this.props;
    console.log(this.state)
    fetch('https://gamereviewsapp.firebaseio.com/reviews/reviews/' + this.props.id + '.json?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.props.user,
          text: this.state.review,
          rating: this.state.rating,
        })
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        console.log(this.state);
        onClose();
      })
  }
  render() {
    const styles = this.props.style;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <TextInput style={styles.textInput} editable onChangeText={(text) => this.setState({ review: text })} numberOfLines={4} maxLength={140} multiline placeholder="Write a review (max. 140 characters)" placeholderTextColor="orange" />
        <StarRating
          rating={this.state.rating}
          selectedStar={(rate) => this.setState({ rating: rate })}
          maxStars={10}
        />
        <Button onPress={this.addAReview}><Text>Add a review</Text></Button>
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
    width: Dimensions.get("window").width * 0.8
  }
};

export default connectStyle(ext('AddAReviewScreen'), styles)(AddAReviewScreen)