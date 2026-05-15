# Utils 工具方法

在 `ethers.js` v6 版本中，提供了许多实用工具方法（utility functions），用于处理以太坊相关的数据，例如单位转换、地址验证、数据编码等。类似于 `parseEther` 的工具方法主要集中在单位转换、格式化、编码和验证等方面，这些方法通常位于 `ethers.utils` 模块（在 v6 中，`utils` 模块被直接整合到 `ethers` 命名空间下）。以下是对 `ethers.js` v6 中类似 `parseEther` 的工具方法的详细讲解，包括分类、功能描述和代码示例。

# 格式化

## parseUnits

将以太币（ETH）的字符串表示转换为小单位。

`parseUnits(value: string, unit?: string | Numeric): bigint`

- `value`: 要转换的字符串表示的以太币数量。
- `unit`: 要转换的单位，可以是字符串（如 `"wei"`、`"gwei"` 等）或数字（表示单位位数）。

常见单位：

- `wei`：以太坊的最小单位。
  - 换算：1 Ether = 10^18 wei（即 1,000,000,000,000,000,000 wei）。
- `kwei`：Kwei 是以太坊的次小单位，等于 **1,000** wei。
  - 换算：1 Ether = 10^15 Kwei。
- `mwei`：Mwei 是更大的单位，等于 **1,000,000** wei（10^6 wei）。
  - 换算：1 Ether = 10^12 Mwei。
- `gwei`：Gwei 是以太坊中非常常用的单位，主要用于 Gas 费用，等于 10^9 wei（**1,000,000,000** wei）。
  - 换算：1 Ether = 10^9 Gwei。
- `szabo`：Szabo 等于 10^12 wei（**1,000,000,000,000** wei）。
  - 换算：1 Ether = 10^6 Szabo。
- `finney`：Finney 等于 10^15 wei（**1,000,000,000,000,000** wei）。
  - 换算：1 Ether = 10^3 Finney。
- `ether`：Ether 是以太坊的主要货币单位，等于 10^18 wei。
  - 换算：1 Ether = 10^18 wei = 10^9 Gwei = 10^6 Szabo = 10^3 Finney。

```js
// 将 1.5 ETH 转换为 gwei 单位
const value = ethers.parseUnits("1.5", "gwei");
// 1500000000n

const value = ethers.parseUnits("1.5", 9);
// 1500000000n
```

import ParseUnits from "./ParseUnits";

<ParseUnits />

## parseEther

将 `ETH` 单位转换为 `wei` 单位。

- `功能`：将以太币（ETH）的字符串表示转换为以 wei 为单位的 Bigint。
- `参数`：`value`（字符串，表示 ETH 数量，例如 "1.5"）。
- `返回值`：`Bigint`，表示 wei 单位的数量（1 ETH = 10^18 wei）。

该方法是语法糖，实际上调用 `parseUnits(value, 18)`。

```js
const value = ethers.parseEther("1.5");
// 1500000000000000000n
```

import ParseEther from "./ParseEther";

<ParseEther />

## formatUnits

`parseUnits` 的相反操作，将以最小单位为单位的 `bigint` 转换为指定小数位数的`字符串`。

`formatUnits(value: BigNumberish, unit?: string | Numeric): string`

- `value`: 要转换的 `bigint` 表示的以太币数量。
- `unit`: 默认 `18`，要转换的单位，可以是字符串（如 "wei"、"gwei" 等）或数字（表示单位位数）。

```js
const value = ethers.formatUnits(1500000000000000000n);
const value = ethers.formatUnits(1500000000000000000n, 18);
// 1.5
```

import FormatUnits from "./FormatUnits";

<FormatUnits />

## formatEther

将 `wei` 单位转换为 `ETH` 单位。

是一个语法糖，实际上调用 `formatUnits(value, 18)`

```js
const value = ethers.formatEther(1500000000000000000n);
// 1.5
```

import FormatEther from "./FormatEther";

<FormatEther />

# 判断

## isAddress

检查字符串是否为有效的以太坊地址。

```js
ethers.isAddress("0x2cFC43B94126595E8B636fed9fB585fF220Bc97d"); // true
ethers.isAddress("0x"); // false
```

import IsAddress from "./IsAddress";

<IsAddress />

## isError

`isError` 的主要用途是帮助开发者在处理以太坊交易或智能合约交互时，准确识别和处理 `ethers.js` 抛出的特定错误。

`function isError(error, code): boolean`

错误码有以下：

- 通用错误
  - `UNKNOWN_ERROR`：当以太坊无法知道潜在问题是什么情况时抛出。
  - `NOT_IMPLEMENTED`：此错误主要用作未来功能的存根，但目前尚未实现。
  - `UNSUPPORTED_OPERATION`：此错误表示不支持尝试的操作，可能包括从不支持功能的特定 JSON-RPC 端点到禁止操作的对象的特定配置。
  - `NETWORK_ERROR`：此错误表示连接到网络时出现问题。
  - `SERVER_ERROR`：此错误表示从服务器获取资源时出现问题。
  - `TIMEOUT`：此错误表示超时时间已过，操作已被隐式取消。
  - `BAD_DATA`：此错误表示无法正确解释提供的数据集。
  - `CANCELLED`：此错误表示操作被程序调用取消，例如`“cancel（）”`。
- 操作错误
  - `BUFFER_OVERRUN`：此错误表示有人试图读取受保护数据的边界之外的数据。
  - `NUMERIC_FAULT`：此错误表示发生了可能导致错误算术输出的操作。
- 参数错误
  - `INVALID_ARGUMENT`：此错误表示传递给函数或方法的类型或值不正确。
  - `MISSING_ARGUMENT`：此错误表示提供的参数太少。
  - `UNEXPECTED_ARGUMENT`：此错误表示提供的参数太多。
- 块链错误
  - `CALL_EXCEPTION`：此错误表示交易已恢复。
  - `INSUFFICIENT_FUNDS`：发送账户的资金不足以支付全部交易成本。
  - `NONCE_EXPIRED`：发送帐户已在已包含的交易中使用了此随机数。
  - `REPLACEMENT_UNDERPRICED`：试图替换一个事务，但额外费用不足以从内存池中删除旧事务。
  - `TRANSACTION_REPLACED`：一笔待处理的交易被另一笔交易所取代。
  - `UNCONFIGURED_NAME`：此错误表示使用了 ENS 名称，但尚未配置该名称。
  - `OFFCHAIN_FAULT`：CCIP 读取异常，无法从中恢复或进一步处理。
- 用户接口错误
  - `ACTION_REJECTED`：此错误表示用户拒绝了请求。

```js
try {
  const provider = new ethers.JsonRpcProvider("");
  await provider.getBalance("0x");
} catch (error: any) {
  // 返回 true, ethers.js 抛出的错误
  if (ethers.isError(error, "UNSUPPORTED_OPERATION")) {
    // code...
  }
}


try {
  await fetch('https://api.example.com/data')
} catch (error: any) {
  // 同样抛出错误，但不是 ethers.js 抛出的错误
}
```

## isHexString

`function isHexString(value: any, length?: number): boolean;` 函数用于判断一个值是否为有效的十六进制字符串。

- 类型检查：输入值必须是一个字符串。
- 前缀检查：字符串必须以 "0x" 开头。
- 字符检查：紧跟 "0x" 之后的所有字符必须是有效的十六进制字符（即 `0-9` 和 `a-f`，不区分大小写）。
- 长度检查 (可选)：可以额外指定一个期望的字节长度。如果指定了长度，`isHexString` 还会检查字符串（去掉 `"0x"` 前缀后）的长度是否是期望字节长度的两倍。这是因为一个字节由两个十六进制字符表示。

```js
// 有效的十六进制地址
console.log(isHexString("0x742d35Cc6634C0532925a3b844Bc454e4438f44e")); // true

// 有效的十六进制地址，并指定正确的字节长度 (地址是20字节)
console.log(isHexString("0x742d35Cc6634C0532925a3b844Bc454e4438f44e", 20)); // true

// 有效的十六进制字符串 (短)
console.log(isHexString("0x123aF")); // true

// 有效的十六进制字符串，并指定正确的字节长度
console.log(isHexString("0x123aFf", 3)); // true (3字节 = 6个十六进制字符)

// 无 "0x" 前缀
console.log(isHexString("742d35Cc6634C0532925a3b844Bc454e4438f44e")); // false

// 包含无效字符
console.log(isHexString("0x123GHI")); // false (G, H, I 不是有效的十六进制字符)

// 长度不匹配 (期望20字节，实际不是)
console.log(isHexString("0x123456", 20)); // false

// 奇数长度的十六进制字符 (不指定长度时是允许的，只要字符有效)
console.log(isHexString("0x123")); // true (因为 '1', '2', '3' 都是有效十六进制字符)

// 奇数长度的十六进制字符，但指定了字节长度，则会因长度不匹配而失败
console.log(isHexString("0x123", 2)); // false (期望2字节即4个字符，实际3个字符)

// 非字符串输入
console.log(isHexString(123)); // false
console.log(isHexString(null)); // false
console.log(isHexString(undefined)); // false
```

在以太坊开发中，十六进制字符串被广泛用于表示各种数据，例如：

- `地址 (Address)`：例如 `0x2cFC43B94126595E8B636fed9fB585fF220Bc97d`
- `交易哈希 (Transaction Hash)`：例如 `0x86e02b444996402090920b38bbccfcdea27f6bc9921a3d4b841c25bfe64581ce`
- `私钥 (Private Key)`：虽然不常直接在前端操作，但其原始形式也是十六进制。
- `字节码 (Bytecode)`：合约编译后的代码。
- `数据 (Data)`：例如在调用合约方法时传递的参数。

import IsHexString from "./IsHexString";

<IsHexString />

# 哈希与加密

## keccak256

`keccak256` 是一个非常核心的加密函数，用于计算 `Keccak-256` 哈希值（与以太坊中常说的 `SHA3` 相同，但略有区别）。这个函数在以太坊的智能合约开发、签名、地址生成等场景中都非常常见。

`function keccak256(data: string | Uint8Array): string`

- 字符串：如果你传的是字符串，务必要用 `toUtf8Bytes()` 来转换成字节流。
- Uint8Array：如果你传的是字节流，那么就直接传。

```js
import { keccak256, toUtf8Bytes } from "ethers";

const value = keccak256(toUtf8Bytes("Hello World"));
console.log(value); // 0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba

const value2 = keccak256(new Uint8Array([0x13, 0x37]));
console.log(value2); // 0x2636a8beb2c41b8ccafa9a55a5a5e333892a83b491df3a67d2768946a9f9c6dc
```

import Keccak256 from "./Keccak256";

<Keccak256 />

## id

这是一个语法糖，实际上调用 `keccak256(value)`

```js
import { id } from "ethers";

const value = id("Hello World");
console.log(value); // 0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba

// 等价于
import { keccak256, toUtf8Bytes } from "ethers";
const value = keccak256(toUtf8Bytes("Hello World"));
console.log(value); // 0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba
```

import Id from "./Id";

<Id />

## sha256

SHA-256（Secure Hash Algorithm 256-bit）是由美国国家安全局（NSA）设计的加密哈希函数，它是 SHA-2 系列的一部分，被广泛应用于区块链（特别是 比特币）、安全通信、数字签名等场景。

`function sha256(data: string | Uint8Array): string`

- 输入：任意长度的数据
- 输出：固定长度 256 位（32 字节）的哈希值
- 特点：不可逆、防碰撞、敏感性强（即一点输入变化，哈希变化巨大）

```js
import { sha256, toUtf8Bytes } from "ethers";

// 如果传入的是字符串，必须使用 toUtf8Bytes 转换为 Uint8Array
const value = sha256(toUtf8Bytes("Hello World"));
console.log(value); // 0xa591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e

const value2 = sha256(new Uint8Array([0x13, 0x37]));
console.log(value2); // 0x158760c856e5ea1ba97e2e2a456736c4bf30d964559afa6d748cf05694a636ff
```

import Sha256 from "./Sha256";

<Sha256 />

# 数据编码/解码

## encodeBase64

encodeBase64 是一个用于将字节数据编码成 Base64 字符串的工具函数。Base64 编码是一种将二进制数据转换成 ASCII 字符串的方式，常用于在文本格式（如 JSON、URL、HTML）中传输或存储二进制数据（如图片、密钥、哈希、签名等）。

`function encodeBase64(data: string | Uint8Array): string`

```js
import { encodeBase64, toUtf8Bytes } from "ethers";

const value = encodeBase64(toUtf8Bytes("Hello World"));
console.log(value); // SGVsbG8gV29ybGQ=

const value2 = encodeBase64(new Uint8Array([0x13, 0x37]));
console.log(value2); // Ezc=
```

import EncodeBase64 from "./EncodeBase64";

<EncodeBase64 />

## decodeBase64

与 `encodeBase64` 相反，用于解码 base64

`function decodeBase64(value: string): Uint8Array`

```js
import { decodeBase64 } from "ethers";

const value = decodeBase64("SGVsbG8gV29ybGQ=");
console.log(value);
// Uint8Array(11) [72, 101, 108, 108, 111,  32,  87, 111, 114, 108, 100]
```

import DecodeBase64 from "./DecodeBase64";

<DecodeBase64 />

## getBytes

`getBytes` 函数的主要功能是将输入的十六进制字符串等数据转换为标准化的 `Uint8Array` 格式。`Uint8Array` 是一种 JavaScript 类型化数组，表示 8 位无符号整数数组，常用于处理二进制数据或字节数据。在以太坊开发中，字节数据广泛用于处理交易、签名、哈希、编码等操作，因此 `getBytes` 是一个非常核心的工具函数。

`function getBytes(value: BytesLike, name?: string): Uint8Array`

- `value`：要转换的输入数据，可以是十六进制字符串、Uint8Array。
- `name`：可选，默认 `value`, 用于错误消息。

```js
import { getBytes } from "ethers";

const value = getBytes("0x2cFC43B94126595E8B636fed9fB585fF220Bc97d");
console.log(value);
// Uint8Array(20) [44, 252,67,185,65,38,89,94,139,99,111,237,159,181,133,255,34,11,201, 125]

const value2 = getBytes(new Uint8Array([0x13, 0x37]));
console.log(value2); // Uint8Array(2) [19, 55]

try {
  getBytes("gg", "hello");
} catch (error: any) {
  console.log(error.argument); // hello
}
```

import GetBytes from "./GetBytes";

<GetBytes />

## toUtf8Bytes

`toUtf8Bytes` 是一个实用函数，用于将字符串（通常是 `Unicode` 字符串）转换为 UTF-8 编码的字节数组（`Uint8Array`）。这个函数在处理以太坊相关的数据时非常有用，因为以太坊智能合约和区块链数据通常需要以字节形式操作，而字符串在 JavaScript 中通常是 `Unicode` 格式。

`function toUtf8Bytes(str: string, form?: UnicodeNormalizationForm): Uint8Array;`

- `str`：要转换的字符串。
- `form`：可选，指定 `Unicode` 规范化形式, `"NFC"` |` "NFD"` | `"NFKC"` | `"NFKD"`。
  - 使用 `String.prototype.normalize()` 函数将字符串转换为指定的 `Unicode` 规范化形式。[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/normalize)

```js
import { toUtf8Bytes } from "ethers";

const value = toUtf8Bytes("hello world");
console.log(value);
// Uint8Array(11) [104,101,108,108,111,32,119,111,114,108,100]

const value2 = toUtf8Bytes("\u00F1");
const value3 = toUtf8Bytes("\u006E\u0303");
console.log(value2); // Uint8Array(2) [ 195, 177 ]
console.log(value3); // Uint8Array(3) [ 110, 204, 131 ]

// 使用 NFC 规范化，这使得他们相等
console.log(
  toUtf8Bytes("\u00F1", "NFC").toString() ===
    toUtf8Bytes("\u006E\u0303", "NFC").toString(),
); // true
```

import ToUtf8Bytes from "./ToUtf8Bytes";

<ToUtf8Bytes />

## toUtf8String

`toUtf8String` 的主要功能是将给定的字节数据（可以是十六进制字符串、字节数组或 `Uint8Array`）转换为 UTF-8 编码的字符串。它是处理以太坊区块链中编码数据的常用工具，因为许多智能合约的返回值或事件日志以字节形式存储，而这些字节通常表示 UTF-8 编码的字符串。

`function toUtf8String(bytes: BytesLike, onError?: Utf8ErrorFunc): string`

- `bytes`: 字节数据，可以是十六进制字符串、或 `Uint8Array`。
- `onError`: 错误处理函数，分析或恢复无效的 UTF-8 数据，默认为 `undefined`。

```js
import { toUtf8String } from "ethers";

const value = toUtf8String("0x48656c6c6f");
console.log(value);
// hello

const value2 = toUtf8String(new Uint8Array([72, 101, 108, 108, 111]));
console.log(value2);
// hello

// 如果输入的字节数据包含无效的 UTF-8 编码，默认情况下 toUtf8String 会抛出错误。
// 可以通过提供 onError 函数来处理这些错误，例如忽略无效字节或替换为特定字符。
const value3 = toUtf8String(
  new Uint8Array([0xff, 0xff, 0x48, 0x65, 0x6c, 0x6c, 0x6f]),
  (reason, offset, bytes, output) => {
    console.log(reason, offset, bytes, output);
    // BAD_PREFIX, 0, Uint8Array(7)[255, 255,72,101,108,108,111], []
    return 1; // 跳过 1 个字节
  },
);
console.log(value3); // 输出: "Hello"（跳过了无效字节）
```

import ToUtf8String from "./ToUtf8String";

<ToUtf8String />

# 随机数与格式化

## randomBytes

`randomBytes`函数的主要作用是生成指定长度的加密安全随机字节数组（`Uint8Array` 类型）。这些随机字节可用于各种需要高随机性和安全性的场景，例如：

- 生成加密密钥：如生成以太坊钱包的私钥。
- 生成随机数种子：用于生成助记词（mnemonic phrases）或其他随机化操作。
- 加密操作：提供随机盐（salt）或初始化向量（IV）以增强加密安全性。
- 去中心化应用（DApp）：在智能合约交互或交易签名中需要随机数据时使用。

`function randomBytes(length: number): Uint8Array`

- `length`：生成指定长度的随机字节数组。

```js
import { randomBytes } from "ethers";

const value = randomBytes(10);
console.log(value);
// 每次执行结果都会不一样
// Uint8Array(10) [4, 199,  59, 204, 6, 199, 123, 137, 143, 155]
```

import RandomBytes from "./RandomBytes";

<RandomBytes />

## hexlify

将输入的数据转换为以 `"0x"` 开头的十六进制字符串，这是以太坊区块链中常用的数据表示格式。十六进制字符串在以太坊中广泛用于表示地址、交易数据、签名、哈希值等。

`function hexlify(data: BytesLike): string`

- `data`：十六进制字符串或`Uint8Array`

```js
import { hexlify } from "ethers";

const value = hexlify("0x592fa7");
console.log(value); // 0x592fa7

const value2 = hexlify(new Uint8Array([89, 47, 167]));
console.log(value2); // 0x592fa7
```

import Hexlify from "./Hexlify";

<Hexlify />

## zeroPadValue

`zeroPadValue` 的主要作用是将输入值转换为固定长度的字节序列（以十六进制字符串形式表示），通过在`左侧`填充零字节`（0x00）`来确保输出长度符合要求。这对于以太坊区块链开发非常重要，因为以太坊的智能合约和协议通常要求输入数据具有特定的字节长度（例如，地址需要 20 字节，某些事件参数需要 32 字节）。

`function zeroPadValue(data: BytesLike, length: number): string`

- `data`: 要填充的字节数据，可以是十六进制字符串或 `Uint8Array`。
- `length`: 目标字节长度（以字节为单位）。输出结果将确保长度为 `length` 字节（即十六进制字符串长度为 `2 * length + 2`，包括 `0x` 前缀）。

```js
import { zeroPadValue } from "ethers";

const value = zeroPadValue("0x592fa7", 10);
console.log(value); // 0x00000000000000592fa7

const value2 = zeroPadValue("0x592fa7", 6);
console.log(value2); // 0x000000592fa7
```

import ZeroPadValue from "./ZeroPadValue";

<ZeroPadValue />

## 总结

本文详细介绍了 ethers.js v6 中常用的工具方法，包括单位转换、地址与数据校验、哈希加密、数据编码解码、随机数生成及格式化等实用函数。这些工具方法极大地简化了以太坊开发中的数据处理、验证和转换流程，让开发者能够更高效、安全地与区块链交互。建议在实际开发中灵活运用这些工具，提升代码的健壮性和可读性。如需深入了解更多细节，可参考官方文档或本教程的 GitHub 示例代码。

本章所有示例代码，均可在 [GitHub](https://github.com/liuzi6612/ethers-tutorial/tree/main/docs/utils) 中找到。
