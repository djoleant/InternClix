import Container from "@mui/material/Container";
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import {
  Paper,
  CssBaseline,
  Box,
  Divider,
  Grid,
  Chip,
  Avatar,
} from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import IconButton from "@mui/material/IconButton";
import Star from "@mui/icons-material/Star";

export default function ExperienceCard(props) {
  return (
    <Container component="main">
      <CssBaseline />
      <React.Fragment>
        <Paper sx={{ p: 2, ml: 2 }} variant="outlined">
          <Grid
            container
            style={{
              marginTop: 1,
              marginLeft: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
            spacing={3}
            sx={{ mb: 4 }}
          >
            {/* <Typography     align="center" sx={{ m: 1, fontWeight:"1000" }}> Random Internship Title </Typography>
                            <Typography     align="center" sx={{ m: 1 }}>  Location </Typography>
                            <Typography     align="center" sx={{ m: 1 }}>  Duration </Typography>      */}
            <Grid
              container
              style={{
                marginTop: 1,
                marginLeft: 3,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                //backgroundColor:"red"
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Typography
                style={{ fontSize: 22, fontWeight: 1000, marginLeft: 15, justifySelf: "flex-start" }}
              >
                Company Rating #{props.id}{" "}
              </Typography>
              <Grid
                style={{
                  backgroundColor: "whitesmoke",
                  display: "flex",
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  justifySelf: "flex-end",
                  borderRadius: 10,
                  marginLeft: 50
                }}
              >
                <Grid>
                  <Typography style={{ marginRight: 10, marginTop: 6 }}>
                    Was this rating helpful? {"  "}
                  </Typography>
                </Grid>
                <Typography>
                  {props.likes}{" "}
                  <IconButton color="primary" aria-label="add an alarm">
                    <ThumbUpIcon />
                  </IconButton>
                </Typography>
                <Typography>
                  {props.dislikes}{" "}
                  <IconButton color="primary" aria-label="add an alarm">
                    <ThumbDownIcon />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              style={{
                marginTop: 1,
                marginLeft: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justofyContent: "center",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Grid
                container
                style={{
                  marginTop: 1,
                  marginLeft: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justofyContent: "flex-start",
                }}
                spacing={3}
                sx={{ mb: 4 }}
              >
                <Button
                  style={{
                    width: 60,
                    marginLeft: 7,
                    marginRight: 20,
                    marginTop: 1,
                    color: "black",
                  }}
                  variant="contained"
                  disabled
                >
                  {props.skillImprovementScore}{" "}
                  <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />
                </Button>
                <Typography>Skill improvement Score</Typography>
              </Grid>
              <Grid
                container
                style={{
                  marginLeft: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justofyContent: "flex-start",
                }}
                spacing={3}
                sx={{ mb: 4 }}
              >
                <Button
                  style={{
                    width: 60,
                    marginLeft: 7,
                    marginRight: 20,
                    marginTop: 1,
                    color: "black",
                  }}
                  variant="contained"
                  disabled
                >
                  {props.benefitsScore}{" "}
                  <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />
                </Button>
                <Typography>Company Benefits Score</Typography>
              </Grid>
              <Grid
                container
                style={{
                  marginLeft: 3,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justofyContent: "flex-start",
                }}
                spacing={3}
                sx={{ mb: 2 }}
              >
                <Button
                  style={{
                    width: 60,
                    marginLeft: 7,
                    marginRight: 20,
                    marginTop: 1,
                    color: "black",
                  }}
                  variant="contained"
                  disabled
                >
                  {props.overallScore}{" "}
                  <StarRateIcon style={{ fontSize: "medium", marginLeft: 3 }} />
                </Button>
                <Typography>Overall Company Score</Typography>
              </Grid>
              {props.recommended == true ? (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ThumbUpIcon
                    style={{ marginLeft: 15, color: "green" }}
                  ></ThumbUpIcon>
                  <Typography
                    style={{
                      marginLeft: 7,
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    Recommends{" "}
                  </Typography>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <ThumbDownIcon
                    style={{ marginLeft: 15, color: "red" }}
                  ></ThumbDownIcon>
                  <Typography
                    style={{ marginLeft: 7, color: "red", fontWeight: "bold" }}
                  >
                    {" "}
                    Doesn't Recommend{" "}
                  </Typography>
                </div>
              )}
            </Grid>
            <Grid
              container
              style={{
                marginLeft: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              spacing={3}
              sx={{ mb: 4 }}
            >
              <Divider style={{ width: "90%" }}></Divider>
              <Typography

                align="center"
                sx={{ m: 1, color: "black", fontWeight: "1000" }}
              >
                {" "}
                POSITIVE EXPERIENCE{" "}
              </Typography>
              <Typography align="center" sx={{ m: 1 }}>
                {" "}
                {props.positiveExperience}{" "}
              </Typography>

              <Typography

                align="center"
                sx={{ m: 1, color: "black", fontWeight: "1000" }}
              >
                {" "}
                NEGATIVE EXPERIENCE{" "}
              </Typography>
              <Typography align="center" sx={{ m: 1 }}>
                {" "}
                {props.negativeExperience}{" "}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </React.Fragment>
    </Container>
  );
}
