import React, { Component } from 'react';
import { Popup, List, Image, Label, Modal, Segment, Grid, Header, Button } from 'semantic-ui-react';
import shortid from 'shortid';
import './styles.css';

class ClusterModal extends Component {
  render() {
    const { articles, open, removeFocused } = this.props;
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

    return (
      <Modal
        className="modal-container"
        open={open}
        onClose={removeFocused}
        closeOnDimmerClick
        dimmer
      >
        <Modal.Content scrolling>
          {articles.map((article) => {
              const sentimentValue = Math.round(article.sentiment.pct * 1000);
              return (
                <Segment key={shortid.generate()} raised className="modal-article-container">
                  <Grid>
                    <Grid.Row columns={3}>
                      <Grid.Column width={4}>
                        <Label color={colors[Math.floor(Math.random() * colors.length)]} ribbon className="news-label">{article.source}</Label>
                        <Image src={article.topImageUrl} />
                      </Grid.Column>
                      <Grid.Column width={8} style={{ marginTop: '3rem' }}>
                        <Header as="h3" href={article.sourceUrl} color="blue">{article.title}</Header>
                        <div className="author-date-container">
                          {article.authors.map((author) => (
                            <span key={shortid.generate()}>
                              {author},
                            </span>
                        ))}
                          <br />
                          {new Date(article.publishDate).toDateString()}
                        </div>
                        <div>
                          {`${article.summary[0].substring(0, 500)}...`}
                        </div>
                      </Grid.Column>
                      <Grid.Column width={4}>
                        <Label.Group size="tiny" className="label-group">
                          <div className="label-master">
                            <Label basic color="pink">Category</Label>
                          </div>
                          <div>
                            {article.categories.map((category) => (<Label tag key={shortid.generate()}>{category}</Label>))}
                          </div>
                        </Label.Group>
                        <Label.Group size="tiny" className="label-group">
                          <div className="label-master">
                            <Label basic color="teal">Keywords</Label>
                          </div>
                          <div>
                            {article.keywords.map((keyword) => (<Label as="a" tag style={{ marginBottom: '0.3rem' }} key={shortid.generate()}>{keyword}</Label>))}
                          </div>
                        </Label.Group>
                        <Label.Group size="tiny" className="label-group cluster-modal-sentiment">
                          <div className="label-master">
                            <Label basic color="orange">Sentiment</Label>
                          </div>
                          <div>
                            <Label as="a" tag style={{ textTransform: 'capitalize' }}>{sentimentValue > 100 ? '100%' : `${sentimentValue}%`} {article.sentiment.result}</Label>
                          </div>
                        </Label.Group>
                        <Button color="blue" circular style={{ float: 'right' }} href={article.url} target="_blank">Read More</Button>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Segment>
            );
            })}
        </Modal.Content>
      </Modal>
    );
  }
}

export default ClusterModal;