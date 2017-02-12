import { observable } from 'mobx'
import LocalForage from 'localforage'

class UiStore {
  @observable hackernewsVisible = false
  @observable introMessageVisible = true

  constructor(){
    this.toggleHackernews = this.toggleHackernews.bind(this)
    this.toggleIntroMessage = this.toggleIntroMessage.bind(this)
  }

  toggleHackernews(event){
    this.hackernewsVisible = !this.hackernewsVisible
    LocalForage.setItem('localHackernewsVisible', this.hackernewsVisible)
  }

  toggleIntroMessage(){
    console.log(this.introMessageVisible)
    this.introMessageVisible = !this.introMessageVisible
    LocalForage.setItem('localIntroMessageVisible', false)
  }

}

export default UiStore
