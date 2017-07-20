import React from 'react';
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


export class GameButtons extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  openListScreen(id) {
    const { navigateTo, article } = this.props;
    const route = {
      screen: ext('ReviewListScreen'),
      title: article.title,
      props: {
        article,
        id,
      },
    };
    navigateTo(route);
  }

  addAReview() {
    console.log(this.props);
    const { openInModal, closeModal, article } = this.props;
    const route = {
      screen: ext('AddAReviewScreen'),
      props: {
        user: 'Billy',
        id: article.id,
        onClose: closeModal,
      },
    };
    openInModal(route);
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', width: Dimensions.get('window').width }}>
        <Button onPress={this.addAReview} style={{ marginHorizontal: 20 }}>
          <Icon name="like" />
          <Text>Add a Review</Text>
        </Button>
        <Button onPress={() => this.openListScreen(this.props.article.id)} style={{ marginHorizontal: 20 }}>
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

export default connect(mapDispatchToProps)(connectStyle(ext('GameBanner'))(GameBanner));
