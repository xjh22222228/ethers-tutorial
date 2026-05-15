/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const Component: React.FC = ({ buttonText }) => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  async function handleOk() {
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      const value = ethers.isAddress(values.address);

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
        title="isAddress"
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
            initialValue="0x2cFC43B94126595E8B636fed9fB585fF220Bc97d"
            label="地址"
            name="address"
          >
            <Input placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        {buttonText || "isAddress"}
      </Button>
    </>
  );
};

export default Component;
