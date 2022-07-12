import { debounce } from "@chat/utils";
import { Input, Button } from "@mui/material";
import React from "react";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  login = () => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("auth_token", data.token);
        console.log(this.props);
      });
  };

  render = () => {
    return (
      <div>
        <Input
          defaultValue={this.state.name}
          onChange={debounce(
            (e) => this.setState({ name: e.target.value }),
            500
          )}
        />
        <Button variant="contained" onClick={() => this.login()}>
          Login
        </Button>
      </div>
    );
  };
}
