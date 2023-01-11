import React, { useMemo, useState, useRef, useEffect } from "react";
import { Button, Input } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import "./ChatBox.scss";
import { Flags } from "../FlagsComponent/Flags";

export type chatHistoryProps = {
  countries: string[];
};

const ChatBox: React.FC = () => {
  const [toggleBox, setToggleBox] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<string>("");
  const countryNamesRef = useRef<string>("");
  countryNamesRef.current = countryNames;
  const [chatHistory, setChatHistory] = useState<chatHistoryProps[]>([]);
  const [mount, setMount] = useState<boolean>(false);
  useEffect(() => {
    setMount(true);
    return () => {
      setMount(false);
    };
  }, []);
  const chatHistoryMemo = useMemo(
    () =>
      chatHistory?.map((chatHistoryObject) => (
        <div className="countries">
          <span>{chatHistoryObject?.countries}</span>{" "}
        </div>
      )),
    [chatHistory]
  );

  const historyHandler = () => {
    setChatHistory((state) => {
      return [...state, { countries: [countryNamesRef.current] }];
    });

    countryNamesRef.current = "";
  };

  return (
    <div
      className={`chat-box${mount ? " open" : ""}${
        !toggleBox ? " active" : ""
      }`}
    >
      <div className="title">
        <span>Country Flags</span>
        <Button
          className="title-btn"
          size="small"
          type="primary"
          onClick={() => setToggleBox((state) => !state)}
        >
          {toggleBox ? "Expand" : "Collapse"}
        </Button>
      </div>
      <div className={`body${!toggleBox ? " active" : ""}`}></div>
      <div className={`input${!toggleBox ? " active" : ""}`}>
        <div
          className={`input-history${
            chatHistoryMemo?.length > 0 ? " active" : ""
          }`}
        >
          {chatHistoryMemo}
        </div>
        <div className="current-input">
          <Input
            style={{ width: "calc(100% - 2vw)" }}
            onChange={(e) => {
              setCountryNames(e.target.value);
            }}
            suffix={<SendOutlined onClick={historyHandler} />}
          ></Input>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatBox);
