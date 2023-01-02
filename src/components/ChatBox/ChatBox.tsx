import React, { useMemo, useState, useRef } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ChatBox.scss';
const ChatBox: React.FC = () => {
  const [toggleBox, setToggleBox] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<string>('');
  const countryNamesRef = useRef<string>('');
  countryNamesRef.current = countryNames;
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const chatHistoryMemo = useMemo(
    () =>
      chatHistory.map((countries) => (
        <span className="countries">{countries.toString()} </span>
      )),
    [chatHistory]
  );

  const historyHandler = () => {
    setChatHistory((state) => [...state, countryNamesRef.current]);
    countryNamesRef.current = '';
  };

  return (
    <div className={`chat-box${!toggleBox ? ' active' : ''}`}>
      <div className="title">
        <span>Country Flags</span>
        <Button
          className="title-btn"
          size="small"
          type="primary"
          onClick={() => setToggleBox((state) => !state)}
        >
          {toggleBox ? 'Expand' : 'Collapse'}
        </Button>
      </div>
      <div className={`body${!toggleBox ? ' active' : ''}`}></div>
      <div className={`input${!toggleBox ? ' active' : ''}`}>
        <div className="input-history">{chatHistoryMemo}</div>
        <div className="current-input">
          <Input
            placeholder="Type country names here..."
            className="antd-input-box"
            onChange={(e) => {
              setCountryNames(e.target.value);
            }}
            value={countryNames}
            onPressEnter={historyHandler}
            allowClear
          />
          <Button className="send-btn" onClick={historyHandler}>
            {<SendOutlined className="antd-send-icon" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
