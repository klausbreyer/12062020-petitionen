import "regenerator-runtime/runtime";
import "typeface-source-sans-pro";

import React from "react";
// import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";

import config from "./config";
// import Carousel from "react-material-ui-carousel";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Grid from "@material-ui/core/Grid";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

const expertinnenIcon = require("../images/expertinnen.png");
const petitionImages = require("../images/petitions/*.jpg");
const categoryImages = require("../images/petitions/*.svg");

import CssBaseline from "@material-ui/core/CssBaseline";
import { useWindowSize } from "./lib/useWindowSize";
import arrayShuffle from "./lib/arrayShuffle";

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
  d: { background: "none" },

  categoryImage: {
    maxWidth: "100%",
    maxHeight: "8em",
  },
  categoryHeader: {
    margin: 7.5,
    width: "calc(100% - 15px)",
    minHeight: "8em",
  },
  categoryTypo: {
    lineHeight: "1.1em",
    paddingLeft: "0.5em",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    fontWeight: "bold",
  },
  right: {
    textAlign: "right",
    height: "8em",
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
  klima: {
    // backgroundColor: "#bfcd47",
    // margin: 0,
  },
  gridImageConsul: {
    position: "static",
    transform: "none",
  },
  consulTileBar: {
    color: "black",
    fontWeight: "bold",
    display: "block",
    padding: 3,
    fontSize: 18,
    height: 86,
    whiteSpace: "normal",
    background: "none",
    margin: 0,
  },
  gridListTileBar: {
    backgroundColor: "#fefefe",
    color: "black",
    fontWeight: "bold",
    display: "block",
    padding: 0,
    whiteSpace: "normal",
    margin: 0,
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
  expertinnenHeader: {
    fontWeight: "bold",
    margin: 7.5,
    padding: 3,
    paddingLeft: 40,
    backgroundImage: `url(${expertinnenIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  consulHeader: {
    fontWeight: "bold",
    margin: 7.5,
    padding: 3,
  },

  moreButtonArea: {
    textAlign: "right",
    margin: 7.5,
    marginBottom: "8em",
  },
  moreButton: { fontWeight: "bold" },
  expertinnenIcon: {
    position: "absolute",
    top: 10,
    zIndex: 100,
    right: 10,
    width: 40,
    height: 40,
    left: "inherit",
    transform: "none",
  },
  andereExplanation: {
    maxWidth: 768,
    margin: "auto",
    padding: "4em",
  },
}));

import expertinnenString from "../data/import_expertinnen.tsv.js";
import consulString from "../data/import_consul.tsv.js";
function parseTsv(string) {
  return string.split("\n").map((line) => line.split("\t"));
}

const expertinnenParsed = parseTsv(expertinnenString);
const consulParsed = parseTsv(consulString);

const expertinnenIds = expertinnenParsed.map((line) => line[0]);
const consulWithoutExpertinnenParsed = arrayShuffle(
  consulParsed.filter((line) => expertinnenIds.indexOf(line[0]) === -1)
);

function App() {
  const size = useWindowSize();
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box color="text.primary" className={classes.root}>
          {config.categories.map((category) => {
            const expertinnen = expertinnenParsed.filter(
              (line) => line[1] === category.name
            );
            const consuls = consulWithoutExpertinnenParsed
              .filter((line) => line[1] === category.filter)
              .splice(0, 8);

            return (
              <Box key={category}>
                <Grid
                  container
                  style={{ backgroundColor: category.color }}
                  className={classes.categoryHeader}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h4" className={classes.categoryTypo}>
                      {category.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.right}>
                    <img
                      src={category.image}
                      className={classes.categoryImage}
                    />
                  </Grid>
                </Grid>
                {category.short !== "andere" && (
                  <Typography
                    variant="h6"
                    className={classes.expertinnenHeader}
                  >
                    Empfohlen von Expert*innen
                  </Typography>
                )}
                {category.short === "andere" && (
                  <div className={classes.andereExplanation}>
                    <Typography variant="h4">
                      Warum gibt es die Wildcards?
                    </Typography>
                    <Typography>
                      Das ist ein Erklärunghstext warum es die Kategorie
                      Wildcards gibt und warum diese Petitionen nicht von den
                      Expert’innen empfohlen wurden. Gruende warum es die
                      Kategorie Wildcards gibt und warum diese Petitionen nicht
                      von den Expert’innen empfohlen wurden.
                    </Typography>
                  </div>
                )}

                <div className={classes.gridRoot}>
                  <GridList
                    cellHeight={350}
                    className={classes.gridList}
                    cols={Math.floor(Math.min(size.width, 1280) / 300)}
                    spacing={15}
                  >
                    {expertinnen.map((item, i) => {
                      const image = petitionImages[item[0]];
                      return (
                        <GridListTile
                          key={i}
                          className={classes.gridTile}
                          onClick={() =>
                            (window.location.href = `https://petitionen.12062020.de/budgets/1/investments/${item[0]}`)
                          }
                        >
                          <img
                            src={expertinnenIcon}
                            className={classes.expertinnenIcon}
                          />

                          <img src={image} title={item[7]} />
                          <GridListTileBar
                            classes={{
                              title: classes.gridListTileBar,
                              titleWrap: classes.gridListTileBar,
                            }}
                            className={classes.gridListTileBar}
                            title={item[5]}
                          />
                        </GridListTile>
                      );
                    })}
                  </GridList>
                </div>
                <Typography variant="h6" className={classes.consulHeader}>
                  Noch Mehr Petitionen
                </Typography>
                <div className={classes.gridRoot}>
                  <GridList
                    cellHeight={100}
                    className={classes.gridList}
                    cols={Math.floor(Math.min(size.width, 1280) / 300)}
                    spacing={15}
                  >
                    {consuls.map((item, i) => {
                      const image = petitionImages[item[0]];
                      return (
                        <GridListTile
                          key={i}
                          classes={{
                            imgFullWidth: classes.gridImageConsul,
                            imgFullHeight: classes.gridImageConsul,
                          }}
                          className={classes.gridTile}
                          onClick={() =>
                            (window.location.href = `https://petitionen.12062020.de/budgets/1/investments/${item[0]}`)
                          }
                        >
                          <img src={categoryImages[category.short]} />

                          <GridListTileBar
                            classes={{
                              title: classes.consulTileBar,
                              titleWrap: classes.consulTileBar,
                            }}
                            className={classes.consulTileBar}
                            title={item[5]}
                          />
                        </GridListTile>
                      );
                    })}
                  </GridList>
                </div>
                <div className={classes.moreButtonArea}>
                  <Button variant="outlined" className={classes.moreButton}>
                    Zur {category.name} Petitionsübersicht
                  </Button>
                </div>
              </Box>
            );
          })}

          {/* <Carousel
            autoPlay={true}
            indicators={true}
            animation={"fade"}
            navButtonsAlwaysVisible={true}
            fullHeightHover={true}
            next={(next, active) => {
            }}
            prev={(prev, active) => {
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
              lassName={classes.gridList}
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
          </div>*/}
        </Box>
      </ThemeProvider>
    </>
  );
}
ReactDOM.render(<App />, document.getElementById("root"));

// function Item(props) {
//   return (
//     <Paper>
//       <h2>{props.item.name}</h2>
//       <p>{props.item.description}</p>

//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   );
// }
