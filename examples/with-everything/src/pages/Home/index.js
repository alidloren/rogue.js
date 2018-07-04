import React from 'react'
import { bindActionCreators } from 'redux'
import {
  initStore,
  startClock,
  addCount,
  serverRenderClock
} from '../lib/store'

import App from '../components/App'
import Header from '../components/Header'
import Page from '../components/Page'
import Submit from '../components/Submit'
import PostList from '../components/PostList'

class Index extends React.Component {
  static getInitialProps ({ store, isServer }) {
    store.dispatch(serverRenderClock(isServer))
    store.dispatch(addCount())

    return { isServer }
  }

  componentDidMount () {
    this.timer = this.props.startClock()
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <App>
        <Header />
        <Page title='Index' />
        <Submit />
        <PostList />
      </App>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch)
  }
}