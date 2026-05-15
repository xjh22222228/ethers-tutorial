/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { notification, Button } from "antd";

const Component: React.FC = () => {
  async function handleOk() {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
      }
    } catch (error: any) {
      notification.error({
        message: "连接失败",
        description: error.message,
      });
    }
  }

  return (
    <Button onClick={handleOk} type="primary">
      点我授权钱包
    </Button>
  );
};

export default Component;
