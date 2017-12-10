import React, { Component } from 'react';
import { Grid, Image, Header, Divider, Label, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import shortid from 'shortid';
import { addRecentArticle, fetchRecentArticles } from '../../modules/recentArticles';
import './styles.css';

const mapStateToProps = ({
  recentArticles: {
    articles,
  },
  socket,
}) => ({
  articles,
  socket,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  addRecentArticle,
  fetchRecentArticles,
}, dispatch);

class RecentArticles extends Component {
  componentDidMount() {
    const { socket } = this.props;

    this.props.fetchRecentArticles(15, () => {
      socket.on('newArticle', (article) => {
        this.props.addRecentArticle(article);
      });
    });
  }

  componentWillUnmount() {
    this.props.socket.removeAllListeners();
  }

  render() {
    const { articles } = this.props;

    return (
      <div>
        <Segment>
          <Label as="a" color="blue" ribbon style={{ marginBottom: '1rem' }}>Recent Articles</Label>
          <div className="scrollable-section">
            {articles.map((article) => (
              <div key={shortid.generate()}>
                <Grid>
                  <Grid.Row className="article-item">
                    <Grid.Column width={6} className="article-info" style={{ padding: '1.3rem !important' }}>
                      <Image src={article.topImageUrl} href={article.url} target="_blank" />
                    </Grid.Column>

                    <Grid.Column width={10} className="article-info">
                      <Header as="h4">{article.title}</Header>
                      <span className="source-name">{article.source}</span>
                      <p> {article.summary[0]} </p>
                      {article.categories.map((category) => (
                        <Label key={shortid.generate()} size="small" style={{ margin: '0.14285714em' }}>{category}</Label>
                      ))}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Divider section />
              </div>
          ))}
          </div>
        </Segment>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecentArticles);

