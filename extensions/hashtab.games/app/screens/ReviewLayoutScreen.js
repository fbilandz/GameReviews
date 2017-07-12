import React from 'react';
import { connectStyle } from '@shoutem/theme';
import {
  ScrollView,
  Screen,
  Title,
  Caption,
  Icon,
  Image,
  Tile,
  Html,
  View,
} from '@shoutem/ui';
import { Text } from 'react-native'
import { NavigationBar } from '@shoutem/ui/navigation';
import { loginRequired } from 'shoutem.auth';
import { closeModal, openInModal } from '@shoutem/core/navigation';
import * as _ from 'lodash';
import moment from 'moment';
import { ListView, Button } from '@shoutem/ui';
import { ext } from '../const';
import { NextArticle } from '../components/NextArticle';
import { Review } from '../components/Review';
import StarRating from 'react-native-star-rating';
import AddAReviewScreen from './AddAReviewScreen';
import { connect } from 'react-redux'

export class ReviewLayoutScreen extends React.PureComponent {
  static propTypes = {
    // The news article to display
    article: React.PropTypes.object.isRequired,
    // The next article, if this article is defined, the
    // up next view will be displayed on this screen
    nextArticle: React.PropTypes.object,
    // A function that will open the given article, this
    // function is required to show the up next view
    openArticle: React.PropTypes.func,
    openInModal: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      rating: 0,
    }
    console.log(this.props);
    this.renderRow = this.renderRow.bind(this);
    this.getReview = this.getReview.bind(this);
    this.addAReview = this.addAReview.bind(this);
    this.getReview();
  }
  objToArray(data) {
    data = JSON.stringify(data)
    var array = [];
    done = false;
    while (!done) {
      var i = data.indexOf(":");
      var z = data.indexOf("}");
      console.log(data, i, z);
      var a = JSON.parse(data.substring(i + 1, z + 1));
      data = data.substring(z + 2, data.length);
      console.log(data);
      array.push(a);
      if (!data.length) done = true;
    }
    return array;
  }
  getRating(data) {
    let rating = 0, count = 0;
    for (; count < data.length; count++) {
      rating += data[count].rating;
    }
    return rating / (count);
  }

  getReview() {
    fetch('https://gamereviewsapp.firebaseio.com' + '/reviews/reviews/' + this.props.article.id + '.json' + '?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //selected review are saved in responseJson.selReview
        this.setState({
          data: this.objToArray(responseJson),
          loading: false,
        })
        this.setState({
          rating: this.getRating(this.state.data)
        })
        console.log(this.state);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  addAReview() {
    console.log(this.props)
    const { openInModal, closeModal, article } = this.props;

    const route = {
      screen: ext('AddAReviewScreen'),
      props: {
        user: "Billy",
        id: article.id,
        onClose: closeModal,
      },
    };

    openInModal(route);
  }



  renderUpNext() {
    const { nextArticle, openArticle } = this.props;
    if (nextArticle && openArticle) {
      return (
        <NextArticle
          title={nextArticle.title}
          imageUrl={_.get(nextArticle, 'image.url')}
          openArticle={() => openArticle(nextArticle)}
        />
      );
    }

    return null;
  }
  renderRow(data, rowId) {
    return <Review data={data} />
  }
  render(rating) {
    const { article } = this.props;
    const { data } = this.state;
    const articleImage = article.image ? { uri: _.get(article, 'image.url') } : undefined;
    console.log(this.props);
    return (
      <Screen styleName="full-screen paper">
        <NavigationBar
          styleName="clear"
          animationName="solidify"
          title={article.title}
          share={{
            link: article.link,
            title: article.title,
          }}
        />
        <ScrollView>
          <Image
            styleName="large-portrait placeholder"
            source={articleImage}
            animationName="hero"
          >
            <Tile animationName="hero">
              <Title styleName="centered">{article.title.toUpperCase()}</Title>
              {/* Virtual prop makes View pass Tile color style to Caption */}
              <View styleName="horizontal md-gutter-top" virtual>
                <Caption styleName="collapsible" numberOfLines={1}>{article.newsAuthor}</Caption>
                <Caption styleName="md-gutter-left">
                  {moment(article.timeUpdated).fromNow()}
                </Caption>
              </View>
            </Tile>
            <Icon name="down-arrow" styleName="scroll-indicator" />
          </Image>
          <View styleName="solid">
            <View styleName="solid h-center">
              <Title styleName="h-center">Average rating:</Title>
              <StarRating
                disable={true}
                rating={this.state.rating}
                maxStars={10}
                starSize={25}
                starStyle={{ justifyContent: 'center' }}
                starColor={'red'}
                selectedStar={(star) => console.log(star)}
              />
              <Title styleName="h-center">About</Title>
              <Html body={article.body} />
            </View>
            <Button onPress={this.addAReview}>
              <Icon name="like" />
              <Text>Add a Review</Text>
            </Button>
            <Title styleName="h-center">Reviews</Title>
            <ListView
              data={data}
              renderRow={this.renderRow}
            />
            {this.renderUpNext()}
          </View>
        </ScrollView>
      </Screen>
    );
  }
}

const mapDispatchToProps = {
  openInModal,
  closeModal,
};

const mapStateToProps = (state) => {
  return {
    state
  }
}

export default loginRequired(
  connect(null, mapDispatchToProps)(connectStyle(ext('ReviewLayoutScreen'))(ReviewLayoutScreen))
);

