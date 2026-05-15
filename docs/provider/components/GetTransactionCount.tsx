/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const RPC = "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5";
const address = "0x2cFC43B94126595E8B636fed9fB585fF220Bc97d";

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

      const provider = new ethers.JsonRpcProvider(values.RPC);

      const transactionCount = await provider.getTransactionCount(
        values.address || address,
      );
      const transactionPendingCount = await provider.getTransactionCount(
        values.address || address,
        "pending",
      );

      notification.success({
        duration: 0,
        message: "交易次数：",
        description: (
          <>
            <div>已确认交易的计数: {transactionCount}</div>
            <div>包括未确认交易的计数: {transactionPendingCount}</div>
          </>
        ),
      });

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
        title="查询交易次数"
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
            rules={[{ message: "请输入提供商的测试RPC" }]}
          >
            <Input placeholder="请输入提供商的测试RPC" />
          </Form.Item>

          <Form.Item
            initialValue={address}
            label="地址"
            name="address"
            rules={[{ message: "请输入地址" }]}
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        查询交易次数 getTransactionCount
      </Button>
    </>
  );
};

export default Component;
