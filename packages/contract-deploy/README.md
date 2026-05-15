## 安装依赖

```bash
$ pnpm i
```

## 设置环境变量

回车后会提示输入，输入后回车即可。

```bash
# 设置钱包密钥
$ npm run setEnv PRIVATE_KEY

# 设置 infura api key
$ npm run setEnv INFURA_API_KEY
```

注册 [infura](https://www.infura.io/zh) 获取 API KEY。

## 修改代币名称

修改 [contracts/Contract.sol](./contracts/Contract.sol)

liuzi6612 是代币名称，xjh 是代币符号， 修改为你的代币名称和符号。

```sol
ERC20("liuzi6612", "xjh")
```

## 编译

```bash
$ npm run compile
```

## 部署合约

```bash
$ npm run deploy:sepolia
```

查看部署合约 `https://sepolia.etherscan.io/token/合约地址`
