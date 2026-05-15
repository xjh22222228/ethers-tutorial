/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const RPC = "https://rpc.buildbear.io/outstanding-juggernaut-05cd9cc5";
const hash =
  "0x86e02b444996402090920b38bbccfcdea27f6bc9921a3d4b841c25bfe64581ce";

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

      const transactionReceipt = await provider.getTransactionReceipt(
        values.hash,
      );
      notification.success({
        duration: 0,
        message: "交易回执信息：",
        description: (
          <>
            <pre>{JSON.stringify(transactionReceipt, null, 2)}</pre>
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
        title="查询交易回执"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          preserve={false}
          labelCol={{ span: 6 }}
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
            initialValue={hash}
            label="交易Hash地址"
            name="hash"
            rules={[{ message: "请输入交易Hash地址" }]}
          >
            <Input placeholder="请输入交易Hash地址" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        查询交易回执 getTransactionReceipt
      </Button>
    </>
  );
};

export default Component;
