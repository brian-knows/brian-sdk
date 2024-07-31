import ky from "ky";
import {
  BadRequestError,
  InternalServerError,
  RateLimitError,
  SDKInitializationError,
} from "./errors";
import {
  AskRequestBody,
  AskResponse,
  AskResult,
  BrianSDKOptions,
  CompileRequestBody,
  CompileResponse,
  ExplainRequestBody,
  ExplainResponse,
  ExtractParametersRequestBody,
  ExtractParametersResponse,
  ExtractParametersResult,
  GenerateCodeRequestBody,
  GenerateCodeResponse,
  Network,
  NetworksResponse,
  TransactionRequestBody,
  TransactionResponse,
  TransactionResult,
} from "./types";
import { BrianKnowledgeBaseSDK } from "./knowledge-bases";

/**
 * @dev BrianSDK is the main class for interacting with the Brian API.
 */
export class BrianSDK {
  private apiUrl: string;
  private apiVersion: string;
  private options: {
    headers: {
      accept: "application/json";
      "Content-Type": "application/json";
      "x-brian-api-key": string;
    };
    timeout: number;
    throwHttpErrors: boolean;
  };
  kb: BrianKnowledgeBaseSDK;

  /**
   * @dev The constructor for the BrianSDK class.
   * @param {BrianSDKOptions} options - The options for initializing SDK.
   */
  constructor({
    apiUrl = "https://api.brianknows.org",
    apiKey,
    apiVersion,
  }: BrianSDKOptions) {
    this.apiUrl = apiUrl;
    if (!apiKey || !apiKey.startsWith("brian_")) {
      throw new SDKInitializationError({
        message: `Invalid API Key: ${apiKey}`,
      });
    }
    this.options = {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "x-brian-api-key": apiKey,
      },
      throwHttpErrors: false,
      timeout: 30000,
    };
    this.apiVersion = apiVersion || "v0";
    this.kb = new BrianKnowledgeBaseSDK({ apiUrl, apiKey, apiVersion });
  }

  /**
   * @dev Asks the Brian API a question about documents or links.
   * @param {AskRequestBody} body - The request body sent to the Brian API.
   * @returns {Promise<AskResult>} The result from the Brian API.
   */
  async ask(body: AskRequestBody): Promise<AskResult> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/agent/knowledge`,
      {
        body: JSON.stringify({
          ...body,
        }),
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<AskResponse>();
    return result;
  }

  /**
   * @dev Extracts parameters from a given text.
   * @param {ExtractParametersRequestBody} body - The request body sent to the Brian API.
   * @returns {Promise<ExtractParametersResult>} The result from the Brian API.
   */
  async extract(
    body: ExtractParametersRequestBody
  ): Promise<ExtractParametersResult> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/agent/parameters-extraction`,
      {
        body: JSON.stringify({
          ...body,
        }),
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<ExtractParametersResponse>();
    return result;
  }

  /**
   * @dev Generates code from a given text.
   * @param {GenerateCodeRequestBody} body - The request body sent to the Brian API.
   * @param {boolean} removeMarkdown - Whether to remove markdown from the generated code.
   * @returns {Promise<string>} The result from the Brian API.
   */
  async generateCode(
    body: GenerateCodeRequestBody,
    removeMarkdown: boolean = true
  ): Promise<string> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/agent/smart-contracts`,
      {
        body: JSON.stringify({
          ...body,
        }),
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<GenerateCodeResponse>();
    if (removeMarkdown) {
      return result.replaceAll("```solidity", "").replaceAll("```", "");
    }
    return result;
  }

  /**
   * @dev Asks Brian to build one or more transactions.
   * @param {TransactionRequestBody} body - The request body sent to the Brian API.
   * @returns {TransactionResult[]} The result from the Brian API.
   */
  async transact(body: TransactionRequestBody): Promise<TransactionResult[]> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/agent/transaction`,
      {
        body: JSON.stringify({
          ...body,
        }),
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<TransactionResponse>();
    return result;
  }

  /**
   * @dev Compiles a given code.
   * @param {CompileRequestBody} body - The request body sent to the Brian API.
   * @returns {CompileResponse} The result from the Brian API.
   */
  async compile(body: CompileRequestBody): Promise<CompileResponse> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/utils/compile`,
      {
        body: JSON.stringify({
          ...body,
        }),
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    return await response.json<CompileResponse>();
  }

  /**
   * @dev Explains a given code.
   * @param {ExplainRequestBody} body - The request body sent to the Brian API.
   * @returns {string | null} The result from the Brian API.
   */
  async explain(body: ExplainRequestBody): Promise<string | null> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/utils/explain`,
      {
        body: JSON.stringify({
          ...body,
        }),
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<ExplainResponse>();
    return result;
  }

  /**
   * @dev Returns all the networks supported by the Brian API.
   * @returns {Network[]} array of networks supported by the Brian API.
   */
  async getNetworks(): Promise<Network[]> {
    const response = await ky.get(
      `${this.apiUrl}/api/${this.apiVersion}/utils/networks`,
      {
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 400) {
        throw new BadRequestError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }

    const { result } = await response.json<NetworksResponse>();
    return result;
  }
}
