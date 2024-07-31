import ky from "ky";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
  RateLimitError,
  SDKInitializationError,
} from "../errors";
import {
  BrianSDKOptions,
  CreateKnowledgeBaseBody,
  CreateKnowledgeBaseResponse,
  DeleteKnowledgeBoxResponse,
  GetKnowledgeBaseResponse,
  GetKnowledgeBasesResponse,
  KnowledgeBase,
} from "../types";

/**
 * @dev BrianKnowledgeBaseSDK is the class for interacting with the Brian Knowledge Base API.
 */
export class BrianKnowledgeBaseSDK {
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
  }

  /**
   * @dev Creates a new knowledge base.
   * @param {CreateKnowledgeBaseBody} body - The body for creating a new knowledge base.
   * @returns {Promise<KnowledgeBase>} The created knowledge base.
   */
  async createKnowledgeBase({
    name,
    description,
  }: CreateKnowledgeBaseBody): Promise<KnowledgeBase> {
    const response = await ky.post(
      `${this.apiUrl}/api/${this.apiVersion}/knowledge-bases`,
      {
        body: JSON.stringify({
          name,
          description,
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
    const { result } = await response.json<CreateKnowledgeBaseResponse>();
    return result;
  }

  /**
   * @dev Gets all knowledge bases associated with the given API key.
   * @returns {Promise<KnowledgeBase[]>} The knowledge bases associated with the given API key.
   */
  async getKnowledgeBoxes(): Promise<KnowledgeBase[]> {
    const response = await ky.get(
      `${this.apiUrl}/api/${this.apiVersion}/knowledge-bases`,
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
    const { result } = await response.json<GetKnowledgeBasesResponse>();
    return result;
  }

  /**
   * @dev Gets a knowledge base by its ID.
   * @param {number} kbId - The ID of the knowledge base.
   * @returns {Promise<KnowledgeBase>} The knowledge base with the given ID.
   */
  async getKnowledgeBox(kbId: number): Promise<KnowledgeBase> {
    const response = await ky.get(
      `${this.apiUrl}/api/${this.apiVersion}/knowledge-bases/${kbId}`,
      {
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 404) {
        throw new NotFoundError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<GetKnowledgeBaseResponse>();
    return result;
  }

  /**
   * @dev Deletes a knowledge box by its ID.
   * @param {number} kbId - The ID of the knowledge box.
   * @returns {Promise<string>} "ok" if everything went smoothly.
   */
  async deleteKnowledgeBox(kbId: number): Promise<string> {
    const response = await ky.delete(
      `${this.apiUrl}/api/${this.apiVersion}/knowledge-bases/${kbId}`,
      {
        ...this.options,
      }
    );
    if (!response.ok) {
      const cause = await response.json();
      if (response.status === 404) {
        throw new NotFoundError({ cause });
      }
      if (response.status === 429) {
        throw new RateLimitError({ cause });
      }
      if (response.status === 500) {
        throw new InternalServerError({ cause });
      }
    }
    const { result } = await response.json<DeleteKnowledgeBoxResponse>();
    return result;
  }
}
