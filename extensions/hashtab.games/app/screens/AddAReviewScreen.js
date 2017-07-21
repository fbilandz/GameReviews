import React, {
  Component,
} from 'react';

import {
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Button, Screen } from '@shoutem/ui';
import { connectStyle } from '@shoutem/theme';
import { ext } from '../const';
import { connect } from 'react-redux';
import { loginRequired } from 'shoutem.auth';
import _ from 'lodash';
import { closeModal, openInModal, navigateBack } from '@shoutem/core/navigation';

export class AddAReviewScreen extends Component {
  static propTypes = {
    rating: React.PropTypes.number,
    props: React.PropTypes.object,
  }
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      review: '',
      // rating: props.rating !== undefined || props.rating !== null ? props.rating : 0,
      props,

    };
    this.rateIt = this.rateIt.bind(this);

  }
  componentWillMount() {
    if (this.state.props.review) {
      this.setState({
        review: this.state.props.review,
      });
    }
  }
  rateIt() {
    const { review } = this.state;
    const { openInModal, closeModal, id, navigateBack } = this.props;
    const route = {
      screen: ext('RateScreen'),
      props: {
        onClose: closeModal,
        review,
        id,
        navigateBack,
      },
    };
    openInModal(route);
  }
  render() {
    // const styles = this.props.style;
    const { props } = this.state;
    console.log(this.props);
    return (
      <Screen styleName="full-screen paper" style={styles.container}>
        <TextInput
          style={styles.textInput}
          editable
          onChangeText={(text) => this.setState({ review: text })}
          multiline
          numberOfLines={10}
          placeholder="Write a review"
          value={this.state.review}
          placeholderTextColor="orange"
        />

        <Button
          styleName="lg-gutter-horizontal lg-gutter-vertical"
          onPress={this.rateIt}
        >
          <Text style={styles.margine}>Rate it</Text>
        </Button>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 1,
  },
  textInput: {
    marginTop: 55,
    marginBottom: 5,
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
  },
  margine: {
    marginVertical: 6,
    marginHorizontal: 32,
  },
});
const mapDispatchToProps = {
  openInModal,
  closeModal,
  navigateBack,
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
    AddAReviewScreen
  )
);
