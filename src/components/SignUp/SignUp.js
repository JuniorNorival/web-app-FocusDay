import { useState } from "react";
import { Form, Container } from "../Login/Login";
import { getSignUp } from "../../services/FocusDay.js";
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Input from "../Input/Input";
import { sendForm } from "../../helpers/LoginFunctions/LoginFunctions";

export default function SingUp() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    image: "",
  });

  const [button, setButton] = useState({
    text: "Cadastrar",
    disabled: false,
    isSelected: false,
  });
  const navigate = useNavigate();

  function send(e) {
    const promise = sendForm(e, button, setButton, form, getSignUp);

    setButton({
      text: <ThreeDots color="#f9fcfd" height={80} width={80} />,
      disabled: true,
      isSelected: true,
    });

    promise.then(() => {
      alert("Cadastro Realizado Com sucesso");
      navigate("/");
    });

    promise.catch((res) => {
      alert(res.response.data.message);
      setButton({
        text: "Cadastrar",
        disabled: false,
        isSelected: false,
      });
    });
  }

  return (
    <Container>
      <Form onSubmit={(e) => send(e)} button={button.disabled}>
        {Object.keys(form).map((name) => (
          <Input
            key={name}
            name={name}
            button={button.disabled}
            form={form}
            setForm={setForm}
          />
        ))}
        <button type="submit">{button.text}</button>
      </Form>
      <Link to="/">
        <p>Já tem uma conta? Faça login!</p>
      </Link>
    </Container>
  );
}
