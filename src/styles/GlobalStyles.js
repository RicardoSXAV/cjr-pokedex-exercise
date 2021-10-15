import { createGlobalStyle } from "styled-components";
import { colors } from "../constants/colors";

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  background-color: #454545;
}

*, button, input {
  font-family: 'Poppins', sans-serif;
  border: 0;
  outline: 0;
}
`;
