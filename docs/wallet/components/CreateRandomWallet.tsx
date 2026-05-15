/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification } from "antd";

const Wallet: React.FC = () => {
  function createRandomWallet() {
    const wallet = ethers.Wallet.createRandom();
    notification.success({
      duration: 0,
      message: "创建随机钱包",
      description: (
        <>
          <div>钱包地址：{wallet.address}</div>
          <div>钱包私钥：{wallet.privateKey}</div>
          <div>钱包公钥：{wallet.publicKey}</div>
          <div>钱包助记词：{wallet.mnemonic?.phrase || "无"}</div>
        </>
      ),
    });
  }

  return (
    <Button type="primary" onClick={createRandomWallet}>
      创建随机钱包
    </Button>
  );
};

export default Wallet;
