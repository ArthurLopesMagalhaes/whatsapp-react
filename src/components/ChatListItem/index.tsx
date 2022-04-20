import { ContactType } from "../../types/Contact";
import "./style.css";

type Props = {
  onClick: () => void;
  active: boolean;
  data: ContactType;
};

export const ChatListItem = ({ onClick, active, data }: Props) => {
  return (
    <div className={`chatListItem ${active ? "active" : ""}`} onClick={onClick}>
      <img className="chatListItem--avatar" src={data.avatar} alt="" />
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.name}</div>
          <div className="chatListItem--date">23:32</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListIItem--lastMsg">
            <p>{data.lastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
