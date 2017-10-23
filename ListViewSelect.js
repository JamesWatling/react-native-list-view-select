import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const noop = () => {};
const ds = new ListView.DataSource({ rowHasChanged: (r1,r2) => (r1 !== r2) });

export default class ListViewSelect extends Component {

  static propTypes: {
    list: PropTypes.array.isRequired,
    isVisible: PropTypes.bool,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  }

  static defaultProps: {
    list: [''],
    isVisible: false,
    onClick: noop,
    onClose: noop
  }

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(this.props.list),
    };
  }

  componentWillReceiveProps(nextProps:any) {
    if (nextProps.list !== this.props.list) {
      this.setState({ dataSource: ds.cloneWithRows(nextProps.list) });
    }
  }

  handleClick(data) {
    this.props.onClick(data);
    this.props.onClose();
  }

  renderSeparator(data) {
    const separatorStyle = this.props.separatorStyle || DefaultStyles.separator;

    if (data === this.props.list[0]) {
      return null;
    }

    return <View style={separatorStyle} />;
  }

  renderRow(rowData) {
    const rowTextStyle = this.props.rowText || DefaultStyles.rowText;

    let row = <Text style={rowTextStyle}>{rowData}</Text>;
    if (this.props.renderRow) {
      row = this.props.renderRow(rowData);
    }

    return (
      <View>
        {this.renderSeparator(rowData)}
        <TouchableOpacity onPress={() => this.handleClick(rowData)}>
          {row}
        </TouchableOpacity>
      </View>
    );
  }

  renderList() {
    let maxHeight = { height: this.props.listHeight };
    if (this.props.list.length > 12 && !this.props.height) {
      maxHeight = { height: SCREEN_HEIGHT * 3 / 4 };
    }

    return (
      <ListView
        style={maxHeight}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}
        automaticallyAdjustContentInsets={false}
      />
    );
  }

  render() {
    const containerStyle = this.props.containerStyle || DefaultStyles.container;
    const popoverStyle = this.props.popoverStyle || DefaultStyles.popover;

    if (this.props.isVisible) {
      return (
        <TouchableOpacity onPress={this.props.onClose}>
          <View style={containerStyle}>
            <View style={popoverStyle}>
              {this.renderList()}
            </View>
          </View>
        </TouchableOpacity>
      );
    }

    return <View />;
  }
};

const DefaultStyles = StyleSheet.create({
  container: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  popover: {
    margin: 10,
    borderRadius: 3,
    padding: 3,
    backgroundColor: '#ffffff',
  },
  rowText: {
    padding: 10,
  },
  separator: {
    height: 0.5,
    marginHorizontal: 8,
    backgroundColor: '#CCC',
  },
});
