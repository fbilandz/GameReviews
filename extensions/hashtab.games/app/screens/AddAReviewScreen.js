import React, {
  Component
} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { Button } from '@shoutem/ui';

export default class AddAReviewScreen extends Component {
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
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput editable onChangeText={(text) => this.setState({ review: text })} />
        <Button onPress={this.addAReview}><Text>Add a review</Text></Button>
      </View>
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
