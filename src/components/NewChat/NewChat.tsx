import "./style.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContactType } from "../../types/Contact";
import { ContactItem } from "../ContactItem/ContactItem";
import { loginFacebook } from "../../api";

type Props = {
  chatlist: ContactType[];
  user: ContactType;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export const NewChat = ({ chatlist, user, show, setShow }: Props) => {
  const closeNewChat = () => {
    setShow(false);
  };

  const [list, setList] = useState<ContactType[]>([]);

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        let results = await loginFacebook.getContactList(String(user.id));
        setList(results);
      }
    };
    getList();
  }, [user]);

  const addNewChat = async (user2: ContactType) => {
    await loginFacebook.addNewChat(user, user2);

    closeNewChat();
  };

  return (
    <div className="newChat" style={{ left: show ? 0 : -500 }}>
      <div className="newChat--head">
        <div className="newChat--backbutton" onClick={closeNewChat}>
          <ArrowBackIcon style={{ color: "#fff" }} />
        </div>
        <div className="newChat--headtitle">Nova Conversa</div>
      </div>
      <div className="newChat--list">
        {list.map((item, key) => (
          <ContactItem key={key} data={item} onClick={() => addNewChat(item)} />
        ))}
      </div>
    </div>
  );
};
