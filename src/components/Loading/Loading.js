import { Oval } from "react-loader-spinner";
import styled from "styled-components";
export default function Loading() {
  return (
    <Box>
      <Oval color="#00BFFF" height={80} width={80} />
    </Box>
  );
}
const Box = styled.div`
  width: 100vw;
  height: calc(100vh - 250px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
