/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const FromPhraseWallet: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function handleOk() {
    try {
      const values = await form.getFieldsValue();
      if (!values.fromPhrase) {
        return;
      }
      const wallet = ethers.Wallet.fromPhrase(values.fromPhrase);
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
        title="从助记词导入钱包"
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
            label="助记词"
            name="fromPhrase"
            rules={[{ required: true, message: "请输入钱包助记词" }]}
          >
            <Input placeholder="请输入钱包助记词" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        从助记词导入钱包
      </Button>
    </>
  );
};

export default FromPhraseWallet;
