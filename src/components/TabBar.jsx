import Styles from "./TabBar.less"
import Tab from './Tab.jsx'

export default class TabBar extends React.Component {
  renderTabs() {
    let activeId = this.props.activeTab.getId()
    return this.props.tabs.getRecords().map((tab, index) => {
      let key = `tab-${tab.getId()}`
      let active = tab.getId() === activeId
      return (
        <Tab tab={tab}
             key={key}
             onClick={this.handleTabClick.bind(this, tab)}
             active={active}
             editMode={this.props.editMode} />
      )
    })
  }

  handleTabClick(tab) {
    this.props.setActiveTab(tab)
  }

  addTab() {
    let tab = this.props.tabs.add({})
    this.props.setActiveTab(tab)
  }


  render() {
    var styles = {
      overflow: this.props.tabs.count() > 4 ? 'scroll' : 'auto'
    }
    var editTab = this.props.editMode ? <Tab onClick={this.addTab.bind(this)} /> : null
    return (
      <ol className={Styles.list} style={styles}>
        {this.renderTabs()}
        {editTab}
      </ol>
    )
  }
}
