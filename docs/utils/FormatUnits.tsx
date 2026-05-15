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
      let unit = values.unit || undefined;
      if (!isNaN(Number(unit))) {
        unit = Number(unit);
      }

      const value = ethers.formatUnits(BigInt(values.value), unit);

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
        title="formatUnits"
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
            initialValue="1500000000000000000"
            label="数值"
            name="value"
          >
            <Input placeholder="请输入数值" />
          </Form.Item>

          <Form.Item initialValue="18" label="单位" name="unit">
            <Input placeholder="请输入单位" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal}>
        formatUnits
      </Button>
    </>
  );
};

export default Component;
