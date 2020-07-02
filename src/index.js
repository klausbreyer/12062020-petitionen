import "regenerator-runtime/runtime";
import "typeface-source-sans-pro";

import { tsv } from "csv";

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
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Grid,
  Paper,
  CardContent,
  StepLabel,
  Tooltip,
  Link,
} from "@material-ui/core";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import StarIcon from "@material-ui/icons/Star";
import CssBaseline from "@material-ui/core/CssBaseline";
import { useWindowSize } from "./lib/useWindowSize";
import arrayShuffle from "./lib/arrayShuffle";

import expertinnenString from "../import_expertinnen.tsv.js";
import consulString from "../import_consul.tsv.js";
function parseTsv(string) {
  return string.split("\n").map((line) => line.split("\t"));
}

const expertinnen = parseTsv(expertinnenString);
console.log(expertinnen);
const consul = parseTsv(consulString);
console.log(consul);

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
    lineHeight: "1.1em",
    paddingLeft: "0.5em",
    paddingTop: "0.5em",
    fontWeight: "bold",
  },
  right: {
    textAlign: "right",
  },
  gridRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    // height: 450,
  },
  gridTile: {
    cursor: "pointer",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

function App() {
  const size = useWindowSize();

  const classes = useStyles();

  const category = config.categories[0];

  let items = arrayShuffle(category.items);

  items = items.sort(function (x, y) {
    // true values first
    return x.expert === y.expert ? 0 : x.expert ? -1 : 1;
    // false values first
    // return (x === y)? 0 : x? 1 : -1;
  });

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
              <Typography variant="h4" className={classes.categoryTypo}>
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
            animation={"fade"}
            navButtonsAlwaysVisible={true}
            fullHeightHover={true}
            next={(next, active) => {
              console.log(`we left ${active}, and are now at ${next}`);
            }}
            prev={(prev, active) => {
              console.log(`we left ${active}, and are now at ${prev}`);
            }}
          >
            {items
              .filter((item) => item.expert === true)
              .map((item, i) => (
                <GridList
                  key={i}
                  cellHeight={360}
                  className={classes.gridList}
                  cols={1}
                >
                  <GridListTile
                    className={classes.gridTile}
                    onClick={() => (window.location.href = item.url)}
                  >
                    <img src={item.image} alt={item.title} />
                    <GridListTileBar
                      title={item.name}
                      subtitle={<span>{item.description}</span>}
                      actionIcon={
                        item.expert === false ? null : (
                          <Tooltip
                            className={classes.icon}
                            title="Von Expertinnen empfohlen."
                          >
                            <StarIcon />
                          </Tooltip>
                        )
                      }
                    />
                  </GridListTile>
                </GridList>
              ))}
          </Carousel>

          <div className={classes.gridRoot}>
            <GridList
              cellHeight={180}
              className={classes.gridList}
              cols={Math.floor(size.width / 320)}
            >
              {items.map((item, i) => (
                <GridListTile
                  key={i}
                  className={classes.gridTile}
                  onClick={() => (window.location.href = item.url)}
                >
                  <img src={item.image} alt={item.title} />
                  <GridListTileBar
                    title={item.name}
                    subtitle={<span>{item.description}</span>}
                    actionIcon={
                      item.expert === false ? null : (
                        <Tooltip
                          className={classes.icon}
                          title="Von Expertinnen empfohlen."
                        >
                          <StarIcon />
                        </Tooltip>
                      )
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
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
