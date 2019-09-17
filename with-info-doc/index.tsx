import React from "react";
import { View, Text, Clipboard, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import jsxToString from 'jsx-to-string';
import { Table, Row, Rows } from 'react-native-table-component';
var prune = require('json-prune');
import SyntaxHighlighter from 'react-native-syntax-highlighter';
const toJsonSchema = require('to-json-schema');
import { base16AteliersulphurpoolLight as hightLightStyle } from 'react-syntax-highlighter/styles/prism';

export interface IPropsDoc {
  [key: string]: MetadataDoc
}
interface MetadataDoc {
  description?: string;
  isRequired?: boolean
}
interface Props {
  propsDoc?: IPropsDoc
}
interface WithInfoDocStateProps {
  jsxString: string;
  tableHead: string[]
  tableData: string[][]
}

export default class WithInfoDoc extends React.Component<Props, WithInfoDocStateProps> {

  constructor(props) {
    super(props);
    this.state = {
      jsxString: "",
      tableHead: ['Name', 'Type', 'Req', 'Desc'],
      tableData: []
    }

  }
  private copyCodeToClipBoard = async () => {
    Clipboard.setString(this.state.jsxString);
  }
  componentDidMount() {
    this.setState({ jsxString: jsxToString(this.props.children) })
    this.loadPropsNameAndTypes()
  }

  private loadPropsNameAndTypes = () => {
    //props data
    const o: any = this.props.children as any;
    // get value of all nested object (so it's not written 'object' but the content instead)
    var json = prune(o.props);
    const jsonObject: object = JSON.parse(json)
    //get the json metadata ( retrieves types of data )
    const schema = toJsonSchema(jsonObject)["properties"];
    const schemaString = JSON.stringify(schema)
    // For elements that are primitive transform the {"type" : "boolean"} to boolean for each types
    const c = schemaString.replace(/{"type":"boolean"}/g, '"boolean"')
    const e = c.replace(/{"type":"string"}/g, '"string"')
    const d = e.replace(/{"type":"integer"}/g, '"number"')
    const noTypeFirstLevel = JSON.parse(d)
    // fill an array with props name, metadata type, description and isRequired (these 2 last are passed manually in the story)
    const propsArray = []
    Object.keys(noTypeFirstLevel).forEach((k, v) => {
      const propsName = k;
      const propsMetaType = JSON.stringify(noTypeFirstLevel[k], null, 2).replace(/"/g, '');
      let description: string, isRequired: string;
      if (this.props.propsDoc && this.props.propsDoc[k]) {
        description = this.props.propsDoc[k].description || ""
        isRequired = this.props.propsDoc[k].isRequired ? "X" : ""
      }

      propsArray.push([propsName, propsMetaType, isRequired, description])
    })
    this.setState({ tableData: propsArray })
  }
  private renderTableProps = () => (
    <View style={styles.container}>
      <Table borderStyle={{ borderWidth: 0.5, borderColor: "#c8e1ff" }}>
        <Row style={styles.head} flexArr={[1, 2, 0.5, 2]} data={this.state.tableHead} />
        <Rows textStyle={styles.text} flexArr={[1, 2, 0.5, 2]} data={this.state.tableData} />
      </Table>
    </View>
  )

  private renderPropsTitle = () => (
    <View style={{ alignItems: "center" }} >
      <Text style={{ fontSize: 23, marginBottom: 10 }}> Props </Text>
    </View>

  )
  private renderPreview = () => (
    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>
      <Text style={{ fontSize: 23, marginBottom: 20 }}> Component preview </Text>
      <View>{this.props.children}</View>
    </View>
  )
  private renderSourceCode = () => (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 23, marginBottom: 20 }}> Source (press to copy) </Text>
      <SyntaxHighlighter
        language='jsx'
        highlighter={"prism"}
        style={hightLightStyle}
      >
        {this.state.jsxString}
      </SyntaxHighlighter>
    </View>
  )
  private divider = () => (
    <View
      style={{
        margin: 20,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
      }}
    />
  )
  render() {
    return (
      <ScrollView >
        {this.renderPreview()}
        {this.divider()}
        <ScrollView style={{ marginBottom: 20, maxHeight: 300 }}>
          {this.renderPropsTitle()}
          {this.renderTableProps()}
        </ScrollView>
        {this.divider()}

        <ScrollView horizontal>
          <TouchableOpacity onPress={this.copyCodeToClipBoard}>
            {this.renderSourceCode()}
          </TouchableOpacity>

        </ScrollView>
      </ScrollView >
    )
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  head: { height: 30, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  wrapper: { flexDirection: 'row' },

});

