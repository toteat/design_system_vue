export type SanitizeTextOptions = {
    allowNewLines?: boolean;
    maxLength?: number;
};
/**
 * Decodes a URL-safe Base64-encoded string.
 *
 * URL-safe Base64 encoding replaces `+` with `-` and `/` with `_`. This function reverses these
 * replacements and adds padding if necessary before decoding the string using the standard Base64
 * decoding method.
 *
 * @param encodedString - The URL-safe Base64-encoded string to decode.
 * @returns The decoded string.
 */
export declare const decodeBase64URLSafe: (encodedString: string) => string;
/**
 * Obfuscates data by encoding it into Base64 and applying a simple XOR transformation.
 *
 * @param data - The data to obfuscate. Can be an object or a string.
 * @returns The obfuscated string.
 */
export declare const obfuscate: (data: object | string) => string;
/**
 * De-obfuscates a previously obfuscated string by reversing the XOR transformation
 * and decoding from Base64. Attempts to parse the decoded string as JSON.
 * @param obfuscated - The obfuscated string to decode.
 * @returns The decoded data, which may be a JSON object or a raw string.
 */
export declare const deobfuscate: (obfuscated: string) => object | string;
export declare const toCamelCase: (str: string) => string;
export declare const transformObjectToCamelCase: <T>(obj: T) => T;
export declare const transformArrayToCamelCase: (arr: string[]) => string[];
export declare const toSnakeCase: (str: string) => string;
export declare const transformObjectToSnakeCase: <T>(obj: T) => T;
export declare const transformArrayToSnakeCase: (arr: string[]) => string[];
export declare const startsWithSpecialChar: (str: string) => boolean;
export declare const capitalize: (text: string) => string;
export declare const isValidEmail: (email: string) => boolean;
export declare const rutPattern: string;
export declare const isValidRut: (rut: string) => boolean;
export declare const formatRUT: (rut: string) => string;
export declare const escapeHtml: (value: string) => string;
/**
 * Sanitizes user-provided text following OWASP recommendations:
 * - Removes control characters and dangerous markup.
 * - Normalizes whitespace to prevent CSS injection via invisible characters.
 * - Escapes HTML entities to ensure the value can be safely rendered inside templates.
 */
export declare const sanitizeTextInput: (input: unknown, options?: SanitizeTextOptions) => string;
