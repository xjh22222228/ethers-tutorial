/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const ConnectWalletProvider: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function handleOk() {
    setLoading(true);
    try {
      const values = await form.getFieldsValue();
      if (!values.privateKey) {
        return;
      }
      const provider = new ethers.JsonRpcProvider(
        values.RPC ||
          "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5",
      );
      const wallet = new ethers.Wallet(values.privateKey, provider);
      const balance = await provider.getBalance(wallet.address);

      notification.success({
        message: "钱包",
        description: `钱包余额：${ethers.formatEther(balance)}`,
      });
    } catch (error: any) {
      notification.error({
        message: "导入失败",
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
        title="查询"
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
            label="RPC"
            name="RPC"
            rules={[{ required: true, message: "请输入RPC" }]}
          >
            <Input placeholder="请输入RPC" />
          </Form.Item>

          <Form.Item
            label="钱包私钥"
            name="privateKey"
            rules={[{ required: true, message: "请输入钱包私钥" }]}
          >
            <Input placeholder="请输入钱包私钥" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        查询钱包余额
      </Button>
    </>
  );
};

export default ConnectWalletProvider;
