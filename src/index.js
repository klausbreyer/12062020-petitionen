import "regenerator-runtime/runtime";
import "typeface-source-sans-pro";

import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

import {
  Box,
  Typography,
  LinearProgress,
  Divider,
  Grow,
  Stepper,
  Step,
  Paper,
  StepLabel,
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Source Sans Pro", "Helvetica", "Arial", "sans-serif"],
  },
  palette: {
    primary: { main: "#000" },
    secondary: { main: "#f3ebe7" },
    type: "light",
  },
});

const useStyles = makeStyles((theme) => ({
  root: { margin: "auto", padding: "0 1em 5em 1em", maxWidth: "1280px" },
  stepper: { background: "none" },
  fakeHeader: {
    width: "100%",
  },
}));

function App() {
  const [data, setData] = useState([
    {
      id: "reczWgV1IbewGOrLA",
      name: "Gerechtigkeit",
    },
    {
      id: "recgKBx7ybF2nzTOD",
      name: "Zuverlässigkeit",
    },
  ]);

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box color="text.primary" className={classes.root}>
          <img
            src={require("../images/fake-header.png")}
            className={classes.fakeHeader}
          />
        </Box>
      </ThemeProvider>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));
