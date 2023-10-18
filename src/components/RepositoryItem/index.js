import './index.css'

const RepositoryItem = props => {
  const {item} = props
  const {avatarUrl, forksCount, id, starsCount, name, issuesCount} = item

  return (
    <li className="item-list">
      <img src={avatarUrl} alt={name} className="logo" />
      <h1 className="item-heading">{name}</h1>
      <div className="icon-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="count-logo"
        />
        <p className="count-para">{starsCount} stars</p>
      </div>
      <div className="icon-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="count-logo"
        />
        <p className="count-para">{forksCount} forks</p>
      </div>
      <div className="icon-count-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="count-logo"
        />
        <p className="count-para">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
