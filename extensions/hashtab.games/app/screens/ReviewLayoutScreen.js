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
  ListView,
  Button,
  Divider,
} from '@shoutem/ui';
import { Text, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationBar } from '@shoutem/ui/navigation';
import { loginRequired } from 'shoutem.auth';
import { closeModal, openInModal, navigateTo } from '@shoutem/core/navigation';
import * as _ from 'lodash';
import moment from 'moment';
import { ext } from '../const';
import { NextArticle } from '../components/NextArticle';
import { Review } from '../components/Review';
import StarRating from 'react-native-star-rating';
import AddAReviewScreen from './AddAReviewScreen';
import { connect } from 'react-redux';
import {
  addReviews,
  addAReview,
  reviewsLoading,
  reviewsLoaded,
  reviewsFetchError,
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
    };
    console.log(this.props);
    this.renderRow = this.renderRow.bind(this);
    this.getReview = this.getReview.bind(this);
    this.addAReview = this.addAReview.bind(this);
    // this.getMoreReviews = this.getMoreReviews.bind(this);
    this.openListScreen = this.openListScreen.bind(this);
    this.getReview();
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
  getRating(data) {
    if (data === null || data === undefined) return 0;
    let rating = 0;
    let count = 0;
    Object.keys(data).map(function (dataKey, index) {
      rating += data[dataKey].rating;
      count++;
    });
    return rating / (count);
  }

  insertIntoReducer(data) {
    const { addReviews, article } = this.props;
    /*
    Object.keys(data).map(function (dataKey, index) {
      addAReview(data[dataKey], dataKey);
    });*/
    addReviews(data, article.id);
  }
  getReview() {
    console.log(this.props);
    const { addReviews, reviewsLoading, reviewsFetchError, reviewsLoaded } = this.props;
    reviewsLoading();
    fetch('https://gamereviewsapp.firebaseio.com' + '/reviews/reviews/' + this.props.article.id + '.json' + '?auth=' + 'JfsF3SK5tnCZPlC3FG1XXKeon7U3LVk0kZ2SZ6Uk' + '&orderBy=%22timestamp%22&limitToLast=5&print=pretty%27')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //  selected review are saved in responseJson.selReview
        this.insertIntoReducer(responseJson);
        this.setState({
          loading: false,
        });
        reviewsLoaded();
        this.setState({
          rating: this.getRating(this.props.reviews[this.props.article.id])
        });
        console.log(this.state);
        //  addReviews(this.state.data)
      })
      .catch((error) => {
        reviewsFetchError();
        console.log(error);
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
    console.log(this.props);
    const { openInModal, closeModal, article } = this.props;
    console.log(rating)
    const route = {
      screen: ext('AddAReviewScreen'),
      props: {
        user: 'Billy',
        id: article.id,
        onClose: closeModal,
        rating,
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
    return <Review data={data} key={rowId} />;
  }
  render(rating) {
    const { article, reviews, loader } = this.props;
    //  const { data } = this.state;
    const articleImage = article.image ? { uri: _.get(article, 'image.url') } : undefined;
    console.log(reviews);
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
                disable
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
              (reviews !== undefined && reviews[article.id] !== undefined && reviews !== null && reviews[article.id] !== null) ?
                <ListView
                  data={reviews[article.id]}
                  renderRow={this.renderRow}
                  loading={loader.isLoading}
                  //  onLoadMore={this.getMoreReviews}
                /> : loader.isLoading ? <ActivityIndicator size="small" /> : <Text>No reviews yet</Text>
            }
            <Button onPress={() => this.openListScreen(article.id)}>
              <Icon name="like" />
              <Text>Load more content</Text>
            </Button>
          </View>
          {this.renderUpNext()}
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
  reviewsLoading,
  navigateTo,
};

const mapStateToProps = (state) => {
  const { reviews, loader } = state[ext()];
  return {
    reviews,
    loader,
  };
};

export default loginRequired(
  connect(mapStateToProps, mapDispatchToProps)(
    connectStyle(ext('ReviewLayoutScreen')
    )(ReviewLayoutScreen))
);

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
  },
});
