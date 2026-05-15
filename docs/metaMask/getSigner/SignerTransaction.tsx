/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input, InputNumber } from "antd";

const address = "0x2cFC43B94126595E8B636fed9fB585fF220Bc97d";

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

      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);

        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // 获取 signer
        const signer = await provider.getSigner(address);

        const tx = await signer.sendTransaction({
          // 转账地址
          to: values.address,

          // 转账数量，解析成 wei 单位
          value: ethers.parseEther(String(values.eth)),
        });
        notification.success({
          duration: 0,
          message: `交易已发送: ${tx.hash}`,
        });

        // 等待交易确认
        const confirmTx = await tx.wait();
        notification.success({
          duration: 0,
          message: `交易已确认: ${confirmTx?.hash}`,
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
        title="转账"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form
          form={form}
          preserve={false}
          name="form2"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 19 }}
          autoComplete="off"
        >
          <Form.Item
            label="接收地址"
            name="address"
            initialValue="0x817c6ef5f2ef3cc56ce87942bf7ed74138ec284c"
          >
            <Input placeholder="请输入接收地址" />
          </Form.Item>

          <Form.Item label="ETH 数量" name="eth" initialValue={0.00001}>
            <InputNumber
              style={{ width: "100%" }}
              min={0.00001}
              max={1}
              step={0.00001}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        使用 Signer 签名转账
      </Button>
    </>
  );
};

export default Component;
