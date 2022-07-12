import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "@chat/utils";
import { Input, Button } from "@mui/material";

export default function Login(props) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const login = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("auth_token", data.token);
        navigate("/", { replace: true });
      });
  };

  return (
    <div>
      <Input
        defaultValue={name}
        onChange={debounce((e) => setName(e.target.value), 500)}
      />
      <Button variant="contained" onClick={() => login()}>
        Login
      </Button>
    </div>
  );
}
