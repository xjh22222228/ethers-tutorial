/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-nocheck
import React from "react";
import { ethers } from "ethers";
import { Button, notification } from "antd";

const Component: React.FC = () => {
  async function handleCheckInstalled() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        console.log("账号", accounts);
        notification.success({
          message: "授权成功",
          description: `账号地址：${JSON.stringify(accounts)}`,
        });
      } catch (error: any) {
        notification.error({
          message: "用户拒绝授权",
          description: error.message,
        });
      }
    } else {
      console.log("请安装 MetaMask");
      notification.error({
        message: "请安装 MetaMask",
      });
      window.open(
        "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?utm_source=ext_app_menu",
        "_blank",
      );
    }
  }

  return (
    <>
      <Button type="primary" onClick={handleCheckInstalled}>
        点我连接 MateMask
      </Button>
    </>
  );
};

export default Component;
