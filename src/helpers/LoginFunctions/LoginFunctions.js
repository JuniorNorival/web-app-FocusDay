import { ThreeDots } from "react-loader-spinner";

function handleForm({ name, value, form, setForm }) {
  setForm({
    ...form,
    [name]: value,
  });
}

function sendForm(e, button, setButton, form, get) {
  if (button.isSelected) {
    e.preventDefault();
    return;
  }
  e.preventDefault();

  setButton({
    text: <ThreeDots color="#f9fcfd" height={80} width={80} />,
    disabled: true,
    isSelected: true,
  });

  const promise = get(form);
  return promise;
}

export { handleForm, sendForm };
