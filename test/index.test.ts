import { describe, test, expect } from "@jest/globals";
import {
  BadRequestError,
  BrianSDK,
  SDKInitializationError,
} from "../dist/index.cjs";

const BRIAN_API_KEY = process.env.BRIAN_API_KEY;
const TIMEOUT = 30000;

if (!BRIAN_API_KEY) {
  throw new Error("BRIAN_API_KEY is not set");
}

describe("SDK tests", () => {
  const brian = new BrianSDK({
    apiKey: BRIAN_API_KEY as string,
  });
  /****************************
   * SDK INITIALIZATION TESTS *
   ****************************/
  test("failes to initialize the SDK with a bad API key", () => {
    expect(
      () =>
        new BrianSDK({
          apiKey: "wrong",
        })
    ).toThrow(SDKInitializationError);
  });
  test("failes to initialize the SDK with no API key", () => {
    expect(() => new BrianSDK({ apiKey: "" })).toThrow(SDKInitializationError);
  });
  /*******************
   * ASK BRIAN TESTS *
   *******************/
  describe("POST /agent/knowledge", () => {
    test(
      "asks Brian a question",
      async () => {
        const result = await brian.ask({
          prompt: "What is Uniswap?",
          kb: "public-knowledge-box",
        });
        expect(result.text).not.toBeNull();
        expect(result.sourceDocuments).not.toBeNull();
      },
      TIMEOUT
    );
    test("asks Brian a question with an empty prompt", async () => {
      expect(
        async () => await brian.ask({ prompt: "", kb: "public-knowledge-box" })
      ).rejects.toThrow(BadRequestError);
    });
  });
  /****************************
   * EXTRACT PARAMETERS TESTS *
   ****************************/
  describe("POST /agent/parameters-extraction", () => {
    test(
      "asks Brian to extract parameters from a prompt",
      async () => {
        const prompt = "I want to swap 10 USDC with USDT on Polygon";
        const result = await brian.extract({
          prompt,
        });
        expect(result.prompt).toBe(`${prompt}.`);
        expect(result.completion).not.toBeNull();
        expect(result.completion).toHaveLength(1);
        const [completion] = result.completion;
        expect(completion).not.toBeNull();
        expect(completion.action).toBe("swap");
        expect(completion.amount).toBe("10");
        expect(completion.token1).toBe("USDC");
        expect(completion.token2).toBe("USDT");
        expect(completion.chain).toBe("Polygon");
      },
      TIMEOUT
    );
    test("asks Brian to extract parameters with an empty prompt", async () => {
      expect(async () => await brian.extract({ prompt: "" })).rejects.toThrow(
        BadRequestError
      );
    });
  });
  /************************************
   * SMART CONTRACTS GENERATION TESTS *
   ************************************/
  describe("POST /agent/smart-contracts", () => {
    test(
      "asks Brian to generate an ERC-20 Smart Contract",
      async () => {
        const result = await brian.generateCode({
          prompt: "Give me the code for an ERC-20 Smart Contract",
        });
        expect(result).not.toBeNull();
      },
      TIMEOUT
    );
    test(
      "asks Brian to generate an ERC-20 Smart Contract with markdown format",
      async () => {
        const result = await brian.generateCode(
          {
            prompt: "Give me the code for an ERC-20 Smart Contract",
          },
          false
        );
        expect(result).not.toBeNull();
        expect(result).toContain("```solidity");
      },
      TIMEOUT
    );
    test("asks Brian to generate a Smart Contract with an empty prompt", async () => {
      expect(
        async () => await brian.generateCode({ prompt: "" })
      ).rejects.toThrow(BadRequestError);
    });
  });
});
