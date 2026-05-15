/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const abi = `
[
  "function transfer(address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 amount)",
]
`.trim();

const data =
  `0x0000000000000000000000000000000000000000000000000000000000000064`.trim();

const topics = `
[
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "0x0000000000000000000000002cfc43b94126595e8b636fed9fb585ff220bc97d",
    "0x000000000000000000000000817c6ef5f2ef3cc56ce87942bf7ed74138ec284c"
]`.trim();

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      const iface = new ethers.Interface(eval(values.abi));
      const data = iface.decodeEventLog(
        values.functionName,
        values.data,
        eval(values.topics),
      );
      console.log(data);
      notification.success({
        duration: 0,
        message: "结果：",
        description: (
          <>
            <div>{String(data)}</div>
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
        title="测试一下"
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
            initialValue={abi}
            label="ABI"
            name="abi"
            rules={[{ required: true, message: "请输入ABI" }]}
          >
            <Input.TextArea placeholder="请输入ABI" autoSize={{ minRows: 6 }} />
          </Form.Item>

          <Form.Item
            initialValue="Transfer"
            label="函数名"
            name="functionName"
            rules={[{ required: true, message: "请输入函数名" }]}
          >
            <Input placeholder="请输入函数名" />
          </Form.Item>

          <Form.Item
            initialValue={data}
            label="data"
            name="data"
            rules={[{ required: true, message: "请输入data字段" }]}
          >
            <Input placeholder="请输入data字段" />
          </Form.Item>

          <Form.Item
            initialValue={topics}
            label="topics"
            name="topics"
            rules={[{ required: true, message: "请输入topics字段" }]}
          >
            <Input placeholder="请输入topics字段" />
          </Form.Item>
        </Form>
      </Modal>
      <Button
        className="mb-20"
        type="primary"
        onClick={showModal}
        loading={loading}
      >
        测试一下
      </Button>
    </>
  );
};

export default Component;
