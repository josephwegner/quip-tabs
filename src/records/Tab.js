import quip from "quip"

export default class Tab extends quip.apps.Record {
  static getProperties() {
    return {
      title: quip.apps.RichTextRecord,
      contents: quip.apps.RichTextRecord
    }
  }

  static getDefaultProperties() {
    return {
      title: {
        RichText_defaultText: "New Tab",
        RichText_placeholderText: "Tab Title"
      },
      contents: {
        RichText_placeholderText: "Put your tab content here!"
      }
    }
  }
}

quip.apps.registerClass(Tab, "tab-record");
