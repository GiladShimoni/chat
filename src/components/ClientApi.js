import React, { useState } from "react";
import arcticMonkeys from "../profilePics/arctic monkeys.jpg";
import queen from "../profilePics/queen.jpg";
import nickelback from "../profilePics/nickelback.png"
import rhcp from "../profilePics/red hot cilli peppers.jpg";
import gnr from "../profilePics/guns n roses.jpg";
import beatles from "../profilePics/beatles.jpg";
import coldplay from "../profilePics/coldplay.png";
import fatm from "../profilePics/florence and the machine.jpg";
import nirvana from "../profilePics/nirvana.jpg";
import abba from "../profilePics/abba.jpg";
import tdg from "../profilePics/3 days grace.jpg";
import tdd from "../profilePics/3 doors down.jpg";
class clientApi {
  constructor() {
    this.state = {
      db: [
        {
          username: "Arctic Monkeys",
          password: "1234567AM",
          displayname: "Arctic Monkeys",
          img: arcticMonkeys,
          friends: ["Nirvana", "Nickelback", "Coldplay", "Beatles", "3 Doors Down", "3 Days Grace"]
        },
        {
          username: "queen",
          password: "1234567QN",
          displayname: "Queen",
          img: queen,
          friends: ["Beatles", "ABBA", "Florence + The Machine", "Coldplay", "Nickelback"]
        },
        {
          username: "nickelback",
          password: "1234567NB",
          displayname: "Nickelback",
          img: nickelback,
         friends: ["Arctic Monkeys", "Queen", "Nirvana", "Red Hot Chilli Peppers", "3 Days Grace" ] 
         },
        {
          username: "red hot chilli peppers",
          password: "12345RHCP",
          displayname: "Red Hot Chilli Peppers",
          img: rhcp,
          friends: ["Nickelback", "Guns N' Roses", "3 Doors Down", "3 Days Grace", "Nirvana"]
        },
        {
          username: "Guns And Roses",
          password: "123456GNR",
          displayname: "Guns N' Roses",
          img: gnr,
          friends: ["Red Hot Chilli Peppers", "Beatles", "Florence + The Machine", "ABBA", "3 Days Grace"]
        },
        {
          username: "beatles",
          password: "12345678B",
          displayname: "Beatles",
          img: beatles,
          friends: ["Queen", "Guns N' Roses", "Arctic Monkeys", "Guns N' Roses", "ABBA"]
        },
        {
          username: "coldplay",
          password: "1234567CP",
          displayname: "Coldplay",
          img: coldplay,
          friends: ["Arctic Monkeys", "Queen", "Florence + The Machine", "Nirvana", "ABBA"]
        },
        {
          username: "Florence And The Machine",
          password: "12345FATM",
          displayname: "Florence + The Machine",
          img: fatm,
          friends: ["Queen", "Guns N' Roses", "Coldplay", "3 Doors Down", "ABBA"]
        },
        {
          username: "nirvana",
          password: "1234567NV",
          displayname: "Nirvana",
          img: nirvana,
          friends: ["Arctic Monkeys", "Nickelback", "Red Hot Chilli Peppers", "Coldplay", "3 Doors Down"]
        },
        {
          username: "three doors down",
          password: "1234563DD",
          displayname: "3 Doors Down",
          img: tdd,
          friends: ["Arctic Monkeys", "Red Hot Chilli Peppers", "Florence + The Machine", "Nirvana", "3 Days Grace"]
        },
        {
          username: "three days grace",
          password: "1234563dg",
          displayname: "3 Days Grace",
          img: tdg,
          friends: ["Arctic Monkeys", "Nickelback", "Red Hot Chilli Peppers", "Guns N' Roses", "3 Doors Down"]
        },
        {
          username: "abba",
          password: "1234567AB",
          displayname: "ABBA",
          img: abba,
          friends: ["Queen", "Guns N' Roses", "Beatles", "Coldplay", "Florence + The Machine"]
        }
      ]
    }
  }

  getImg(userName) {
    //NewUser
    var res = this.state.db.find(usr => usr.displayname === userName);
    if(res !== undefined){
      if(res.img == "") {
        return "desult user.png";
      }
      return res.img;
    }
    if (sessionStorage.getItem('isNewUser') == 'true') {
      if(sessionStorage.getItem('img') == "") {
        return "desult user.png";
      }
    }
  }

  /** returns a specified user */
  getUser(user) {
    var res = this.state.db.find(usr => usr.username === user.username);
    if (res === undefined) {
      return { status: "FAIL", error: "USERNAME" };
    }
    var res = this.state.db.find(usr => usr.username === user.username && usr.password == user.password);
    if (res === undefined) {
      return { status: "FAIL", error: "PASSWORD" };
    }
    return { status: "SUCCSES", USER: user };
  }

  getUserByName(username) {
    var res = this.state.db.find(usr => usr.username === username);
    return res;
  }

  getUserByDisplayName(displayname){
    var res = this.state.db.find(usr => usr.displayname === displayname);
    return res;
  }

  /** updates the dataBase to be the updated one */
  ChangeDb = (newDb) => {
    this.state.db = newDb;
  }


  addUser(newUser){
    var user = this.state.db.find(usr => usr.username === newUser.username);
    if (user === undefined) {
      this.state.db.push(newUser);
    }
  }

  /** adds a new user to the dataBase */
  addNewUser(newUser) {
    var user = this.state.db.find(usr => usr.username === newUser.username);
    if (user === undefined) {
      //NewUser
      sessionStorage.setItem('isNewUser', 'true');
      sessionStorage.setItem('user', newUser.username);
      sessionStorage.setItem('displayname', newUser.displayname);
      sessionStorage.setItem('password', newUser.password);
      sessionStorage.setItem('img', newUser.img);
      return { status: "SUCCESS" };
    }
    return { status: "FAIL" };
  }

  /** returns the data base array */
  getDB() {
    return this.state.db;
  }

  /** adds a friend the user's friend list */
  addFriend(name, newFriend) {
    //newUser
    for (var i = 0; i < this.state.db.length; i++) {
      if (this.state.db[i].username === name && !this.state.db[i].friends.includes(newFriend)) {
        this.state.db[i].friends.push(newFriend)
      }
    }
  }

  /** returns the given user's friends list */
  getFriends(name) {
    for (var i = 0; i < this.db.length; i++) {
      if (this.state.db[i].username === name) {
        return this.state.db[i].friends;
      }
    }
  }

}
export default clientApi;