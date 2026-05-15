/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const RPC = "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5";
const abi = `
[
  "function balanceOf(address owner) view returns (uint256)"
]
`.trim();

const value = `[
  "0x2cFC43B94126595E8B636fed9fB585fF220Bc97d",
  1000n
]`.trim();

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      const provider = new ethers.JsonRpcProvider(values.RPC);
      const iface = new ethers.Interface(eval(values.abi));
      const data = iface.encodeFunctionData("balanceOf", [values.address]);
      const result = await provider.call({
        to: values.contractAddress,
        data,
      });
      console.log("call:", result);
      const balance = iface.decodeFunctionResult("balanceOf", result);
      console.log(balance[0]); // 输出: 10098919970n
      notification.success({
        duration: 0,
        message: "结果：",
        description: (
          <>
            <div>{String(balance[0])}n</div>
          </>
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
            label="RPC"
            name="RPC"
            rules={[{ required: true, message: "请输入RPC" }]}
          >
            <Input placeholder="请输入RPC" />
          </Form.Item>

          <Form.Item
            initialValue={abi}
            label="ABI"
            name="abi"
            rules={[{ required: true, message: "请输入ABI" }]}
          >
            <Input.TextArea placeholder="请输入ABI" autoSize={{ minRows: 6 }} />
          </Form.Item>

          <Form.Item
            initialValue="0x2cFC43B94126595E8B636fed9fB585fF220Bc97d"
            label="ETH地址"
            name="address"
            rules={[{ required: true, message: "请输入ETH地址" }]}
          >
            <Input placeholder="请输入ETH地址" />
          </Form.Item>

          <Form.Item
            initialValue="0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
            label="合约地址"
            name="contractAddress"
            rules={[{ required: true, message: "请输入合约地址" }]}
          >
            <Input placeholder="请输入合约地址" />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        className="mb-20"
        type="primary"
        onClick={showModal}
        loading={loading}
      >
        测试一下
      </Button>
    </>
  );
};

export default Component;
