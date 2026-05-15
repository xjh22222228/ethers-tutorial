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
      const value = ethers.toUtf8String(
        values.value.includes("new Uint8Array")
          ? eval(values.value)
          : values.value,
      );

      notification.success({
        duration: 0,
        message: "结果",
        description: (
          <>
            <div>{String(value)}</div>
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
        title="toUtf8String"
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
          <Form.Item initialValue="0x48656c6c6f" label="输入" name="value">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        toUtf8String
      </Button>
    </>
  );
};

export default Component;
