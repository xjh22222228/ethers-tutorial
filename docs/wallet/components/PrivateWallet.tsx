/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const PrivateWallet: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function handleOk() {
    try {
      const values = await form.getFieldsValue();
      if (!values.privateKey) {
        return;
      }
      const wallet = new ethers.Wallet(values.privateKey);
      notification.success({
        message: "钱包",
        description: `钱包地址：${wallet.address}`,
      });
    } catch (error: any) {
      notification.error({
        message: "导入失败",
        description: error.message,
      });
    }
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
        title="从私钥导入钱包"
        okText="导入"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          preserve={false}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          autoComplete="off"
        >
          <Form.Item
            label="私钥"
            name="privateKey"
            rules={[{ required: true, message: "请输入钱包私钥" }]}
          >
            <Input placeholder="请输入钱包私钥" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        从私钥导入钱包
      </Button>
    </>
  );
};

export default PrivateWallet;
