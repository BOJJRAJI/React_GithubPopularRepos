import './index.css'

const LanguageFilterItem = props => {
  const {tab, isActive, onChangeTab} = props
  const {language, id} = tab
  console.log(isActive)
  const className = isActive ? 'active-tab-button' : 'normal-button'
  return (
    <li>
      <button
        className={className}
        type="button"
        onClick={() => onChangeTab(id)}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
