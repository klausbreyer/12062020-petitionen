import "regenerator-runtime/runtime";
import "typeface-source-sans-pro";

import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

import config from "./config";
import Carousel from "react-material-ui-carousel";
import {
  Box,
  Typography,
  LinearProgress,
  Button,
  Divider,
  Grow,
  Stepper,
  Step,
  Grid,
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
  categoryImage: {
    // float: "right",
    maxWidth: "100%",
    maxHeight: "8em",
  },
  categoryHeader: {
    minHeight: "8em",
  },
  categoryTypo: {
    // minHeight: "8em",
  },
  right: {
    textAlign: "right",
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

  const category = config.categories.pop();
  const items = category.items;
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box color="text.primary" className={classes.root}>
          <img
            src={require("../images/fake-header.png")}
            className={classes.fakeHeader}
          />
          <Grid
            container
            style={{ backgroundColor: category.color }}
            className={classes.categoryHeader}
          >
            <Grid item xs={6} sm={6}>
              <Typography variant="h3" className={classes.categoryTypo}>
                {category.name}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} className={classes.right}>
              <img src={category.image} className={classes.categoryImage} />
            </Grid>
          </Grid>
          <Carousel
            autoPlay={true}
            indicators={true}
            animation={"slide"}
            navButtonsAlwaysVisible={true}
            fullHeightHover={true}
            next={(next, active) => {
              console.log(`we left ${active}, and are now at ${next}`);
            }}
            prev={(prev, active) => {
              console.log(`we left ${active}, and are now at ${prev}`);
            }}
          >
            {items.map((item) => (
              <Item item={item} />
            ))}
          </Carousel>
        </Box>
      </ThemeProvider>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
