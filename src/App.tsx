import React, { useState } from "react";
import { FloatButton } from "antd";

import "./App.scss";
import ChatBox from "./components/ChatBox/ChatBox";

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const chatBoxOpenHandler = () => setOpen((state) => !state);
  return (
    <div className="App">
      {open && (
        <>
          <ChatBox />
        </>
      )}
      <FloatButton
        className="main-button"
        description="Ask me!"
        type="primary"
        onClick={chatBoxOpenHandler}
      />
    </div>
  );
}

export default App;
