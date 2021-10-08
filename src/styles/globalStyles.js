import { createGlobalStyle }  from 'styled-components';
import { colors } from '../constants/colors'

export default createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #root, h1 {
  color: black;
}
// *, button, input {
//   font-family: 'Roboto', sans-serif;
//   border: 0;
//   outline: 0;
// }



`