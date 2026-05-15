/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const RPC = "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5";

const SendTransaction: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 查询余额
  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      const provider = new ethers.JsonRpcProvider(values.RPC);

      const multicallAbi = [
        {
          inputs: [
            {
              components: [
                { name: "target", type: "address" },
                { name: "callData", type: "bytes" },
              ],
              name: "calls",
              type: "tuple[]",
            },
          ],
          name: "aggregate",
          outputs: [
            { name: "blockNumber", type: "uint256" },
            { name: "returnData", type: "bytes[]" },
          ],
          stateMutability: "view",
          type: "function",
        },
      ];

      // Multicall 合约地址（以 Ethereum 主网为例）
      const multicallAddress = "0xca11bde05977b3631167028862be2a173976ca11"; // Multicall3

      // 实例化 multicallContract
      const multicallContract = new ethers.Contract(
        multicallAddress,
        multicallAbi,
        provider,
      );

      // 要批量读取的目标合约（例如 ERC20）
      const erc20Abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function symbol() view returns (string)",
      ];
      const userAddress = values.address; // 用户地址

      // 编码调用数据
      const iface = new ethers.Interface(erc20Abi);
      const balanceOfCallData = iface.encodeFunctionData("balanceOf", [
        userAddress,
      ]);
      console.log("balanceOfCallData：", balanceOfCallData);
      const symbolCallData = iface.encodeFunctionData("symbol", []);

      // 调用 multicall
      const calls = values.contractAddress.split(",").map((address) => ({
        target: address,
        callData: balanceOfCallData,
      }));
      calls.forEach((item) => {
        calls.push({
          target: item.target,
          callData: symbolCallData,
        });
      });
      const result = await multicallContract.aggregate(calls);

      console.log("returnData：", result.returnData);

      const items = [];
      let j = calls.length / 2;
      for (let i = 0; i < calls.length / 2; i++) {
        const balance = iface.decodeFunctionResult(
          "balanceOf",
          result.returnData[i],
        )[0];
        const symbol = iface.decodeFunctionResult(
          "symbol",
          result.returnData[j],
        )[0];
        console.log(balance, symbol);
        j++;

        items.push({
          symbol,
          balance: String(balance),
        });
      }

      notification.success({
        duration: 0,
        message: "结果：",
        description: (
          <div>
            {items.map((item, idx) => (
              <div key={idx}>
                {item.symbol}：{item.balance}
              </div>
            ))}
          </div>
        ),
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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="测试一下"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          preserve={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          autoComplete="off"
        >
          <Form.Item
            initialValue={RPC}
            label="RPC地址"
            name="RPC"
            rules={[{ required: true, message: "请输入提供商的测试RPC" }]}
          >
            <Input placeholder="请输入提供商的测试RPC" />
          </Form.Item>

          <Form.Item
            initialValue={"0x2cFC43B94126595E8B636fed9fB585fF220Bc97d"}
            label="钱包地址"
            name="address"
            rules={[{ required: true, message: "请输入钱包地址" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            initialValue="0x4Fabb145d64652a948d72533023f6E7A623C7C53,0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
            label="合约地址"
            name="contractAddress"
            rules={[
              { required: true, message: "请输入合约地址，多个用英文逗号风格" },
            ]}
          >
            <Input placeholder="请输入合约地址，多个用英文逗号风格" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        测试一下
      </Button>
    </>
  );
};

export default SendTransaction;
