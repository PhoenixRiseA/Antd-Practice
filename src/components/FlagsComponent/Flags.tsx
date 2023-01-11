import React from "react";
import { chatHistoryProps } from "../ChatBox/ChatBox";
import { flagsApi } from "../constants";
export const Flags = (props: chatHistoryProps) => {
  // const flagsApiKeys = Object.keys(flagsApi);

  return (
    <>
      <div className="flags-wrapper">
        {flagsApi
          .filter((flag) => props.countries.includes(flag.name))
          .map((flag) => {
            return (
              <div className="flag-item">
                <img src={flag?.url} alt={flag.name} />
              </div>
            );
          })}
      </div>
    </>
  );
};
