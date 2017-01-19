import React, { Component } from 'react'
import Hackernews from './Hackernews'
import RedditFeed from './RedditFeed'
import YoutubeFeed from './YoutubeFeed'
import { Grid, Container, Card, Header, Radio } from 'semantic-ui-react'
import AddFeedField from './AddFeedField.js'
import * as LocalForage from 'localforage'

class App extends Component {

  constructor(){
    super();

    this.state = {
      redditValue: '',
      redditFeeds: [],
      youtubeValue: '',
      youtubeFeeds: [],
      hackernewsVisible: false
    }

    this.handleRedditChange = this.handleRedditChange.bind(this);
    this.handleRedditSubmit = this.handleRedditSubmit.bind(this);
    this.handleYoutubeChange = this.handleYoutubeChange.bind(this);
    this.handleYoutubeSubmit = this.handleYoutubeSubmit.bind(this);
    this.toggleHackernews = this.toggleHackernews.bind(this);

  }


  componentDidMount(){
    let self = this

    LocalForage.getItem('localRedditFeeds').then(function(localRedditFeeds){
      console.log(localRedditFeeds)
      if (localRedditFeeds != null){
        self.setState({redditFeeds: localRedditFeeds})
      }

    })
    LocalForage.getItem('localYoutubeFeeds').then(function(localYoutubeFeeds){
      console.log(localYoutubeFeeds)
      if (localYoutubeFeeds != null){
        self.setState({youtubeFeeds: localYoutubeFeeds})
      }

    })
    LocalForage.getItem('localHackernewsVisible').then(function(localHackernewsVisible){
      if (localHackernewsVisible != null){
        console.log(localHackernewsVisible)
        self.setState({hackernewsVisible: localHackernewsVisible})
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.redditFeeds !== this.state.redditFeeds){
      LocalForage.setItem('localRedditFeeds', this.state.redditFeeds)
    }
    if(prevState.youtubeFeeds !== this.state.youtubeFeeds){
      LocalForage.setItem('localYoutubeFeeds', this.state.youtubeFeeds)
    }
    if(prevState.hackernewsVisible !== this.state.hackernewsVisible){
      LocalForage.setItem('localHackernewsVisible', this.state.hackernewsVisible)
    }
  }

  handleRedditChange(event){
    this.setState({redditValue: event.target.value});
  }

  handleRedditSubmit(event){
    event.preventDefault();
    let redditArray = [...this.state.redditFeeds, this.state.redditValue]
    this.setState({
      redditFeeds: redditArray,
      redditValue: ""
    });

  }

  handleYoutubeChange(event){
    this.setState({youtubeValue: event.target.value});
  }

  handleYoutubeSubmit(event){
    event.preventDefault();
    let youtubeArray = [...this.state.youtubeFeeds, this.state.youtubeValue]
    this.setState({
      youtubeFeeds: youtubeArray,
      youtubeValue: ""
    })
  }

  toggleHackernews(event){
    this.setState({hackernewsVisible: !this.state.hackernewsVisible});
  }

  render() {
    return (
      <Container>
        <Header dividing size="huge" color="blue">Lounge</Header>
        <Grid>
          <Grid.Row>
            <Grid.Column width={6}>
              <AddFeedField
                handleChange={this.handleRedditChange}
                handleSubmit={this.handleRedditSubmit}
                name="Subreddit"
                value={this.state.redditValue}
                labelText='Add subreddit'
                defaultText='e.g. "All"'
              />
            </Grid.Column>
            <Grid.Column width={6}>
              <AddFeedField
                handleChange={this.handleYoutubeChange}
                handleSubmit={this.handleYoutubeSubmit}
                name="Youtube"
                value={this.state.youtubeValue}
                labelText='Add YouTube channel'
                defaultText='e.g. "Google"'
              />
            </Grid.Column>
              <Grid.Column width={4}>
                <Header as="h5">Show Hackernews</Header>
                <Radio toggle onClick={this.toggleHackernews} />
              </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group itemsPerRow={3} stackable>
          { this.state.hackernewsVisible && <Hackernews />}
          {this.state.redditFeeds.map(redditFeedName => {
          return <RedditFeed key={redditFeedName} redditFeedName={redditFeedName}/>
          })}
          {this.state.youtubeFeeds.map(youtubeFeedName => {
            return <YoutubeFeed key={youtubeFeedName} username={youtubeFeedName}/>
          })}
        </Card.Group>
      </Container>
    );
  }
}

export default App;
