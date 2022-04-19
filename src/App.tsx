import React, { useState } from "react";
import "./App.css";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { ChatListItem } from "./components/ChatListItem";
import { ChatIntro } from "./components/ChatIntro/ChatIntro";
import { ChatWindow } from "./components/ChatWindow/ChatWindow";
import { ChatListType } from "./types/ChatList";

function App() {
  const [chatList, setChatList] = useState<ChatListType[]>([
    {
      chatId: 1,
      title: "Fulano de Tal",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      chatId: 2,
      title: "Fulano de Tal",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      chatId: 3,
      title: "Fulano de Tal",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
    {
      chatId: 4,
      title: "Fulano de Tal",
      image: "https://www.w3schools.com/howto/img_avatar2.png",
    },
  ]);

  const [activeChat, setActiveChat] = useState<ChatListType>({
    chatId: undefined,
    title: "Fulano de Tal",
    image: "https://www.w3schools.com/howto/img_avatar2.png",
  });

  const [user, setUser] = useState({
    id: 1234,
    avatar: "https://www.w3schools.com/howto/img_avatar2.png",
    name: "Arthur",
  });

  return (
    <div className="app-window">
      <div className="sidebar">
        <header>
          <img src={user.avatar} alt="avatar" className="header--avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: "919191" }} />
            </div>
            <div className="header--btn">
              <ChatIcon style={{ color: "919191" }} />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{ color: "919191" }} />
            </div>
          </div>
        </header>
        <div className="search">
          <div className="search--input">
            <SearchIcon
              fontSize="small"
              style={{ color: "919191", cursor: "pointer" }}
            />
            <input
              type="search"
              placeholder="Procurar ou começar uma nova conversa"
            />
          </div>
        </div>
        <div className="chatlist">
          {chatList.map((item, index) => (
            <ChatListItem
              key={index}
              data={item}
              active={activeChat.chatId === chatList[index].chatId}
              onClick={() => setActiveChat(chatList[index])}
            />
          ))}
        </div>
      </div>
      <div className="contentArea">
        {activeChat.chatId !== undefined && <ChatWindow user={user} />}
        {activeChat.chatId === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
