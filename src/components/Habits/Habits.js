import { Container } from "../Today/Today";
import styled from "styled-components";
import add from "../../assets/images/add.jpeg";
import {
  getHabits,
  deleteHabit,
  getTodayHabits,
} from "../../services/FocusDay.js";
import { useState, useEffect, useContext } from "react";
import Footer from "../Footer/Footer";
import { weekDays } from "../../helpers/Weekdays/Weekdays";
import NewHabit from "../NewHabit/NewHabit";
import { TrashOutline } from "react-ionicons";
import UserContext from "../../context/UserContext";
import { updateProgress } from "../../helpers/Progress/Progress";
import Loading from "../Loading/Loading";

export default function Habits() {
  const [habits, setHabits] = useState({});
  const [habitsAdd, setHabitsAdd] = useState(false);
  const [habitName, setHabitName] = useState("");
  const [updateHabits, setUpdateHabits] = useState(false);
  const { setProgress } = useContext(UserContext);
  console.log(habits);
  useEffect(() => {
    const promise = getHabits();
    promise.then((res) => setHabits(res.data));
    getTodayHabits().then((res) => updateProgress(res.data, setProgress));
    // eslint-disable-next-line
  }, [habitsAdd, updateHabits]);

  function delHabit(id) {
    const confirm = window.confirm("Tem Certeza ?");
    if (confirm) {
      deleteHabit(id).then(() => setUpdateHabits(!updateHabits));
    }
    return;
  }

  return (
    <Container>
      <Higher>
        <h2>Meus Hábitos</h2>
        <img src={add} alt="buttonAdd" onClick={() => setHabitsAdd(true)} />
      </Higher>

      <MyHabits>
        {habitsAdd ? (
          <NewHabit
            habitName={habitName}
            setHabitName={setHabitName}
            habitsAdd={habitsAdd}
            setHabitsAdd={setHabitsAdd}
          />
        ) : (
          ""
        )}

        {habits.length > 0 ? (
          habits.map((habit) => (
            <BoxHabit key={habit.id} direction={"column"}>
              <h2>{habit.name}</h2>
              <BoxDay>
                {weekDays.map((d) => (
                  <Days
                    key={d.id}
                    selected={habit.days.includes(d.id) ? true : false}
                  >
                    {d.name}
                  </Days>
                ))}
              </BoxDay>
              <Trash onClick={() => delHabit(habit.id)}>
                <TrashOutline color={"#00000"} height="15px" width="13px" />
              </Trash>
            </BoxHabit>
          ))
        ) : (
          <p>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </p>
        )}
      </MyHabits>

      <Footer />
    </Container>
  );
}

const Higher = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 100px 18px 30px 18px;
  align-items: center;

  h2 {
    font-weight: 400;
    font-size: 22.976px;
    line-height: 29px;
    color: #126ba5;
  }
  img {
    width: 40px;
    height: 35px;
    cursor: pointer;
  }
`;

const MyHabits = styled.div`
  width: 100%;
  p {
    margin: 18px;
    font-weight: 400;
    font-size: 17.976px;
    line-height: 22px;
    color: #666666;
  }
`;

const BoxDay = styled.span`
  display: flex;
  margin: 0px 20px;
`;
const Days = styled.div`
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: ${(props) => (props.selected ? "#CFCFCF" : "#FFFFFF")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  display: flex;
  font-weight: 400;
  font-size: 19.976px;
  line-height: 25px;
  color: ${(props) => (props.selected ? "#FFFFFF" : "#DBDBDB")};
  cursor: pointer;
`;

const BoxHabit = styled.div`
  width: 340px;
  height: 91px;
  background: #ffffff;
  border-radius: 5px;
  margin: 10px auto;
  position: relative;
  display: flex;
  flex-direction: ${(props) =>
    props.direction === "column" ? "column" : "row"};

  h2 {
    padding: 8px 20px;
    font-weight: 400;
    font-size: 20px;

    color: #666666;
    max-width: 300px;
  }
`;

const Trash = styled.span`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

export { BoxHabit };
