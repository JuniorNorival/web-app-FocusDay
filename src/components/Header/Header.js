import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("trackIt"));

  if (location.pathname === "/" || location.pathname === "/cadastro") {
    return "";
  } else {
    return (
      <Head>
        <ImgUser>
          <img src={userData.image} alt="UserIMG" />
        </ImgUser>
      </Head>
    );
  }
}

const Head = styled.div`
  width: 100vw;
  height: 70px;
  left: 0px;
  top: 0px;
  position: fixed;
  background-color: #126ba5;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 3;

  img {
    margin: 10px 18px;
  }
`;
const ImgUser = styled.div`
  img {
    width: 51px;
    height: 51px;
    border-radius: 98.5px;
    object-fit: cover;
  }
`;
