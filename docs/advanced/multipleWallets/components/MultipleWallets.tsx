/*---------------------------------------------------------------------------------------------
 *  Copyright (c) liuzi6612 liuzi6612/ethers-tutorial. All rights reserved.
 *  Licensed under the MIT License. See License in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { ethers } from "ethers";
import styles from "./style.module.css";
import { notification } from "antd";

interface Wallet {
  name: string;
  installed: boolean;
  icon: string;
  provider?: any;
  uuid?: string;
}

const Component: React.FC = () => {
  const [wallets, setWallets] = React.useState<Wallet[]>([
    {
      name: "MetaMask",
      installed: false,
      icon: "/img/metaMask.svg",
    },
    {
      name: "Trust Wallet",
      installed: false,
      icon: "/img/trust.svg",
    },
  ]);

  async function handleOk(wallet: Wallet) {
    if (!wallet.installed) {
      notification.error({
        message: "请安装钱包",
        description: `请安装 ${wallet.name} 钱包`,
      });
      return;
    }

    try {
      let provider;

      if (wallet.provider) {
        // 使用 EIP-6963 提供的钱包提供者
        provider = new ethers.BrowserProvider(wallet.provider);
      } else {
        throw new Error("未找到钱包提供者");
      }

      const accounts = await provider.send("eth_requestAccounts", []);
      console.log("accounts", accounts);

      notification.success({
        message: "连接成功",
        description: `已连接到 ${wallet.name}`,
      });
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "连接失败",
        description:
          error instanceof Error ? error.message : "无法连接到钱包，请重试",
      });
    }
  }

  React.useEffect(() => {
    // 处理 EIP-6963 事件
    const handleProvider = (event: any) => {
      const { info, provider } = event.detail;
      console.log(info, provider);

      setWallets((prev) => {
        const newWallets = [...prev];
        const existingWallet = newWallets.find((w) => w.name === info.name);

        if (existingWallet) {
          existingWallet.installed = true;
          existingWallet.provider = provider;
          existingWallet.uuid = info.uuid;
        } else {
          newWallets.push({
            name: info.name,
            installed: true,
            icon: info.icon,
            provider: provider,
            uuid: info.uuid,
          });
        }

        return newWallets;
      });
    };

    // 监听 EIP-6963 事件
    window.addEventListener("eip6963:announceProvider", handleProvider);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    // 检查传统钱包（仅作为后备方案）
    if (typeof window.ethereum !== "undefined") {
      // 检查 MetaMask
      if (window.ethereum.isMetaMask && !window.ethereum.isTrust) {
        setWallets((prev) => {
          const newWallets = [...prev];
          const metaMaskWallet = newWallets.find((w) => w.name === "MetaMask");
          if (metaMaskWallet) {
            metaMaskWallet.installed = true;
            metaMaskWallet.provider = window.ethereum;
          }
          return newWallets;
        });
      }

      // 检查 Trust Wallet
      // @ts-ignore
      if (window.ethereum.isTrust) {
        setWallets((prev) => {
          const newWallets = [...prev];
          const trustWallet = newWallets.find((w) => w.name === "Trust Wallet");
          if (trustWallet) {
            trustWallet.installed = true;
            trustWallet.provider = window.ethereum;
          }
          return newWallets;
        });
      }
    }

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleProvider);
    };
  }, []);

  return (
    <>
      {wallets.map((wallet, index) => (
        <div
          className={styles.wallet}
          key={index}
          onClick={() => handleOk(wallet)}
        >
          <img src={wallet.icon} className={styles.icon} />
          <div className={styles.walletInfo}>
            <div className={styles.name}>{wallet.name}</div>
            {wallet.installed && <div className={styles.installed}>已安装</div>}
          </div>
        </div>
      ))}
    </>
  );
};

export default Component;
