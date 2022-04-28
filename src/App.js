import React, { Component, useState } from "react";
import { render } from "react-dom";
import "./App.css";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Register from "./components/Register";
import Messages from "./components/Messages";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import clientApi from "./components/ClientApi";


class App extends Component {
  constructor(props){
    super(props);
    this.clients = new clientApi();
    this.msgArray = new Messages();
}
  render(){
    return(
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login msgApi={this.msgArray} db ={this.clients}/>} />
      </Routes>
    </BrowserRouter>);

  }
}
            // <Route path="chat" element={<Chat msgApi={this.msgArray} db={this.clients}/>} />
          // <Route path="register" element={<Register db = {this.clients} />} /
export default App;


