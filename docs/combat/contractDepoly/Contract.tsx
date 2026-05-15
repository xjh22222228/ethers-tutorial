/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import { Button, notification, Modal, Form, Input } from "antd";

const RPC = "https://ethereum-sepolia-rpc.publicnode.com";

const Component: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // 查询余额
  async function handleOk() {
    setLoading(true);
    notification.destroy();
    try {
      const values = await form.getFieldsValue();

      // 配置提供者（例如 buildbear、Infura、Alchemy 或本地节点）
      const provider = new ethers.JsonRpcProvider(values.RPC);

      // 编写交互ABI
      const abi = [
        "function balanceOf(address owner) view returns (uint256)",
        "function decimals() view returns (uint8)",
        "function symbol() view returns (string)",
      ];
      // 创建代币合约实例
      const contract = new ethers.Contract(
        values.contractAddress,
        abi,
        provider,
      );

      // 调用 abi 编写的方法
      const balance = await contract.balanceOf(values.address);
      const symbol = await contract.symbol();
      const decimals = await contract.decimals();
      notification.success({
        duration: 0,
        message: "合约信息：",
        description: (
          <>
            <div>余额(wei)：{String(balance)}</div>
            <div>
              余额({symbol})：{ethers.formatUnits(balance, decimals)}
            </div>
            <div>代币符号：{symbol}</div>
            <div>代币小数位数：{String(decimals)}</div>
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
        title="查询"
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
            initialValue={RPC}
            label="RPC地址"
            name="RPC"
            rules={[{ required: true, message: "请输入提供商的测试RPC" }]}
          >
            <Input placeholder="请输入提供商的测试RPC" />
          </Form.Item>

          <Form.Item
            initialValue="0x2cFC43B94126595E8B636fed9fB585fF220Bc97d"
            label="钱包地址"
            name="address"
            rules={[{ required: true, message: "请输入ETH地址" }]}
          >
            <Input placeholder="请输入ETH地址" />
          </Form.Item>

          <Form.Item
            initialValue={"0x6f8d4d48e8ee28257B47d7dBBBB3a346b9D5094D"}
            label="合约地址"
            name="contractAddress"
            rules={[{ required: true, message: "请输入合约代币地址" }]}
          >
            <Input placeholder="请输入合约代币地址" />
          </Form.Item>
        </Form>
      </Modal>
      <Button type="primary" onClick={showModal} loading={loading}>
        查询部署后的合约代币
      </Button>
    </>
  );
};

export default Component;
