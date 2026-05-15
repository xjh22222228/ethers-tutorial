/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification } from "antd";

const RPC = "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5";

const SendTransaction: React.FC = () => {
  const [loading, setLoading] = React.useState(false);

  // 查询余额
  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const multicall3Address = "0xca11bde05977b3631167028862be2a173976ca11";

      // ABI
      const getBasefeeAbi = [
        {
          inputs: [],
          name: "getBasefee",
          outputs: [{ name: "basefee", type: "uint256" }],
          stateMutability: "view",
          type: "function",
        },
      ];

      const provider = new ethers.JsonRpcProvider(RPC);
      const multicall = new ethers.Contract(
        multicall3Address,
        getBasefeeAbi,
        provider,
      );

      // 调用 getBasefee
      const baseFee = await multicall.getBasefee();

      notification.success({
        duration: 0,
        message: "结果：",
        description: <>{String(baseFee)}</>,
      });
    } catch (error: any) {
      notification.error({
        duration: 0,
        message: "Error",
        description: error.message,
      });
    }
    setLoading(false);
  }

  return (
    <>
      <Button type="primary" onClick={handleOk} loading={loading}>
        测试一下
      </Button>
    </>
  );
};

export default SendTransaction;
