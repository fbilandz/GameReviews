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
      <View styleName="horizontal">
      
      <View styleName="vertical fill-parent">
        <View styleName="horizontal">
          <Title>{this.props.data.username}</Title>
          <Subtitle>{moment(this.props.data.timeStamp).format('L')}</Subtitle>
        </View>
        <View styleName="vertical">
          <Text>{this.props.data.rating}</Text>
          <Icon name="like" />
        </View>
      </View>

      <View styleName="vertical h-center">
        <Text>{this.props.data.text}</Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create();

export default connect()(connectStyle(ext('Review'))(Review));