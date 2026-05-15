/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-nocheck
import React from "react";
import { ethers } from "ethers";
import { Button, notification } from "antd";

const Component: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  async function handleCheckInstalled() {
    setLoading(true);

    if (typeof window.ethereum !== "undefined") {
      try {
        window.ethereum.on("connect", (info) => {
          notification.success({
            message: `钱包连接成功: ${JSON.stringify(info || {})}`,
          });
        });

        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);

        window.ethereum.on("accountsChanged", (accounts) => {
          notification.success({
            message: `切换账户: ${JSON.stringify(accounts || [])}`,
          });
        });

        window.ethereum.on("chainChanged", (chainId) => {
          notification.success({ message: `切换网络: ${chainId}` });
        });

        window.ethereum.on("disconnect", (info) => {
          console.log("disconnect", info);
          notification.success({
            message: `钱包断开连接`,
          });
        });

        notification.success({
          message: "正在监听事件",
        });
      } catch (error: any) {
        setLoading(false);
        notification.error({
          message: "用户拒绝授权",
          description: error.message,
        });
      }
    } else {
      setLoading(false);
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
      <Button type="primary" onClick={handleCheckInstalled} loading={loading}>
        监听 MateMask 账户
      </Button>
    </>
  );
};

export default Component;
