/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification } from "antd";

const Exception: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  async function handleException() {
    setLoading(true);
    try {
      const provider = new ethers.JsonRpcProvider(
        "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5",
      );
      const balance = await provider.getBalance("0x");
      console.log(balance);
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: <pre>{JSON.stringify(error, null, 2)}</pre>,
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Button type="primary" onClick={handleException} loading={loading}>
        点击这里捕获错误
      </Button>
    </>
  );
};

export default Exception;
