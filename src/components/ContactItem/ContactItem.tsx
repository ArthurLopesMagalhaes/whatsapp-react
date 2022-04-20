import "./style.css";
import { ContactType } from "../../types/Contact";

type Props = {
  data: ContactType;
  onClick: () => Promise<void>;
};

export const ContactItem = ({ data, onClick }: Props) => {
  return (
    <div className="container">
      <img src={data.avatar} alt={data.name} className="contact-img" />
      <div className="contact-name">{data.name}</div>
    </div>
  );
};
