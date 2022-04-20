import React, { useEffect, useState } from "react";
import "./App.css";

import { ContactType } from "./types/Contact";

import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import { ChatListItem } from "./components/ChatListItem";
import { ChatIntro } from "./components/ChatIntro/ChatIntro";
import { ChatWindow } from "./components/ChatWindow/ChatWindow";
import { NewChat } from "./components/NewChat/NewChat";
import { Login } from "./components/Login/Login";
import { loginFacebook } from "./api";

function App() {
  const [chatList, setChatList] = useState<ContactType[]>([]);

  const [activeChat, setActiveChat] = useState<ContactType>({
    id: undefined,
    name: "Fulano de Tal",
    avatar: "https://www.w3schools.com/howto/img_avatar2.png",
  });

  const [user, setUser] = useState<ContactType | null>({
    id: "XIRgi7VTnKMpDbpiZ0LjspfC4Jo1",
    name: "Arthur Lopes Magalhães",
    avatar: "https://graph.facebook.com/2284588855039157/picture",
  });
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      let unsub = loginFacebook.onChatList(user.id, setChatList);
      return unsub;
    }
  }, [user]);

  const openNewChat = () => {
    setShowNewChat(true);
  };

  const handleLoginData = async (u: any) => {
    let newUser: ContactType = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL,
    };
    await loginFacebook.addUser(newUser);
    setUser(newUser);
  };

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
  }

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat
          chatlist={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />

        <header>
          <img src={user.avatar} alt="avatar" className="header--avatar" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{ color: "919191" }} />
            </div>
            <div className="header--btn" onClick={openNewChat}>
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
              active={activeChat.id === chatList[index].id}
              onClick={() => setActiveChat(chatList[index])}
            />
          ))}
        </div>
      </div>
      <div className="contentArea">
        {activeChat.id !== undefined && <ChatWindow user={user} />}
        {activeChat.id === undefined && <ChatIntro />}
      </div>
    </div>
  );
}

export default App;
