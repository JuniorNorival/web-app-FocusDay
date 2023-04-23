import styled from "styled-components";
import {
  getTodayHabits,
  checkHabit,
  unCheckHabit,
} from "../../services/FocusDay.js";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import updateLocale from "dayjs/plugin/updateLocale";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { BoxHabit } from "../Habits/Habits";
import { CheckboxSharp } from "react-ionicons";
import UserContext from "../../context/UserContext";
import { useContext } from "react";

export default function Today() {
  const { habitsToday, setHabitsToday } = useContext(UserContext);
  const [check, setCheck] = useState(false);
  const { progress, setProgress } = useContext(UserContext);

  useEffect(() => {
    const promise = getTodayHabits();
    promise.then((res) => {
      setHabitsToday(res.data);
      updateProgress(res.data);
    });
    // eslint-disable-next-line
  }, [check]);

  dayjs.extend(updateLocale);
  dayjs.updateLocale("pt-br", {
    weekdays: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
  });

  const dia = dayjs().locale("pt-br").format("dddd, DD/MM");

  function updateProgress(data) {
    let percent = data.filter((task) => task.done).length / data.length;
    setProgress(percent);
  }

  function markHabit(id, done) {
    if (done) {
      const promise = unCheckHabit(id);
      promise.then(() => setCheck(!check));
    } else {
      const promise = checkHabit(id);
      promise.then(() => setCheck(!check));
    }
  }

  return (
    <Container check={progress > 0 ? true : false}>
      <h1>{dia}</h1>
      {progress === 0 || isNaN(progress) ? (
        <h3>Nenhum hábito concluído ainda</h3>
      ) : (
        <h3>{(progress * 100).toFixed(0)}% dos hábitos concluídos</h3>
      )}

      {habitsToday === ""
        ? ""
        : habitsToday.map((habit) => (
            <BoxHabit key={habit.id} direction={"row"}>
              <div>
                <h2>{habit.name}</h2>
                <Sequence check={habit.done}>
                  Sequência atual:<p>{habit.currentSequence} dias</p>
                </Sequence>
                <Sequence
                  check={
                    habit.currentSequence === habit.highestSequence &&
                    habit.highestSequence !== 0
                      ? true
                      : false
                  }
                >
                  Seu Recorde:<p>{habit.highestSequence} dias</p>
                </Sequence>
              </div>
              <Check>
                <CheckboxSharp
                  color={habit.done === false ? "#EBEBEB" : "#8FC549"}
                  height="69px"
                  width="69px"
                  onClick={() => {
                    markHabit(habit.id, habit.done);
                  }}
                />
              </Check>
            </BoxHabit>
          ))}
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 80px auto 120px auto;

  h1 {
    margin-top: 28px;
    margin-left: 18px;
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  h3 {
    margin-left: 18px;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: ${(props) => (props.check ? "#8FC549" : "#BABABA")};
  }
`;
const Check = styled.div`
  width: 69px;
  height: 69px;
  right: 13px;
  top: 13px;
  position: absolute;
  border-radius: 5px;
  cursor: pointer;
`;
const Sequence = styled.div`
  font-weight: 400;
  font-size: 12.976px;
  line-height: 16px;
  display: flex;
  padding: 0 20px;
  color: #666666;
  p {
    color: ${(props) => (props.check ? "#8FC549" : "#666666")};
  }
`;

export { Container };
