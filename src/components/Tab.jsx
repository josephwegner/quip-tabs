import Styles from "./Tab.less"
import quip from 'quip'

export default class Tab extends React.Component {
  openContextMenu(e) {
    quip.apps.showContextMenu(
         e,
         ["removeTab"],
         [], // No highlighted commands
         [], // Disabled commands based on state
         null,
         { tab: this.props.tab }
     );
  }

  onTitleChange(e) {
    this.props.tab.set("title", e.target.value)
  }

  renderAddNewTab() {
    let classes = [Styles.tab, Styles.addNewTab].join(' ')
    return (
      <li className={classes} onClick={this.props.onClick.bind(this)} >
        Add Tab
      </li>
    )
  }

  renderTab() {
    const colors = quip.apps.ui.ColorMap
    let tabStyle = {
      backgroundColor: this.props.active ? colors.BLUE.VALUE: colors.BLUE.VALUE_LIGHT,
      stroke: this.props.active ? "#FFFFFF" : colors.BLUE.VALUE,
      borderColor: this.props.active ? colors.BLUE.VALUE_LIGHT : colors.BLUE.VALUE
    }
    let textColor = this.props.active ? 'WHITE' : 'BLUE'
    let caret = !this.props.editMode ? null: (
      <svg xmlns="http://www.w3.org/2000/svg"
           width="14"
           height="14"
           viewBox="0 0 14 14"
           onClick={this.openContextMenu.bind(this)}>

        <path d="M4,6L7,9l3-3">
      </path></svg>
    )

    var classes = [Styles.title]
    return (
      <li className={Styles.tab} style={tabStyle} onClick={this.props.onClick}>
        <quip.apps.ui.RichTextBox
          className={classes.join(' ')}
          record={this.props.tab.get('title')}
          disableInlineMenus={true}
          allowedStyles={[]}
          readOnly={!this.props.editMode}
          color={textColor} />
          {caret}
      </li>
    )
  }

  render() {
    if (this.props.tab) {
      return this.renderTab()
    } else {
      return this.renderAddNewTab()
    }
  }
}
