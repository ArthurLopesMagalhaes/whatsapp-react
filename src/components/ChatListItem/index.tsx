import { ChatListType } from "../../types/ChatList";
import "./style.css";

type Props = {
  onClick: () => void;
  active: boolean;
  data: ChatListType;
};

export const ChatListItem = ({ onClick, active, data }: Props) => {
  return (
    <div className={`chatListItem ${active ? "active" : ""}`} onClick={onClick}>
      <img className="chatListItem--avatar" src={data.image} alt="" />
      <div className="chatListItem--lines">
        <div className="chatListItem--line">
          <div className="chatListItem--name">{data.title}</div>
          <div className="chatListItem--date">23:32</div>
        </div>
        <div className="chatListItem--line">
          <div className="chatListIItem--lastMsg">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia
              blanditiis minus consequuntur architecto repellendus, quisquam
              fugiat repudiandae tempora qui corrupti, magni sunt non,
              laboriosam culpa cumque ab sed. Doloribus, consequatur!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
