import { debounce } from "@chat/utils";
import { Input, Button } from "@mui/material";
import React from "react";

export default class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  register = () => {
    fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          name: this.state.name,
        },
      }),
    });
  };

  render = () => {
    return (
      <>
        <Input
          defaultValue={this.state.name}
          onChange={debounce(
            (e) => this.setState({ name: e.target.value }),
            500
          )}
        />
        <Button variant="contained" onClick={() => this.register()}>
          Register
        </Button>
      </>
    );
  };
}
