import React, { Component } from 'react';
import { connectStyle } from '@shoutem/theme';
import {
  Icon,
  View,
  Button,
} from '@shoutem/ui';
import { Text, Dimensions } from 'react-native';
import { closeModal, openInModal, navigateTo } from '@shoutem/core/navigation';
import { ext } from '../const';
import { GameBanner } from '../components/GameBanner';
import { connect } from 'react-redux';


export class GameButtons extends Component {
  constructor(props) {
    super(props);
    //this.addAReview = this.addAReview.bind(this);
  }

  render() {
    console.log(this.props);
    const { addAReview, openListScreen } = this.props
    return (
      <View style={{ flexDirection: 'row', width: Dimensions.get('window').width }}>
        <Button onPress={() => addAReview()} style={{ marginHorizontal: 20 }}>
          <Icon name="like" />
          <Text>Add a Review</Text>
        </Button>
        <Button onPress={() => openListScreen(this.props.article.id)} style={{ marginHorizontal: 20 }}>
          <Icon name="refresh" />
          <Text>Load more</Text>
        </Button>
      </View>
    );
  }
}
const mapDispatchToProps = {
  openInModal,
  closeModal,
  navigateTo,
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(connectStyle(ext('GameBanner'))(GameBanner));
