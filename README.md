# React-Native List View Select

## Installation instructions

`npm install --save react-native-list-view-select`

This module started as a personal fork of React Native List Popover homepage: https://github.com/bulenttastan/react-native-list-popover I have converted it to ES6 syntax and added support for React Native 0.24+

List View Select is a designed to behave like a traditional `<select>` element in traditional HTML but with native components.

The <ListViewSelect/> component allows you to add a very simple List view that is triggered over screen with a list of items as the child component and access the selected item from the parent component.

The properties that this component accepts are
* `list` Array of possible options
* `isVisible` boolean to decide to show the Dropdown list or not
* `onClick` callback function that takes an `item` parameter to handle the click operation
* `onClose` callback function to set the isVisible to false to close the popover


## Screenshots
Here is the List View Select used in the real world for an application I built 

![](http://i.imgur.com/76iFV7n.gif)

Here is a quick gif of it in use, excuse the resolution
![](http://i.imgur.com/yzgYcNG.gif)
# Before
![](http://i.imgur.com/qK359Tm.png)
# Selection
![](http://i.imgur.com/niPxpss.png)
# After Selection
![](http://i.imgur.com/PVtsExi.png)


# Usage

```js
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import ListViewSelect from 'react-native-list-view-select';
import _ from 'lodash';

export default class ListViewSelectExample extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: "Select Item",
      isVisible: false,
    };
    _.bindAll(this, ['showPopover', 'closePopover', 'setItem']);
  }

  showPopover() {
    this.setState({isVisible: true});
  }

  closePopover() {
    this.setState({isVisible: false});
  }

  setItem(item) {
    this.setState({ item: item });
  }

  render() {
    const { selectedCity } = this.props;
    const items = [
      "Item 1",
      "Item 2",
      "Item 3",
      "Item 4",
    ];

    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.showPopover}>
          <Text>{this.state.item}</Text>
        </TouchableHighlight>
        <ListViewSelect
          list={items}
          isVisible={this.state.isVisible}
          onClick={this.setItem}
          onClose={this.closePopover}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    paddingBottom: 100,
  },
});
```
