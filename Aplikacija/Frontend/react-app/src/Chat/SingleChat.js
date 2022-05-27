import React, { useState, useEffect, useLayoutEffect, createRef } from "react";
import {
  Button,
  Chip,
  Paper,
  ListItem,
  Fab,
  Grid,
  TextField,
  Divider,
  List,
} from "@mui/material";
import ChatMessage from "./ChatMessage";
import SendIcon from "@mui/icons-material/Send";
import * as signalR from "@microsoft/signalr";

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect(),
    top = rect.top,
    height = rect.height,
    el = el.parentNode;
  // Check if bottom of the element is off the page
  if (rect.bottom < 0) return false;
  // Check its within the document viewport
  if (top > document.documentElement.clientHeight) return false;
  do {
    rect = el.getBoundingClientRect();
    if (top <= rect.bottom === false) return false;
    // Check if the element is out of view due to a container scrolling
    if (top + height <= rect.top) return false;
    el = el.parentNode;
  } while (el != document.body);
  return true;
}

export default function SingleChat() {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [postPage, setPostPage] = useState(0);
  const [morePosts, setMorePosts] = useState(true);
  const [scrollDown, setScrollDown] = useState(true);
  const [scrollUp, setScrollUp] = useState(false);
  const [connection, setConnection] = useState(
    new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.None)
      .withUrl("/chathub")
      .build()
  );

  const ref = createRef();
  const ref2 = createRef();
  const textref = createRef();

  const onMessageEnterHandler = (e) => {
    if (e.key === "Enter") {
      sendMessage(e.target);
    }
  };

  const receiveMessage = (message) => {
    if (ref.current != null) {
      if (isScrolledIntoView(ref.current)) setScrollDown(true);
    }
    setMessages((posts) => [...posts, message]);
  };

  useEffect(() => {
    connection.on("RecieveMessage" + "53b4ae00-fb44-4d1c-9aee-22d8e8d6365f", function (message) {
      receiveMessage(message);
    });

    connection
      .start()
      .then(function () {
        getMessages(0);
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    return () => {
      connection.off("RecieveMessage" + "53b4ae00-fb44-4d1c-9aee-22d8e8d6365f");
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setPostPage(0);
    setMorePosts(true);
    setScrollDown(true);
    setScrollUp(false);
  }, []);

  const getMessages = async (lastMessage) => {
    if (lastMessage === 0) setScrollDown(true);
    else setScrollUp(true);
    const response = await fetch(
      `http://localhost:7240/Chat/preview/user/${"53b4ae00-fb44-4d1c-9aee-22d8e8d6365f"}/${
        lastMessage === 0 ? "" : lastMessage
      }`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    if (data.messages.length > 0) {
      setPostPage(data.messages[data.messages.length - 1].id);
      setMessages((posts) =>
        posts.concat(data.messages).sort((a, b) => a.id - b.id)
      );
    }
    if (loading) {
      setLoading(false);
    }
    if (data.messages.length < 30) {
      setMorePosts(false);
      return;
    }
  };

  const loadMessages = (event) => {
    if (event.target.scrollTop === 0) {
      if (morePosts) {
        getMessages(postPage);
      }
    }
  };

  const sendMessage = async (e) => {
    setScrollDown(true);
    if (e.value == "") return;
    connection
      .invoke("SendChatMessage", "53b4ae00-fb44-4d1c-9aee-22d8e8d6365f", e.value)
      .then((msg) => {
        setMessages((posts) => [...posts, msg]);
        setScrollDown(true);
      })
      .catch(function (err) {
        return console.error(err.toString());
      });
    e.value = "";
    e.focus();
  };

  useLayoutEffect(() => {
    if (ref.current != null && scrollDown) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      if (!loading) setScrollDown(false);
    }
    if (ref2.current != null && scrollUp) {
      ref2.current.scrollIntoView({ behavior: "smooth" });
      setScrollUp(false);
    }
  }, [messages, ref]);

  const scroll = (
    <List
      onScroll={loadMessages}
      style={{
        height: "100%",
        overflowY: "scroll",
      }}
    >
      <br />
      <br />
      <div ref={ref2}></div>
      {messages !== null ? (
        messages.map((message) => (
          <ListItem key={message.id}>
            <div>
              <Chip label={message.senderUsername} color="primary" />
              <Chip
                style={{
                  maxWidth: "40%",
                  height: "auto",
                }}
                label={
                  <div
                    style={{
                      padding: 8,
                      wordWrap: "break-word",
                      whiteSpace: "initial",
                    }}
                  >
                    {message.text}
                  </div>
                }
                color="secondary"
              />
            </div>
          </ListItem>
        ))
      ) : (
        <div></div>
      )}
      <div
        ref={ref}
        style={{
          width: "8px",
          height: "16px",
          margin: "8px",
        }}
      ></div>
      <br />
    </List>
  );
  if (loading) return <div></div>;
  else
    return (
      <div className="chat-preview-container">
        <Paper className="team-preview-paper">
          <div className="team-message-container">
            <div className="team-message-list-container">
              {scroll}
              <div className="team-message-input-container">
                <div className="team-message-input">
                  <TextField
                    ref={textref}
                    key="textfield-new-message"
                    onKeyDown={(e) => onMessageEnterHandler(e)}
                    style={{ width: "100%" }}
                    variant="filled"
                    // label={`send new message as ${user.username}`}
                    placeholder="message"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) =>
                      sendMessage(textref.current.childNodes[1].firstChild)
                    }
                  >
                    <SendIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    );

  //   return (
  //     <Grid
  //       item
  //       xs={9}
  //       sx={{
  //         height: "80.5vh",
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "flex-end",
  //       }}
  //     >
  //       <List>
  //         <ChatMessage content="Desi be familijo" time="9.30" align="right" />
  //         <ChatMessage content="Desi be familijo" time="9.30" align="left" />
  //         <ChatMessage content="Desi be familijo" time="9.30" align="right" />
  //       </List>
  //       <Divider />
  //       <Grid container sx={{ pt: 3, pr: 5 }}>
  //         <Grid item xs={11}>
  //           <TextField
  //             id="outlined-basic-email"
  //             label="Type Something"
  //             multiline
  //             maxRows={5}
  //             fullWidth
  //           />
  //         </Grid>
  //         <Grid item xs={1} align="right">
  //           <Fab color="primary" aria-label="add" sx={{ ml: 2, mr: 1 }}>
  //             <SendIcon />
  //           </Fab>
  //         </Grid>
  //       </Grid>
  //     </Grid>
  //   );
}
