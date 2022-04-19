import "./style.css";
import ImgIntro from "../../assets/intro-connection.jpg";

export const ChatIntro = () => {
  return (
    <div className="chatIntro">
      <img src={ImgIntro} alt="" />
      <h1>Mantenha seu celular conectado.</h1>
      <h2>
        O Whatsapp conecta ao seu telefone para sincronizar suas mensagens. Para
        reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi
      </h2>
    </div>
  );
};
