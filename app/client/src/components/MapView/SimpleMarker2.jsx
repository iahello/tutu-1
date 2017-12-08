import React, { Component } from 'react';
import { Label, Accordion, Header, Icon, Image, Button } from 'semantic-ui-react';
import shortid from 'shortid';
import { Tooltip } from 'react-tippy';
import Reactions from './Reactions';
import './styles.css';

class SimpleMarker2 extends Component {
  state = { activeIndex: 0 };

  changeIndex = ((_, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  })

  fetchRelated = () => {
    const {
      article: {
        title,
        keywords,
        people,
        organizations,
        categories,
      },
      fetchRelatedArticles,
    } = this.props;

    fetchRelatedArticles(
      title,
      keywords.join(),
      people.join(),
      organizations.join(),
      categories.join(),
    );
  }

  render() {
    const {
      article: {
        topImageUrl,
        url,
        sourceUrl,
        source,
        title,
        authors,
        publishDate,
        summary,
        categories,
        keywords,
        sentiment,
        fetchRelatedArticles,
      },
    } = this.props;
    const { activeIndex } = this.state;
    const length = 400;
    const shortSummary = `${summary[0].substring(0, length)}...`;
    const multiAuthor = authors.map((author) => (
      <span>
        {author},
      </span>
    ));
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];


    return (
      <Tooltip
      // options
        position="left"
        onShow={() => this.setState({ isOpen: true })}
        onHide={() => this.setState({ isOpen: false })}
        distance={15}
        html={
          <div>
            <Label as="a" href={`http://${sourceUrl}`} ribbon color={colors[Math.floor(Math.random() * colors.length)]} target="_blank" className="news-label news-marker-tooltip">{source}</Label>
            <div className="image-container">
              <Image
                src={topImageUrl}
                shape="rounded"
                className="simple-marker-image"
              />
              <Button color="blue" content="Read More" className="read-more-button" circular href={url} target="_blank" />
            </div>

            <Header as="a" href={url} target="_blank" color="blue">{title}</Header>

            <div className="author-date-container">
              <div className="author-name">
                {multiAuthor} | {new Date(publishDate).toDateString()}
              </div>
            </div>

            <Accordion basic className="accordion-container">
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.changeIndex}>
                <Icon name="dropdown" />
              Summary
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                {shortSummary}
              </Accordion.Content>
              <Accordion.Title active={activeIndex === 1} index={1} onClick={this.changeIndex}>
                <Icon name="dropdown" />
              Tags
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <Label.Group size="tiny" className="label-group">
                  <div className="label-master">
                    <Label basic color="pink">Category</Label>
                  </div>
                  <div>
                    {categories.map((category) => (<Label tag key={shortid.generate()}>{category}</Label>))}
                  </div>
                </Label.Group>
                <Label.Group size="tiny" className="label-group">
                  <div className="label-master">
                    <Label basic color="teal">Keywords</Label>
                  </div>
                  <div>
                    {keywords.map((keyword) => (<Label as="a" tag style={{ marginBottom: '0.3rem' }} key={shortid.generate()}>{keyword}</Label>))}
                  </div>
                </Label.Group>
                <Label.Group size="tiny" className="label-group">
                  <div className="label-master">
                    <Label basic color="orange">Sentiment</Label>
                  </div>
                  <div>
                    <Label as="a" tag style={{ textTransform: 'capitalize' }}>{sentiment}</Label>
                  </div>
                </Label.Group>
              </Accordion.Content>
              <Accordion.Title active={activeIndex === 2} index={2} onClick={this.changeIndex}>
                <Icon name="dropdown" />
              Related Stories
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                {fetchRelatedArticles}
              </Accordion.Content>
            </Accordion>
            <div>
              <Reactions />
            </div>
          </div>
        }
        sticky
        arrow
        interactive
      >
        <Icon
          color="red"
          name="marker"
          size={this.state.isOpen ? 'huge' : 'big'}
          className={`marker ${this.state.isOpen ? 'hovered' : ''}`}
        />
      </Tooltip>
    );
  }
}

export default SimpleMarker2;
