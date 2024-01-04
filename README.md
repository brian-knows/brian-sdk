# @brian/sdk

<div style="display:flex; flex-direction:column; align-items:center; justify-content:center;">
    <img src="https://www.brianknows.org/brian_logo.png" height="200px" />
</div>

Welcome to the official repository for the [**Brian**](https://brianknows.org) Typescript SDK.

## 📦 Installation

The Brian SDK is available as an [npm package](https://www.npmjs.com/package/@brian/sdk). In order to add it to your project, you need to run one of the following commands:

```bash
# Using npm
npm install @brian/sdk

# Using yarn
yarn add @brian/sdk

# Using pnpm
pnpm add @brian/sdk

# Using bun
bun add @brian/sdk
```

## ⚒️ Usage

Once you have it installed in your project, you just need to import it and instantiate a new `BrianSDK` object:

```typescript
// Using ES6 imports
import { BrianSDK } from "@brian/sdk";

const options = {
  apiKey: process.env.BRIAN_API_KEY,
};

const brian = new BrianSDK(options);

// Using CommonJS imports
const { BrianSDK } = require("@brian/sdk");

const brian = new BrianSDK(options);
```

### ⚙️ SDK initialization options

The `BrianSDK` constructor accepts an object with the following properties:

| Property     | Type   | Description                                                                                                                                                                        | Required |
| ------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `apiUrl`     | string | The API url you'll be calling. Default is `https://api.brianknows.org` for EU based projects. YOu can change it with `https://us-api.brianknows.org` for better latency in the US. | ❌       |
| `apiKey`     | string | The API key used to call the Brian APIs.                                                                                                                                           | ✅       |
| `apiVersion` | `v0`   | The API version. Only `v0` is available right now.                                                                                                                                 | ❌       |

### 📚 SDK methods

The `BrianSDK` object exposes the following methods:

| Method name    | Description                                                                                                                              |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `ask`          | Calls the Brian API `/agent/knowledge` method. Returns an AI-generated for the given prompt.                                             |
| `extract`      | Calls the Brian API `/agent/parameters-extraction` method. Returns the extracted parameters from the given prompt                        |
| `generateCode` | Calls the Brian API `/agent/smart-contracts` method. Returns an AI-generated Solidity Smart Contract based on the prompt.                |
| `transact`     | Calls the Brian API `/agent/transaction` method. Returns one or more transactions ready to be executed, generated from the given prompt. |

### 📖 Examples

Check the `tests/index.tests.ts` file to see some examples on how to use the SDK.

## 🤝 Changelog

Check the [CHANGELOG](/CHANGELOG.md) for the latests changes in the SDK.

## 🛡️ License

This project is licensed under the terms of the `MIT` license. See [LICENSE](/LICENSE) for more details.

## ‼️ Disclaimer

_This code is being provided as is. No guarantee, representation or warranty is being made, express or implied, as to the safety or correctness of the code. It has not been audited and as such there can be no assurance it will work as intended, and users may experience delays, failures, errors, omissions or loss of transmitted information. Nothing in this repo should be construed as investment advice or legal advice for any particular facts or circumstances and is not meant to replace competent counsel. It is strongly advised for you to contact a reputable attorney in your jurisdiction for any questions or concerns with respect thereto. Brian is not liable for any use of the foregoing, and users should proceed with caution and use at their own risk._
