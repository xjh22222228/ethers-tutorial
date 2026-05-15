/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification } from "antd";

const Component: React.FC = () => {
  // 查询余额
  async function handleOk() {
    try {
      const abi = [
        "function transfer(address to, uint256 amount) returns (bool)",
        "event Transfer(address indexed from, address indexed to, uint256 amount)",
      ];

      // 创建 Interface 实例
      const iface = new ethers.Interface(abi);
      console.log("fragments", iface.fragments);
    } catch (error: any) {
      notification.error({
        duration: 0,
        message: "Error",
        description: error.message,
      });
    }
  }

  return (
    <>
      <Button type="primary" onClick={handleOk}>
        打开控制台查看
      </Button>
    </>
  );
};

export default Component;
