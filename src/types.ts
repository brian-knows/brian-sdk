/**
 * @dev Extracted action.
 */
type Action =
  | "swap"
  | "transfer"
  | "bridge"
  | "balance"
  | "wrap native"
  | "unwrap native"
  | "totalsupply"
  | "approve"
  | "deposit"
  | "stake on Lido"
  | "withdraw"
  | "ENS Forward Resolution"
  | "ENS Reverse Resolution"
  | "ENS Availability"
  | "ENS Expiration"
  | "ENS Registration Cost"
  | "ENS Renewal Cost"
  | "ENS Registration"
  | "ENS Renewal"
  | "AAVE Borrow"
  | "AAVE Repay"
  | "Aave User Data"
  | "Find protocol";

/**
 * @dev Brian chat message type.
 * @property {"user" | "brian"} sender - The sender of the message.
 * @property {string} content - The content of the message.
 */
export type Message = {
  sender: "user" | "brian";
  content: string;
};

/**
 * @dev Token type.
 * @property {string} address - The address of the token.
 * @property {number} chainId - The chain ID of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The decimals of the token.
 * @property {string} name - The name of the token.
 * @property {string} coinKey - The coin key of the token.
 * @property {string} logoURI - The logo URI of the token.
 * @property {string} priceUSD - The price of the token in USD.
 */
export type Token = {
  address: `0x${string}`;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey?: string;
  logoURI?: string;
  priceUSD?: string;
};

/**
 * @dev Brian SDK options type.
 * @property {string} apiUrl - The API URL for the Brian API.
 * @property {string} apiKey - The API Key for the Brian API.
 * @property {string} apiVersion - The API Version for the Brian API.
 */
export type BrianSDKOptions = {
  apiUrl?: string;
  apiKey: string;
  apiVersion?: "v0";
};

type PromptRequestBody = {
  prompt: string;
};

/**
 * @dev Request body sent to /agent/knowledge.
 * @property {string} prompt - The prompt to send to the Brian API.
 * @property {string} kb - The knowledge base to use for the prompt.
 */
export type AskRequestBody = PromptRequestBody & {
  kb: string;
};

/**
 * @dev Response body received from /agent/knowledge.
 * @property {AskResult} result - The result from the Brian API.
 */
export type AskResponse = {
  result: AskResult;
};

/**
 * @dev The result from the Brian API.
 * @property {string} answer - AI-generated text.
 * @property {string} input - The input prompt.
 * @property {SourceDocument[]} context - The source documents used to generate the text.
 */
export type AskResult = {
  answer: string;
  input: string;
  context: SourceDocument[];
};

/**
 * @dev The source document used to generate the text.
 * @property {string} pageContent - The page content of the source document.
 * @property {SourceDocumentMetadata} metadata - The metadata of the source document.
 */
export type SourceDocument = {
  pageContent: string;
  metadata: SourceDocumentMetadata;
};

/**
 * @dev The metadata of the source document.
 * @property {string} description - The description of the document.
 * @property {string} language - The language of the document.
 * @property {string} source - The source of the document.
 * @property {string} title - The title of the document.
 */
export type SourceDocumentMetadata = {
  description: string;
  language: string;
  source: string;
  title: string;
};

/**
 * @dev Request body sent to /agent/parameters-extraction.
 * @property {string} prompt - The prompt to send to the Brian API.
 */
export type ExtractParametersRequestBody = PromptRequestBody;

/**
 * @dev Response body received from /agent/parameters-extraction.
 * @property {ExtractParametersResult} result - The result from the Brian API.
 */
export type ExtractParametersResponse = {
  result: ExtractParametersResult;
};

/**
 * @dev The result from the Brian API.
 * @property {string} prompt - The prompt that was send to the API.
 * @property {Completion[]} completion - The completion or array of completions from the Brian API.
 */
export type ExtractParametersResult = {
  prompt: string;
  completion: Completion[];
};

/**
 * @dev Completion from the Brian API.
 * @property {Action} action - The action extracted from the prompt.
 * @property {string} token1 - The first token extracted from the prompt.
 * @property {string} token2 - The second token extracted from the prompt.
 * @property {string} chain - The chain extracted from the prompt.
 * @property {string} address - The address extracted from the prompt.
 * @property {string} amount - The amount extracted from the prompt.
 * @property {string} dest_chain - The destination chain extracted from the prompt.
 */
export type Completion = {
  action: Action;
  token1?: string;
  token2?: string;
  chain?: string;
  address?: string;
  amount?: string;
  dest_chain?: string;
};

/**
 * @dev Request body sent to /agent/smart-contracts.
 */
export type GenerateCodeRequestBody = PromptRequestBody & {
  context?: ContextMessage[];
  compile?: boolean;
};

/**
 * @dev Response body received from /agent/smart-contracts.
 * @property {string} result - The result from the Brian API.
 */
export type GenerateCodeResponse = {
  result: string;
  abi: any;
  bytecode: `0x${string}`;
};

/**
 * @dev Request body sent to /agent/transaction.
 * @property {string} prompt - The prompt to send to the Brian API.
 * @property {string} address - The address to send the transaction from.
 * @property {`${number}`} chainId - The chain ID to send the transaction from (optional).
 */
export type TransactionRequestBody = PromptRequestBody & {
  address: string;
  chainId?: `${number}`;
};

/**
 * @dev Response body received from /agent/transaction.
 * @property {TransactionResult[]} result - The results from the Brian API.
 */
export type TransactionResponse = {
  result: TransactionResult[];
};

export type TransactionResult = {
  type: "read" | "write";
  action: Action;
  data: TransactionData;
  solver: string;
};

/**
 * @dev Transaction data.
 * @property {TransactionStep[]} steps - The steps of the transaction.
 * @property {string} description - The description of the transaction.
 * @property {number} fromChainId - The chain ID to send the transaction from.
 * @property {string} fromAmount - The amount to send from the transaction.
 * @property {Token} fromToken - The token to send from the transaction.
 * @property {string} fromAddress - The address to send from the transaction.
 * @property {number} toChainId - The chain ID to send the transaction to.
 * @property {string} toAmount - The amount to send to the transaction.
 * @property {string} toAmountMin - The minimum amount to send to the transaction.
 * @property {Token} toToken - The token to send to the transaction.
 * @property {string} toAddress - The address to send to the transaction.
 */
export type TransactionData = {
  description: string;
  steps?: TransactionStep[];
  fromChainId?: number;
  fromAmount?: `${number}`;
  fromToken?: Token;
  fromAddress?: `0x${string}`;
  toChainId?: number;
  toAmount?: `${number}`;
  toAmountMin?: `${number}`;
  toToken?: Token;
  toAddress?: `0x${string}`;
};

/**
 * @dev Transaction step.
 * @property {number} chainId - The chain ID of the transaction step.
 * @property {number} blockNumber - The block number of the transaction step.
 * @property {string} from - The from address of the transaction step.
 * @property {string} to - The to address of the transaction step.
 * @property {string} value - The value of the transaction step.
 * @property {string} data - The data of the transaction step.
 */
export type TransactionStep = {
  chainId: number;
  blockNumber?: number;
  from: `0x${string}`;
  to: `0x${string}`;
  value: `${number}`;
  data: `0x${string}`;
};

/**
 * @dev Request body sent to /utils/explain.
 * @property {string} prompt - The prompt to send to the Brian API.
 */
export type ExplainRequestBody = PromptRequestBody;

/**
 * @dev Response body received from /utils/explain.
 * @property {string | null} result - The result from the Brian API.
 */
export type ExplainResponse = {
  result: string | null;
};

/**
 * @dev Request body sent to /utils/compile.
 * @property {string} prompt - The prompt to send to the Brian API.
 * @property {string} contractName - The name of the contract to compile.
 */
export type CompileRequestBody = PromptRequestBody & {
  contractName: string;
};

/**
 * @dev Response body received from /utils/compile.
 * @property {any} abi - The ABI of the contract.
 * @property {string} bytecode - The bytecode of the contract.
 * @property {string} fileName - The file name of the contract.
 */
export type CompileResponse = {
  abi: any;
  bytecode: `0x${string}`;
  fileName: string;
};

/**
 * @dev Context message type.
 * @property {"user" | "agent" | "system"} role - The role of the message.
 * @property {string} content - The content of the message.
 */
export type ContextMessage = {
  role: "user" | "agent" | "system";
  content: string;
};

/**
 * @dev Knowledge base type.
 * @property {number} id - The ID of the knowledge base.
 * @property {string} name - The name of the knowledge base.
 * @property {string} description - The description of the knowledge base.
 * @property {string} slug - The slug of the knowledge base.
 * @property {string} createdAt - The creation date of the knowledge base.
 * @property {KnowledgeBaseResource[]} resources - The resources of the knowledge base.
 */
export type KnowledgeBase = {
  id: number;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  resources: KnowledgeBaseResource[];
};

/**
 * @dev Request body sent to /knowledge-bases.
 * @property {string} name - The name of the knowledge base.
 * @property {string} description - The description of the knowledge base.
 */
export type CreateKnowledgeBaseBody = {
  name: string;
  description: string;
};

/**
 * @dev Response body received from /knowledge-bases.
 * @property {KnowledgeBase} result - The result from the Brian API.
 */
export type CreateKnowledgeBaseResponse = {
  result: KnowledgeBase;
};

/**
 * @dev Knowledge base resource type.
 * @property {number} id - The ID of the knowledge base resource.
 * @property {string} name - The name of the knowledge base resource.
 * @property {number} size - The size of the knowledge base resource.
 * @property {number} knowledgeBaseId - The ID of the knowledge base.
 * @property {string} createdAt - The creation date of the knowledge base resource.
 */
export type KnowledgeBaseResource = {
  id: number;
  name: string;
  size: number;
  knowledgeBaseId: number;
  createdAt: string;
};

/**
 * @dev Response body received from /knowledge-bases.
 * @property {KnowledgeBase[]} result - The result from the Brian API.
 */
export type GetKnowledgeBasesResponse = {
  result: KnowledgeBase[];
};

/**
 * @dev Response body received from /knowledge-bases/:id.
 * @property {KnowledgeBase} result - The result from the Brian API.
 */
export type GetKnowledgeBaseResponse = {
  result: KnowledgeBase;
};

/**
 * @dev Request body sent to /knowledge-bases/:id/resources.
 * @property {"ok"} result - Result of the deletion operation.
 */
export type DeleteKnowledgeBoxResponse = {
  result: "ok";
};

/**
 * @dev Request body sent to /knowledge-bases/:id/resources.
 * @property {string} name - The name of the knowledge base resource.
 * @property {string} content - The content of the knowledge base resource.
 * @property {string} source - The source of the knowledge base resource.
 */
export type CreateKnowledgeBaseResourceBody = {
  name: string;
  content: string;
  source: string;
};

/**
 * @dev Network currency type.
 * @property {string} name - The name of the network currency.
 * @property {string} symbol - The symbol of the network currency.
 * @property {number} decimals - The decimals of the network currency.
 */
export type NetworkCurrency = {
  name: string;
  symbol: string;
  decimals: number;
};

/**
 * @dev Network object.
 * @property {number} id - The ID of the network.
 * @property {string} name - The name of the network.
 * @property {NetworkCurrency} nativeCurrency - The native currency of the network.
 */
export type Network = {
  id: number;
  name: string;
  nativeCurrency: NetworkCurrency;
};

/**
 * @dev Response body received from /utils/networks.
 * @property {Network[]} result - The result from the Brian API.
 */
export type NetworksResponse = {
  result: Network[];
};

/**
 * @dev Request body sent to /agent.
 * @property {string} prompt - The prompt to send to the Brian API.
 * @property {string} address - The address to send the transaction from.
 * @property {string} chainId - The chain ID to send the transaction from.
 * @property {Message[]} messages - The chat context.
 */
export type ChatRequestBody = TransactionRequestBody & {
  messages: Message[];
};

/**
 * @dev Response body received from /agent in case of error.
 * @property {string} error - The error message.
 */
export type ChatMissingParameterResponse = {
  error: string;
};

/** @dev Chat response type. */
export type ChatResponse = TransactionResponse | AskResponse;
