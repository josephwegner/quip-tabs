import Styles from './App.less'
import TabBar from './TabBar.jsx'
import Tab from './Tab.jsx'
import quip from 'quip'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    const rootRecord = quip.apps.getRootRecord()
    let tabs = rootRecord.get('tabs')

    let activeTab = tabs.getRecords().find(t => t.get('active')) || tabs.getRecords()[0]
    let isEditable = quip.apps.isDocumentEditable()

    this.state = {
      tabs: tabs,
      activeTab: activeTab,
      editMode: isEditable
    }
  }

  componentDidMount() {
    this.state.tabs.listen(this.tabsChanged.bind(this))
    this.state.tabs.getRecords().forEach(tab => {
      tab.listen(this.tabChanged.bind(this))
    })
  }

  tabsChanged(tabs) {
    this.setState({ tabs: tabs })
  }

  tabChanged() {
    const rootRecord = quip.apps.getRootRecord()
    this.setState({
      tabs: rootRecord.get('tabs')
    })
  }

  setActiveTab(tab) {
    this.setState({
      activeTab: tab
    })
  }

  render() {
    let endStyle = {
      fontSize: '12px',
      color: "#b8b8b8",
      fontStyle: 'italic',
      paddingTop: '1rem',
      display: 'block'
    }
    
    return (
      <div className={Styles.app}>
        <TabBar tabs={this.state.tabs}
                activeTab={this.state.activeTab}
                setActiveTab={this.setActiveTab.bind(this)}
                editMode={this.state.editMode} />
        <quip.apps.ui.RichTextBox
          record={this.state.activeTab.get('contents')} />
      </div>
    )
  }
}
