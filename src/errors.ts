type ErrorName =
  | "SDKInitializationError"
  | "BadRequestError"
  | "RateLimitError"
  | "InternalServerError"
  | "NotFoundError";

/**
 * @dev Generic class for Brian SDK errors.
 * @property {string} name - The name of the error.
 * @property {string} message - The message of the error.
 * @property {any} cause - The cause of the error.
 */
export class BrianSDKError extends Error {
  name: ErrorName;
  message: string;
  cause: any;

  /**
   * @dev The constructor for the SDKInitializationError class.
   */
  constructor({
    name,
    message,
    cause,
  }: {
    name: ErrorName;
    message: string;
    cause?: any;
  }) {
    super(message);
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}

/**
 * @dev SDKInitializationError is the error thrown when the SDK is not initialized correctly.
 */
export class SDKInitializationError extends BrianSDKError {
  /**
   * @dev The constructor for the RateLimitError class.
   */
  constructor({ cause, message }: { message: string; cause?: any }) {
    super({
      name: "SDKInitializationError",
      message: `Error while initializing SDK: ${message}.`,
      cause,
    });
  }
}

/**
 * @dev BadRequestError is the error thrown when the API receives a bad request.
 */
export class BadRequestError extends BrianSDKError {
  /**
   * @dev The constructor for the BadRequestError class.
   */
  constructor({ cause }: { cause?: any }) {
    super({
      name: "BadRequestError",
      message: "Bad request, check your input body.",
      cause,
    });
  }
}

/**
 * @dev NotFoundError is the error thrown when the API receives a request for a non-existing entity.
 */
export class NotFoundError extends BrianSDKError {
  /**
   * @dev The constructor for the NotFoundError class.
   */
  constructor({ cause }: { cause?: any }) {
    super({
      name: "NotFoundError",
      message: "Requested entity was not found.",
      cause,
    });
  }
}

/**
 * @dev RateLimitError is the error thrown when the API is rate limited.
 */
export class RateLimitError extends BrianSDKError {
  /**
   * @dev The constructor for the RateLimitError class.
   */
  constructor({ cause }: { cause?: any }) {
    super({
      name: "RateLimitError",
      message: "API rate limit exceeded.",
      cause,
    });
  }
}

/**
 * @dev InternalServerError is the error thrown when the API encounters an internal server error.
 */
export class InternalServerError extends BrianSDKError {
  /**
   * @dev The constructor for the InternalServerError class.
   */
  constructor({ cause }: { cause?: any }) {
    super({
      name: "InternalServerError",
      message: "Internal server error.",
      cause,
    });
  }
}
