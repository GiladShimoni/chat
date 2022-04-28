import React, { useState } from "react";
import LastMessagePreview from "./LastMessagePreview/LastMessagePreview";
import video from "../../src/video.mp4";
import beatles from "../profilePics/beatles.jpg";
import song from "../../src/Do I Wanna Know.mp3";
import coldplay from "../profilePics/coldplay.png";


class Messages {

    constructor() {
        this.messagesArray = [

            /** Arctic Monkeys && beatles */
            {
                time: "12:07",
                sender: "Arctic Monkeys",
                reciever: "Beatles",
                msg: "Hey",
                type: "text"
            },
            {
                time: "12:07",
                sender: "Arctic Monkeys",
                reciever: "Beatles",
                msg: "Did you shoot the new album cover?",
                type: "text"
            },
            {
                time: "18:00",
                sender: "Beatles",
                reciever: "Arctic Monkeys",
                msg: "Yeah! Check it out",
                type: "text"
            },
            {
                time: "18:05",
                sender: "Beatles",
                reciever: "Arctic Monkeys",
                msg: beatles,
                type: "image"
            },
            {
                time: "18:10",
                sender: "Arctic Monkeys",
                reciever: "Beatles",
                msg: "Wow! cool photo",
                type: "text"
            },
            {
                time: "05:00",
                sender: "Beatles",
                reciever: "Arctic Monkeys",
                msg: "Thank You",
                type: "text"
            },

            /**Arctic Monkeys && Nickelback */
            {
                time: "14:50",
                sender: "Arctic Monkeys",
                reciever: "Nickelback",
                msg: video,
                type: "video"
            },
            {
                time: "16:22",
                sender: "Nickelback",
                reciever: "Arctic Monkeys",
                msg: "Well, that's random",
                type: "text"
            },

            /** Arctic Monkeys && 3 Days Grace */
            {
                time: "12:50",
                sender: "Arctic Monkeys",
                reciever: "3 Days Grace",
                msg: "Heyyy",
                type: "text"
            },
            {
                time: "13:00",
                sender: "3 Days Grace",
                reciever: "Arctic Monkeys",
                msg: "Hey, What's up?",
                type: "text"
            },
            {
                time: "13:50",
                sender: "Arctic Monkeys",
                reciever: "3 Days Grace",
                msg: "We recorded a new song",
                type: "text"
            },
            {
                time: "13:51",
                sender: "Arctic Monkeys",
                reciever: "3 Days Grace",
                msg: "Listen",
                type: "text"
            },
            {
                time: "13:55",
                sender: "Arctic Monkeys",
                reciever: "3 Days Grace",
                msg: song,
                type: "audio"
            },
            {
                time: "15:00",
                sender: "3 Days Grace",
                reciever: "Arctic Monkeys",
                msg: "It's really good!!!",
                type: "text"
            },

            /**Arctic Monkeys && Nirvana */

            {
                time: "12:00",
                sender: "Arctic Monkeys",
                reciever: "Nirvana",
                msg: "Heres the album cover",
                type: "text"
            },
            {
                time: "12:10",
                sender: "Arctic Monkeys",
                reciever: "Nirvana",
                msg: coldplay,
                type: "image"
            },
            {
                time: "12:12",
                sender: "Arctic Monkeys",
                reciever: "Nirvana",
                msg: "Oops, wrong chat :/",
                type: "text"
            },
            {
                time: "12:30",
                sender: "Nirvana",
                reciever: "Arctic Monkeys",
                msg: "Seriously ????",
                type: "text"
            },
            {
                time: "13:32",
                sender: "Nirvana",
                reciever: "Arctic Monkeys",
                msg: "Not cool my dudes",
                type: "text"
            },



            /**Arctic Monkeys && 3 Doors Down */

            {
                time: "11:01",
                sender: "3 Doors Down",
                reciever: "Arctic Monkeys",
                msg: "Heyyyy",
                type: "text"
            },
            {
                time: "12:01",
                sender: "3 Doors Down",
                reciever: "Arctic Monkeys",
                msg: "Where have you guys been??",
                type: "text"
            },
            {
                time: "12:31",
                sender: "3 Doors Down",
                reciever: "Arctic Monkeys",
                msg: "We haven't talked in a while now...",
                type: "text"
            },

            /**Arctic Monkeys && Coldplay */

            {
                time: "03:00",
                sender: "Coldplay",
                reciever: "Arctic Monkeys",
                msg: "Heyy, how's it going??",
                type: "text"
            },
            {
                time: "03:20",
                sender: "Coldplay",
                reciever: "Arctic Monkeys",
                msg: "Could you send the ablum cover you got?",
                type: "text"
            }
        ];
    }


    getMsg() {
        return this.messagesArray;
    }

    addMsg(msg) {
        this.messagesArray.push(msg);
    }

    getLastMessage(sentFrom, sentTo) {
        var last = "";
        for (var i = this.messagesArray.length - 1; i >= 0; i--) {
            // debugger;
            if ((this.messagesArray[i].sender == sentFrom && this.messagesArray[i].reciever == sentTo) || (this.messagesArray[i].reciever == sentFrom && this.messagesArray[i].sender == sentTo)) {
                if (this.messagesArray[i].type == "image") {
                    return <LastMessagePreview icon={"image"} type={"image"}/>;
                }
                if (this.messagesArray[i].type == "audio") {
                    return <LastMessagePreview icon={"audio"} type={"audio"} />;

                }
                if (this.messagesArray[i].type == "video") {
                    return <LastMessagePreview icon={"video"} type={"video"} />;
                }
                if (this.messagesArray[i].type == "text") {
                    return this.messagesArray[i].msg;

                }
            }
        }
        return last;
    }

    getLastMessageTime(sentFrom, sentTo) {
        var time = "";
        for (var i = 0; i < this.messagesArray.length; i++) {
            if ((this.messagesArray[i].sender == sentFrom && this.messagesArray[i].reciever == sentTo) || (this.messagesArray[i].reciever == sentFrom && this.messagesArray[i].sender == sentTo)) {
                time = this.messagesArray[i].time;
            }
        }
        return time;
    }
}

export default Messages;