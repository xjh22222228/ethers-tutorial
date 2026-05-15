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

const value =
  `0xa9059cbb0000000000000000000000002cfc43b94126595e8b636fed9fb585ff220bc97d00000000000000000000000000000000000000000000000000000000000003e8`.trim();

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
      const data = iface.decodeFunctionData(values.functionName, values.value);
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
            initialValue="transfer"
            label="函数名"
            name="functionName"
            rules={[{ required: true, message: "请输入函数名" }]}
          >
            <Input placeholder="请输入函数名" />
          </Form.Item>

          <Form.Item
            initialValue={value}
            label="参数"
            name="value"
            rules={[{ required: true, message: "请输入参数" }]}
          >
            <Input placeholder="请输入参数" />
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
