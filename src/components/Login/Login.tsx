import { loginFacebook } from "../../api";

type Props = {
  onReceive: any;
};

export const Login = ({ onReceive }: Props) => {
  const handleFacebookLogin = async () => {
    let result = await loginFacebook.fbPopup();
    if (result) {
      onReceive(result.user);
    } else {
      alert("Erro!");
    }
  };

  return (
    <div className="login">
      <button onClick={handleFacebookLogin}>Logar com o Facebook</button>
    </div>
  );
};
