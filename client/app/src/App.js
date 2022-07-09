import { useState } from "react";
import Input from "@mui/material/Input";

import { debounce } from "@chat/utils";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  return <Input onChange={debounce((e) => setMessage(e.target.value), 500)} />;
}

export default App;
