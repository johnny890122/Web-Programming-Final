import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#22577E", // header-dark blue
    },
    secondary: {
      main: "#ffcc80", //Another orange-ish color
    },
  },
  // fontFamily: font, // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});
