/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// @ts-nocheck
import React from "react";
import { Button, notification } from "antd";

const Component: React.FC = () => {
  async function handleCheckInstalled() {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask 已安装!", window.ethereum);
      notification.success({
        message: "MetaMask 已安装",
      });
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
        检测 MateMask 是否安装
      </Button>
    </>
  );
};

export default Component;
