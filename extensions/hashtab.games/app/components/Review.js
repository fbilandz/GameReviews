import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Subtitle,
  Divider,
  Card,
  Image,
  Row,
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
      <Row style={styles.rating}>
        <View styleName="horizontal space-between">
          <Title>{this.props.data.username}</Title>
          <Subtitle>{moment(this.props.data.timeStamp).format('L')}</Subtitle>
          <Text>{this.props.data.text}</Text>
        </View>

          <Title style={styles.text}>{this.props.data.rating}</Title>
          <StarRating
            starColor={'#fdbc50'}
            starSize={30}
            disable
            rating={1}
            maxStars={1}
          />
        <Divider styleName="line" />
      </Row>
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
  text : {
    alignSelf: 'flex-end',
  },
});
