/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function handleOk() {
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      let length = values.length || undefined;
      if (length === "true") {
        length = true;
      } else if (length === "false") {
        length = false;
      } else if (!isNaN(Number(length))) {
        length = Number(length);
      }

      const value = ethers.isHexString(values.value, length);

      notification.success({
        duration: 0,
        message: "结果",
        description: (
          <>
            <div>{value.toString()}</div>
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
        title="isHexString"
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
            initialValue="0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
            label="十六进制"
            name="value"
          >
            <Input placeholder="请输入十六进制" />
          </Form.Item>

          <Form.Item initialValue="" label="长度" name="length">
            <Input placeholder="请输入长度" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        isHexString
      </Button>
    </>
  );
};

export default Component;
