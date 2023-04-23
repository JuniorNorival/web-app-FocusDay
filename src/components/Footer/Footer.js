import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

export default function Footer() {
  const { progress } = useContext(UserContext);

  return (
    <Foot>
      <Link to="/habitos">
        <p>Hábitos</p>
      </Link>
      <div>
        <Link to="/hoje">
          <CircularProgressbar
            value={progress}
            maxValue={1}
            text={"Hoje"}
            background
            backgroundPadding={6}
            styles={buildStyles({
              backgroundColor: "#3e98c7",
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "transparent",
            })}
          />
        </Link>
      </div>
      <Link to="/historico">
        <p>Histórico</p>
      </Link>
    </Foot>
  );
}

const Foot = styled.div`
  width: 100vw;
  height: 70px;
  left: 0px;
  bottom: 0px;
  position: fixed;
  background: #ffffff;
  display: flex;
  justify-content: space-around;
  align-items: center;

  div {
    width: 90px;
    margin-bottom: 40px;
  }

  div h2 {
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #ffffff;
  }
  p {
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #52b6ff;
  }
`;
