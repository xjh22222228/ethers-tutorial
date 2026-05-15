/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input, InputNumber } from "antd";

const abi = [
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
];

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      if (!values.address) {
        return;
      }

      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // 获取 signer
        const signer = await provider.getSigner();
        const iface = new ethers.Interface(abi);
        const data = iface.encodeFunctionData("transfer", [
          values.address,
          ethers.parseUnits(String(values.eth), 6),
        ]);
        const tx = await signer.sendTransaction({
          // 合约地址
          to: values.contractAddress,
          data,
        });
        notification.success({
          duration: 0,
          message: `交易已发送: ${tx.hash}`,
        });

        // 等待交易确认
        const confirmTx = await tx.wait();
        notification.success({
          duration: 0,
          message: `交易已确认: ${confirmTx?.hash}`,
        });
      } else {
        notification.error({
          message: "请安装 MetaMask",
        });
      }

      handleCancel();
    } catch (error: any) {
      console.log("error", error);
      console.log("error:data", error.data);
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
        title="转账"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          preserve={false}
          name="form2"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          autoComplete="off"
        >
          <Form.Item
            label="合约地址"
            name="contractAddress"
            initialValue="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
          >
            <Input placeholder="请输入合约地址" />
          </Form.Item>

          <Form.Item
            label="转账给"
            name="address"
            initialValue="0x817C6Ef5f2EF3CC56ce87942BF7ed74138EC284C"
          >
            <Input placeholder="请输入转账地址" />
          </Form.Item>

          <Form.Item label="转账数量" name="eth" initialValue={0.00001}>
            <InputNumber
              style={{ width: "100%" }}
              min={0.00001}
              step={0.00001}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        测试一下
      </Button>
    </>
  );
};

export default Component;
