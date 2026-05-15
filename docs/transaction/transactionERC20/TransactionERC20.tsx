/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input, InputNumber } from "antd";

const RPC = "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 查询余额
  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();

      // 配置提供者（例如 buildbear、Infura、Alchemy 或本地节点）
      const provider = new ethers.JsonRpcProvider(values.RPC);

      // 配置钱包
      const privateKey = values.privateKey; // 替换为你的私钥
      const wallet = new ethers.Wallet(privateKey, provider);

      // ERC-20 合约地址和 ABI
      const tokenAddress = values.contractAddress; // 替换为代币合约地址
      const tokenABI = [
        "function symbol() view returns (string)",
        "function transfer(address to, uint256 value) public returns (bool)",
        "function decimals() view returns (uint8)",
      ];

      // 创建代币合约实例
      const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);

      // 转账参数
      const recipientAddress = values.to; // 替换为接收者地址
      const decimals = await tokenContract.decimals(); // 获取代币小数位数
      const symbol = await tokenContract.symbol(); // 获取代币符号
      const amount = ethers.parseUnits(String(values.amount), decimals); // 转账金额

      notification.success({
        duration: 0,
        message: "转账信息",
        description: `代币符号: ${symbol}, 代币小数: ${decimals}, 转账金额: ${ethers.formatUnits(
          amount,
          decimals,
        )}`,
      });

      // 发送代币转账交易
      const tx = await tokenContract.transfer(recipientAddress, amount);
      console.log("Transaction hash:", tx.hash);

      // 等待交易确认
      const receipt = await tx.wait();

      notification.success({
        duration: 0,
        message: "转账成功",
        description: `交易已确认，区块号：${receipt.blockNumber}, Hash: ${receipt.hash}`,
      });

      window.open(
        `https://explorer.buildbear.io/outstanding-juggernaut-05cd9cc5/tx/${receipt.hash}`,
        "_blank",
      );

      handleCancel();
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
        title="转账到 ERC-20 代币"
        okText={loading ? "确认中..." : "转账"}
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
            initialValue={"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"}
            label="代币地址"
            name="contractAddress"
            rules={[{ required: true, message: "请输入合约代币地址" }]}
          >
            <Input placeholder="请输入合约代币地址" />
          </Form.Item>

          <Form.Item
            label="钱包私钥"
            name="privateKey"
            rules={[{ required: true, message: "请输入钱包私钥" }]}
          >
            <Input placeholder="请输入钱包私钥" />
          </Form.Item>

          <Form.Item
            initialValue={"0x817c6ef5f2ef3cc56ce87942bf7ed74138ec284c"}
            label="转账给"
            name="to"
            rules={[{ required: true, message: "请输入要转账的地址" }]}
          >
            <Input placeholder="请输入要转账的地址" />
          </Form.Item>

          <Form.Item
            initialValue={0.01}
            label="转账数量"
            name="amount"
            rules={[{ required: true, message: "请输入要转账的 ETH 数量" }]}
          >
            <InputNumber min={0.01} max={1} step={0.01} />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        点击这里测试转账
      </Button>
    </>
  );
};

export default Component;
