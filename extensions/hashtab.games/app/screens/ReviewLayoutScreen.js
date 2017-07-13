import React from 'react';
import { StyleProvider, connectStyle } from '@shoutem/theme';
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
import { Text, StyleSheet } from 'react-native'
import { NavigationBar } from '@shoutem/ui/navigation';
import { loginRequired } from 'shoutem.auth';
import { closeModal, openInModal } from '@shoutem/core/navigation';
import * as _ from 'lodash';
import moment from 'moment';
import { ListView, Button, Divider } from '@shoutem/ui';
import { ext } from '../const';
import { NextArticle } from '../components/NextArticle';
import { Review } from '../components/Review';
import StarRating from 'react-native-star-rating';
import AddAReviewScreen from './AddAReviewScreen';
import { connect } from 'react-redux'
import {
  addReviews,
  addAReview,
  reviewsLoading,
  reviewsLoaded,
  reviewsFetchError
} from '../redux/actions';

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
      loading: true,
      rating: 0,
    }
    console.log(this.props);
    this.renderRow = this.renderRow.bind(this);
    this.getReview = this.getReview.bind(this);
    this.addAReview = this.addAReview.bind(this);
    this.getReview();
  }
  getRating(data) {
    if (data === null) return 0;
    let rating = 0, count = 0;
    Object.keys(data).map(function (dataKey, index) {
      rating += data[dataKey].rating;
      count++;
    });
    return rating / (count);
  }

  insertIntoReducer(data) {
    const { addAReview } = this.props;
    if (data == null || data == undefined) return null;
    data = JSON.stringify(data)
    done = false;
    while (!done) {
      var f = data.indexOf('"');
      var l = data.indexOf('"', f + 1);
      console.log(data.substring(f + 1, l));
      var name = data.substring(f + 1, l);
      var i = data.indexOf(":");
      var z = data.indexOf("}");
      console.log(data, i, z);
      var a = JSON.parse(data.substring(i + 1, z + 1));
      addAReview(a, name);
      data = data.substring(z + 2, data.length);
      console.log(data);
      if (!data.length) done = true;
    }
    return;
  }

  getReview() {
    console.log(this.props);
    const { addReviews, reviewsLoading, reviewsFetchError, reviewsLoaded } = this.props;
    //reviewsLoading();
    fetch('https://gamereviewsapp.firebaseio.com' + '/reviews/reviews/' + this.props.article.id + '.json' + '?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //selected review are saved in responseJson.selReview
        this.insertIntoReducer(responseJson);
        this.setState({
          loading: false,
        })
        //reviewsLoaded();
        this.setState({
          rating: this.getRating(this.props.reviews)
        })
        console.log(this.state);
        //addReviews(this.state.data)
      })
      .catch((error) => {
        reviewsFetchError();

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

  addAReview(rating) {
    console.log(this.props)
    const { openInModal, closeModal, article } = this.props;

    const route = {
      screen: ext('AddAReviewScreen'),
      props: {
        user: "Billy",
        id: article.id,
        onClose: closeModal,
        rating: rating,
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
    const { article, reviews } = this.props;
    const { data } = this.state;
    const articleImage = article.image ? { uri: _.get(article, 'image.url') } : undefined;
    var array = []
    //if (!this.state.loading)  array = this.objToArray(reviews);
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
                selectedStar={(star) => this.addAReview(star)}
              />
              <Divider styleName="line" />
              <Title styleName="h-center">About</Title>
              <Html body={article.body} />
            </View>
            <Divider styleName="line" />
            <Button onPress={this.addAReview}>
              <Icon name="like" />
              <Text>Add a Review</Text>
            </Button>
            <Title styleName="h-center">Reviews</Title>
            {
              (array !== null) || this.state.loading ? <ListView
                data={reviews}
                renderRow={this.renderRow}
                loading={this.state.loading}
              /> : <Text>No reviews yet</Text>
            }

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
  addReviews,
  addAReview,
  reviewsLoaded,
  reviewsFetchError,
  reviewsLoading
};

const mapStateToProps = (state) => {
  const { reviews } = state[ext()];
  return {
    reviews
  }
}

export default loginRequired(
  connect(mapStateToProps, mapDispatchToProps)(connectStyle(ext('ReviewLayoutScreen'))(ReviewLayoutScreen))
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
  }
})


