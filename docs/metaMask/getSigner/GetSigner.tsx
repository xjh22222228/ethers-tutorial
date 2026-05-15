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
  const [loading, setLoading] = React.useState(false);

  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();
      let address = (values.address || "").trim();
      const number = Number(address);

      if (!address) {
        address = undefined;
      } else if (
        !address.startsWith("0x") &&
        number >= 0 &&
        !Number.isNaN(number)
      ) {
        address = Number(address);
      }
      console.log("input address:", address);

      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // 获取 signer
        const signer = await provider.getSigner(address);
        // 获取地址
        const addr = await signer.getAddress();
        const nonce = await signer.getNonce();
        notification.success({
          message: "信息",
          description: (
            <>
              <div>地址： {addr}</div>
              <div>当前交易计数： {nonce}</div>
            </>
          ),
        });
      } else {
        notification.error({
          message: "请安装 MetaMask",
        });
      }

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
        title="查询信息"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          preserve={false}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          autoComplete="off"
        >
          <Form.Item
            label="地址或账户(可填)"
            name="address"
            rules={[{ message: "请输入地址账户或第几个账户" }]}
          >
            <Input placeholder="请输入地址账户或第几个账户" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        使用 Signer 查询账户信息
      </Button>
    </>
  );
};

export default Component;
