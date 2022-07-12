import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@mui/material";

import { debounce } from "@chat/utils";
import "./index.css";

function Main() {
  const textBoxRef = useRef();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  function getMessages() {
    fetch("api/messages?s=1&r=1&t=" + new Date().getTime(), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        }
        return response.json();
      })
      .then((response) => {
        setHistory(response.messages);
      });
  }

  function sendMessage() {
    fetch("api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
      },
      body: JSON.stringify({
        message: {
          sender_id: 1,
          receiver_id: 1,
          text: message,
        },
      }),
    }).then(() => {
      setMessage("");
      textBoxRef.current.value = "";
      getMessages();
    });
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <React.Fragment>
      <div>
        {history.map((message, index) => (
          <p key={index}>{message.text}</p>
        ))}
      </div>
      <br></br>
      <Input
        inputRef={textBoxRef}
        onChange={debounce((e) => setMessage(e.target.value), 500)}
        multiline={true}
        style={{ width: 800 }}
      />
      <Button color="primary" variant="contained" onClick={() => sendMessage()}>
        Send
      </Button>
    </React.Fragment>
  );
}

export default Main;
