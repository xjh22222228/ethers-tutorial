/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input, InputNumber } from "antd";

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
      const balance = await provider.getBalance(values.address);

      const inputBalance = ethers.parseEther(String(values.eth));
      console.log(inputBalance, balance);

      if (inputBalance > balance) {
        notification.error({
          duration: 0,
          message: "余额不足",
          description: `当前余额：${ethers.formatEther(balance)} ETH`,
        });
      } else {
        notification.success({
          duration: 0,
          message: "余额充足",
          description: `当前余额：${ethers.formatEther(balance)} ETH`,
        });
      }
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
        title="测试钱包余额是否足够 ETH"
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
            initialValue={100}
            label="ETH"
            name="eth"
            rules={[{ required: true, message: "请输入要检测的 ETH 数量" }]}
          >
            <InputNumber min={0.00000001} style={{ width: "100%" }} />
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
