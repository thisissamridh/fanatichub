import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Loader = styled.div`
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #425bed; /* Blue */
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  position: relative;
  left: 50%;
  right: 50%;
  top: 50%;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding-top: 20rem;
  color: #6cffe4;
  letter-spacing: 5px;
  font-size: 16px;
`;

const Screen = styled.div`
  position: relative;
  height: 90vh;
  width: 100%;
  opacity: 0;
  animation: fade 0.4s ease-in forwards;
  background: transparent;

  @keyframes fade {
    0% {
      opacity: 0.4;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default function Loading(props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  React.useEffect(() => {
    setLoading(props._loading);
  }, [props._loading]);

  React.useEffect(() => {
    setMessage(props._message);
  }, [props._message]);

  return (
    <>
      <Screen>
        <Loader />
        <Message>
          <div>
            <h2>{message}</h2>
          </div>
        </Message>
      </Screen>
    </>
  );
}
