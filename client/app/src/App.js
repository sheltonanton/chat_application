import React, { useState, useEffect, useRef } from "react";
import { Input, Button } from "@mui/material";

import { debounce } from "@chat/utils";
import "./App.css";

function App() {
  const textBoxRef = useRef();
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);

  function getMessages() {
    fetch("api/messages?s=1&r=1&t=" + new Date().getTime())
      .then((response) => response.json())
      .then((response) => {
        setHistory(response.messages);
      });
  }

  function sendMessage() {
    fetch("api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

export default App;
