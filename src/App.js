// App.js is the controlled component  

import React from "react";
import "./App.css";
import ListItems from "./ListItems";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

library.add(faTrash);

// create a class component in order to use state method
class App extends React.Component {
  constructor(props) {
    super(props);
    // set the initial state keys/values
    this.state = {
      items: [],
    // currentItem object
      currentItem: {
        text: "",
        key: "",
      },
    };

    // this keyword does not point to the class automatically, we bind it with a constructor outside the state 
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);
  }

  // create item with unique id 
  addItem(e) {
    e.preventDefault();
    const newItem = this.state.currentItem;
    // if newItem.text is not empty then...
    // add newItem to the list
    if (newItem.text !== "") {
      // unpacked the elements in the list and second newItem is added to the list
      // spread operator makes a copy of the current list of items, then add newItem to the list
      const items = [...this.state.items, newItem];
      // update the state values
      this.setState({
        items: items,
        currentItem: {
          text: "",
          key: "",
        },
      });
    }
  }

  // when user enters input, this method will update the event in state
  handleInput(e) {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now(),
      },
    });
  }

  // this method will remove the item in the list
  deleteItem(key) {
    // filters out all the item.key that do not match to filteredItems
    const filteredItems = this.state.items.filter((item) => item.key !== key);
    this.setState({
      items: filteredItems,
    });
  }

  // update state
  setUpdate(text, key) {
    console.log("items: this.state.items");
    const items = this.state.items;
    // if key matches then update item.text
    items.map((item) => {
      if (item.key === key) {
        console.log(item.key + " " + key);
        item.text = text;
      }
    });
    this.setState({
      items: items,
    });
  }

  // displays to the dom 
  render() {
    return (
      <div className="App">
        <header>
          <form id="to-do-form" onSubmit={this.addItem}>
            <input
              type="text"
              placeholder="Enter task"
              value={this.state.currentItem.text}
              onChange={this.handleInput}
            ></input>
            <button type="submit">Add</button>
          </form>
          <p>{this.state.items.text}</p>

          <ListItems
            items={this.state.items}
            deleteItem={this.deleteItem}
            setUpdate={this.setUpdate}
          />
        </header>
      </div>
    );
  }
}

export default App;
