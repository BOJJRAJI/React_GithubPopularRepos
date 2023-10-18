import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    cardsData: [],
    apiState: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {activeTabId} = this.state
    this.setState({apiState: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data.popular_repos)
    if (response.ok) {
      const stateData = data.popular_repos.map(item => ({
        avatarUrl: item.avatar_url,
        forksCount: item.forks_count,
        id: item.id,
        starsCount: item.stars_count,
        name: item.name,
        issuesCount: item.issues_count,
      }))
      console.log(stateData)
      this.setState({
        cardsData: stateData,
        apiState: apiStatusConstants.success,
      })
    } else {
      this.setState({apiState: apiStatusConstants.failure})
    }
  }

  onChangeTab = id => {
    this.setState({activeTabId: id}, this.getData)
  }

  renderLoadingView = () => (
    <div className="failure-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="#0284c7"
        data-testid="loader"
        height={80}
        width={80}
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <h1 className="heading">Something went wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure view"
        className="failure-image"
      />
    </div>
  )

  renderSuccessView = () => {
    const {cardsData} = this.state
    console.log(cardsData)
    return (
      <ul className="cards-container">
        {cardsData.map(item => (
          <RepositoryItem item={item} key={item.id} />
        ))}
      </ul>
    )
  }

  renderItemsView = () => {
    const {apiState} = this.state
    console.log(apiState)
    switch (apiState) {
      case apiStatusConstants.success:
        return this.renderSuccessView()

      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    const {activeTabId, cardsData, apiState} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Popular</h1>
        <ul className="tabs-container">
          {languageFiltersData.map(tab => (
            <LanguageFilterItem
              tab={tab}
              key={tab.id}
              isActive={tab.id === activeTabId}
              onChangeTab={this.onChangeTab}
            />
          ))}
        </ul>
        {this.renderItemsView()}
      </div>
    )
  }
}

export default GithubPopularRepos
