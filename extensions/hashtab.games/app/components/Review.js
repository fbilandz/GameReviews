import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Subtitle,
  Divider,
  Card,
  Image,
  Row,
  Icon,
  Tile,
  Caption,
  Title,
} from '@shoutem/ui';
import moment from 'moment';
import { StyleProvider, connectStyle } from '@shoutem/theme';
import StarRating from 'react-native-star-rating';
import { ext } from '../const';

export class Review extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
        <View style={[styles.row, styles.space]}>
          <View styleName="vertical h-start">
            <Title>{this.props.data.username}</Title>
            <Subtitle>{moment(this.props.data.timeStamp).format('L')}</Subtitle>
          </View>
          <View style={[styles.row, { alignSelf: 'center' }]}>
            <Title>{this.props.data.rating}</Title>
            <StarRating
              maxStars={1}
              disable
              rating={1}
              onSelectedStar={(star) => console.log(star)}
              starSize={25}
              starColor={'#fdbc50'}
            />
          </View>

        </View>

        <View styleName="horizontal h-center">
          <Text>{this.props.data.text}</Text>
        </View>
        <Divider styleName="line" />
      </View >
    );
  }
}

const theme = {
  'shoutem.ui.Card': {
    // card component variants
    '.dark': {
      backgroundColor: '#000',
    },

    '.light': {
      backgroundColor: '#fff',
    },

    // style variant available to child components of any type
    '*.card-content': {
      padding: 15,
    },

    // style that will be applied to all child image components
    'shoutem.ui.Image': {
      flex: 1,
      resizeMode: 'cover',
    },

    // style variant available to child image comoponents
    'shoutem.ui.Image.banner': {
      height: 85,
    },

    // default card style, we usually place these rules at the bottom
    backgroundColor: '#fff',
    borderRadius: 2,

    // card shadow style
    shadowColor: 'black',
    shadowRadius: 9,
    shadowOpacity: 0.3,
    shadowOffset: { width: 5, height: 7 }
  },
  wrapper: {
    flexWrap: 'wrap',
    alignItems: 'space-between',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
};

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
