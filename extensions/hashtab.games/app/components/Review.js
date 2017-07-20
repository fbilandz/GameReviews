import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Subtitle,
  Icon,
  Divider,
  Title,
} from '@shoutem/ui';
import moment from 'moment';
import { StyleProvider, connectStyle } from '@shoutem/theme';
import StarRating from 'react-native-star-rating';
import { ext } from '../const';
import { connect } from 'react-redux';

export class Review extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <View style={[styles.row, styles.space]}>
          <View styleName="vertical h-start">
            <Title>{this.props.data.username}</Title>
            <Subtitle>{moment(this.props.data.timeStamp).format('L')}</Subtitle>
          </View>
          <View style={styles.row}>
            <Title>{this.props.data.rating}</Title>
            <StarRating
              maxStars={1}
              disable
              rating={1}
              onSelectedStar={(star) => console.log(star)}
              starSize={25}
            />
          </View>

        </View>

        <View styleName="horizontal h-center">
          <Text>{this.props.data.text}</Text>
        </View>
        <Divider styleName="line" />
      </View>
    );
  }
}

const styles = StyleSheet.create();

const styles = StyleSheet.create({
  wrapper: {
    flexWrap: 'wrap',
    //  alignItems: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'flex-end',
  },
  row: {
    flexDirection: 'row',
  },
  space: {
    justifyContent: 'space-between',
  },
});
