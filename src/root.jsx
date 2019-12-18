import quip from "quip";
import App from "./components/App.jsx"
import Tab from "./records/Tab.js"

class TabsRoot extends quip.apps.RootRecord {
    static getProperties() {
        return {
            tabs: quip.apps.RecordList.Type(Tab)
        };
    }

    static getDefaultProperties() {
      return {
        tabs: []
      }
    }
}
quip.apps.registerClass(TabsRoot, "root");
quip.apps.initialize({
    initializationCallback: function(rootNode, params) {
      if (params.isCreation) {
        const rootRecord = quip.apps.getRootRecord()
        rootRecord.get('tabs').add({})
      }
      ReactDOM.render(
            <App />,
            rootNode);
    },
    menuCommands: [
      {
        id: 'removeTab',
        label: 'Remove',
        handler: (label, context) => {
          const rootRecord = quip.apps.getRootRecord()
          rootRecord.get('tabs').remove(context.tab)
        }
      }
    ]
});
