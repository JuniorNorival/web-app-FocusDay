import styled from "styled-components";
import Footer from "../Footer/Footer";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { getHistoric } from "../../services/trackit";
export default function Historic() {
  return (
    <Container>
      <h1>Meus Hábitos</h1>
      <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>

      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 100px auto 120px auto;
  h1 {
    margin-top: 28px;
    margin-left: 18px;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  p {
    padding-top: 20px;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
    margin-left: 18px;
  }
`;
const CalendarWrapper = styled.div`
  .tudo-verde {
    width: 10px;
    height: 30px;
    border-radius: 100px;

    background-color: #1af307;
  }
`;
