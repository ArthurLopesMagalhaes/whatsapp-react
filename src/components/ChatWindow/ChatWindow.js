import "./style.css";

import EmojiPicker from "emoji-picker-react";

import SearchIcon from "@mui/icons-material/Search";
import { AttachFile, Close, InsertEmoticon } from "@mui/icons-material";
import MoreVert from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import { useEffect, useRef, useState } from "react";
import { MessageItem } from "../MessageItem";

export const ChatWindow = ({ user }) => {
  let recognition = null;
  let speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (speechRecognition !== undefined) {
    recognition = new speechRecognition();
  }
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
    { author: 1234, body: "fsdfsfsfefesffa" },
    { author: 123, body: "fsdfsfsfefesffa" },
  ]);

  const body = useRef();

  useEffect(() => {
    if (body.current.scrollHeight > body.current.offsetHeight) {
      body.current.scrollTop =
        body.current.scrollHeight - body.current.offsetHeight;
    }
  }, [list]);

  const openEmojis = () => {
    setEmojiOpen(true);
  };
  const closeEmojis = () => {
    setEmojiOpen(false);
  };

  const handleChangeText = (e) => {
    setText(e.target.value);
  };

  const handleEmojiClick = (e, emojiObject) => {
    setText((currText) => `${currText}${emojiObject.emoji}`);
  };

  const handleSendClick = () => {};

  const handleMicClick = () => {
    if (recognition !== null) {
      recognition.onstart = () => {
        setListening(true);
      };
      recognition.onend = () => {
        setListening(false);
      };
      recognition.onresult = (e) => {
        setText(e.results[0][0].transcript);
      };

      recognition.start();
    }
  };

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <div className="chatWindow--headerinfo">
          <img
            src="https://www.w3schools.com/howto/img_avatar2.png"
            alt=""
            className="chatWindow-avatar"
          />
          <div className="chatWindow--name"></div>
        </div>

        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            <SearchIcon style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <AttachFile style={{ color: "#919191" }} />
          </div>
          <div className="chatWindow--btn">
            <MoreVert style={{ color: "#919191" }} />
          </div>
        </div>
      </div>

      <div ref={body} className="chatWindow--body">
        {list.map((item, key) => (
          <MessageItem key={key} data={item} user={user} />
        ))}
      </div>

      <div
        className="chatWindow--emojiarea"
        style={{ height: emojiOpen ? "200px" : "0px" }}
      >
        <EmojiPicker
          disableSkinTonePicker
          disableSearchBar
          onEmojiClick={handleEmojiClick}
        />
      </div>

      <div className="chatWindow--footer">
        <div className="chatWindow--pre">
          <div
            className="chatWindow--btn"
            style={{ width: emojiOpen ? 40 : 0 }}
          >
            <Close style={{ color: "#919191" }} onClick={closeEmojis} />
          </div>
          <div className="chatWindow--btn">
            <InsertEmoticon
              style={{ color: emojiOpen ? "green" : "#919191" }}
              onClick={openEmojis}
            />
          </div>
        </div>

        <div className="chatWindow--inputarea">
          <input
            type="text"
            className="chatWindow--input"
            placeholder="Digite uma mensagem"
            value={text}
            onChange={handleChangeText}
          />
        </div>

        <div className="chatWindow--pos">
          {!text && (
            <div className="chatWindow--btn" onClick={handleMicClick}>
              <MicIcon style={{ color: listening ? "#126ece" : "#919191" }} />
            </div>
          )}
          {text && (
            <div className="chatWindow--btn" onClick={handleSendClick}>
              <SendIcon style={{ color: "#919191" }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
