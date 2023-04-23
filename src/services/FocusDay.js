import axios from "axios";
const BaseURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit";

function createConfig() {
  const userData = JSON.parse(localStorage.getItem("trackIt"));
  const config = {
    headers: {
      Authorization: `Bearer ${userData.token}`,
    },
  };
  return config;
}

function getLogin(body) {
  const promise = axios.post(`${BaseURL}/auth/login`, body);

  return promise;
}

function getSignUp(children) {
  const user = {
    email: children.email,
    name: children.name,
    password: children.password,
    image: children.image,
  };
  const promise = axios.post(`${BaseURL}/auth/sign-up`, user);

  return promise;
}

function getTodayHabits() {
  const config = createConfig();
  const promise = axios.get(`${BaseURL}/habits/today`, config);
  return promise;
}

function getHabits() {
  const config = createConfig();
  const promise = axios.get(`${BaseURL}/habits`, config);
  return promise;
}

function postHabits(body) {
  const config = createConfig();
  const promise = axios.post(`${BaseURL}/habits`, body, config);
  return promise;
}

function deleteHabit(idHabit) {
  const config = createConfig();
  const promise = axios.delete(`${BaseURL}/habits/${idHabit}`, config);
  return promise;
}

function checkHabit(idHabit) {
  const config = createConfig();
  const promise = axios.post(`${BaseURL}/habits/${idHabit}/check`, {}, config);
  return promise;
}

function unCheckHabit(idHabit) {
  const config = createConfig();
  const promise = axios.post(
    `${BaseURL}/habits/${idHabit}/uncheck`,
    {},
    config
  );
  return promise;
}

function getHistoric() {
  const config = createConfig();
  const promise = axios.get(`${BaseURL}/habits/history/daily`, config);
  return promise;
}
export {
  getLogin,
  getSignUp,
  getTodayHabits,
  getHabits,
  postHabits,
  deleteHabit,
  checkHabit,
  unCheckHabit,
  getHistoric,
};
