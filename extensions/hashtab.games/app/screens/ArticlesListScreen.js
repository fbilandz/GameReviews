import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { connectStyle } from '@shoutem/theme';
import { navigateTo } from '@shoutem/core/navigation';

import { CmsListScreen } from 'shoutem.cms';

import { ext } from '../const';
import { ListArticleView } from '../components/ListArticleView';

const db = "https://gamereviewsapp.firebaseio.com";

export class ArticlesListScreen extends CmsListScreen {
  static propTypes = {
    ...CmsListScreen.propTypes,
    navigateTo: React.PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.openArticle = this.openArticle.bind(this);
    this.openArticleWithId = this.openArticleWithId.bind(this);
    this.renderRow = this.renderRow.bind(this);

    this.state = {
      ...this.state,
      schema: ext('articles'),
    };
  }
  
  //function for fetching reviews
  getReviews() {
    return fetch(db + '/reviews.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //reviews are saved in responseJson.reviews
        return responseJson.reviews;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getReviews(id){
     return fetch(db + '/reviews/' + id + '.json')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        //selected review are saved in responseJson.selReview
        return responseJson.selReview;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  openArticle(article) {
    const { navigateTo } = this.props;
    const nextArticle = this.getNextArticle(article);

    const route = {
      screen: ext('ArticleDetailsScreen'),
      title: article.title,
      props: {
        article,
        nextArticle,
        openArticle: this.openArticle,
      },
    };

    navigateTo(route);
  }

  openArticleWithId(id) {
    const { data } = this.props;
    const article = _.find(data, { id });
    this.openArticle(article);
  }

  getNextArticle(article) {
    const { data } = this.props;
    const currentArticleIndex = _.findIndex(data, { id: article.id });
    return data[currentArticleIndex + 1];
  }

  renderRow(article) {
    return (
      <ListArticleView
        key={article.id}
        articleId={article.id}
        title={article.title}
        imageUrl={_.get(article, 'image.url')}
        date={article.timeUpdated}
        onPress={this.openArticleWithId}
      />
    );
  }
}

export const mapStateToProps = CmsListScreen.createMapStateToProps(
  state => state[ext()].latestNews,
);

export const mapDispatchToProps = CmsListScreen.createMapDispatchToProps({
  navigateTo,
});

export default connect(mapStateToProps, mapDispatchToProps)(
  connectStyle(ext('ArticlesListScreen'), {})(ArticlesListScreen),
);