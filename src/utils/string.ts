const XOR_KEY = 92923; // Simple XOR key for obfuscation
const DANGEROUS_ELEMENT_CONTENT_REGEX =
  /<\s*(script|style|iframe|object|embed)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi;
const DANGEROUS_TAG_REGEX =
  /<\/?\s*(script|style|iframe|object|embed|link|meta)[^>]*>/gi;
const EVENT_HANDLER_ATTRIBUTE_REGEX =
  /\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi;
const DANGEROUS_PROTOCOL_REGEX = /\b(?:javascript|vbscript|data)\s*:/gi;
const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

export type SanitizeTextOptions = {
  allowNewLines?: boolean;
  maxLength?: number;
};

const stripDisallowedControlCharacters = (value: string): string => {
  let result = '';
  for (const char of value) {
    const codePoint = char.codePointAt(0);
    if (codePoint === undefined) {
      break;
    }
    const isDisallowed =
      (codePoint >= 0 && codePoint <= 8) ||
      codePoint === 11 ||
      codePoint === 12 ||
      (codePoint >= 14 && codePoint <= 31) ||
      codePoint === 127;
    if (isDisallowed) {
      continue;
    }
    result += char;
  }
  return result;
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
export const decodeBase64URLSafe = (encodedString: string): string => {
  if (!encodedString) {
    return '';
  }

  // Remove any trailing dashes that might be used as separators
  // Multiple dashes are definitely separators, single dash is also likely a separator
  const cleanedString = encodedString.replace(/-+$/, '');

  // Convert URL-safe Base64 to standard Base64
  let paddedString = cleanedString
    .replaceAll('_', '/')
    .replaceAll('-', '+')
    .replaceAll(' ', '+');

  // Add padding if needed to make length multiple of 4
  const padding = paddedString.length % 4;
  if (padding > 0) {
    paddedString += '='.repeat(4 - padding);
  }

  // Decode the Base64 string
  return atob(paddedString);
};

/**
 * Obfuscates data by encoding it into Base64 and applying a simple XOR transformation.
 *
 * @param data - The data to obfuscate. Can be an object or a string.
 * @returns The obfuscated string.
 */
export const obfuscate = (data: object | string): string => {
  // If data is an empty string or an empty object, return an empty string
  if (
    data === '' ||
    (typeof data === 'object' && Object.keys(data).length === 0)
  )
    return '';
  // Convert data to JSON string if it's an object
  const jsonString = typeof data === 'object' ? JSON.stringify(data) : data;

  // Encode JSON string to Base64
  const base64Encoded = btoa(jsonString);

  // Obfuscate Base64 string with XOR
  let obfuscated = '';
  for (let i = 0; i < base64Encoded.length; ) {
    const codePoint = base64Encoded.codePointAt(i);
    if (codePoint === undefined) {
      break;
    }
    obfuscated += String.fromCodePoint(codePoint ^ XOR_KEY);
    i += codePoint > 0xffff ? 2 : 1;
  }

  return obfuscated;
};

/**
 * De-obfuscates a previously obfuscated string by reversing the XOR transformation
 * and decoding from Base64. Attempts to parse the decoded string as JSON.
 * @param obfuscated - The obfuscated string to decode.
 * @returns The decoded data, which may be a JSON object or a raw string.
 */
export const deobfuscate = (obfuscated: string): object | string => {
  // Handle empty string case
  if (obfuscated === '') return '';

  let base64Encoded = '';
  for (let i = 0; i < obfuscated.length; ) {
    const codePoint = obfuscated.codePointAt(i);
    if (codePoint === undefined) {
      continue;
    }
    base64Encoded += String.fromCodePoint(codePoint ^ XOR_KEY);
    i += codePoint > 0xffff ? 2 : 1;
  }

  // Decode Base64 to JSON string
  let jsonString: string;
  try {
    jsonString = atob(base64Encoded);
  } catch {
    // If Base64 decoding fails, return the obfuscated string
    return obfuscated;
  }

  // Attempt to parse the JSON string
  try {
    const parsed = JSON.parse(jsonString) as object | string;
    return parsed;
  } catch {
    // If parsing fails, return the raw string
    return jsonString;
  }
};

export const toCamelCase = (str: string): string => {
  return str.replaceAll(/_([a-z])/g, (_: string, letter: string) =>
    letter.toUpperCase(),
  );
};

export const transformObjectToCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item: unknown) =>
      transformObjectToCamelCase(item),
    ) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {};
    const objRecord = obj as Record<string, unknown>;
    for (const key of Object.keys(objRecord)) {
      const camelCaseKey = toCamelCase(key);
      newObj[camelCaseKey] = transformObjectToCamelCase(objRecord[key]);
    }
    return newObj as T;
  }
  return obj;
};

export const transformArrayToCamelCase = (arr: string[]): string[] => {
  return arr.map(toCamelCase);
};

export const toSnakeCase = (str: string): string => {
  return str.replaceAll(/([A-Z])/g, '_$1').toLowerCase();
};

export const transformObjectToSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((item: unknown) =>
      transformObjectToSnakeCase(item),
    ) as unknown as T;
  }
  if (obj !== null && typeof obj === 'object') {
    const newObj: Record<string, unknown> = {};
    const objRecord = obj as Record<string, unknown>;
    for (const key of Object.keys(objRecord)) {
      const snakeCaseKey = toSnakeCase(key);
      newObj[snakeCaseKey] = transformObjectToSnakeCase(objRecord[key]);
    }
    return newObj as T;
  }
  return obj;
};

export const transformArrayToSnakeCase = (arr: string[]): string[] => {
  return arr.map(toSnakeCase);
};

export const startsWithSpecialChar = (str: string): boolean => {
  const specialCharPattern = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?¿¡~`]/;
  return specialCharPattern.test(str);
};

export const capitalize = (text: string): string => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => {
      const index = startsWithSpecialChar(word) ? 1 : 0;
      return index
        ? `${word.charAt(0)}${word.charAt(index).toUpperCase()}${word.slice(index + 1).toLowerCase()}`
        : `${word.charAt(index).toUpperCase()}${word.slice(index + 1).toLowerCase()}`;
    })
    .join(' ');
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const rutPattern = String.raw`^[0-9]{3,}[a-zA-Z]{1}[0-9]*$|^[0-9]+$|^[0-9]{3,}-[0-9a-zA-Z]$|^[0-9]{1,3}(\.[0-9]{3})*-[0-9a-zA-Z]$`;

export const isValidRut = (rut: string): boolean => {
  const cleanRUT = rut.replaceAll(/[.\- ]/g, '').toUpperCase();
  const rutMatch = /^(\d+)([0-9K])$/.exec(cleanRUT);
  if (!rutMatch) return false;
  const [, numbers, verifier] = rutMatch;
  let sum = 0;
  let multiplier = 2;
  for (let i = numbers.length - 1; i >= 0; i -= 1) {
    sum += Number.parseInt(numbers[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const calculatedDigit = 11 - (sum % 11);
  let checkDigit: string;
  switch (calculatedDigit) {
    case 11:
      checkDigit = '0';
      break;
    case 10:
      checkDigit = 'K';
      break;
    default:
      checkDigit = String(calculatedDigit);
  }
  return checkDigit === verifier;
};

export const formatRUT = (rut: string): string => {
  const cleanRUT = rut.replaceAll(/[^\dkK]/g, '').toUpperCase();
  if (cleanRUT.length < 2) {
    return cleanRUT;
  }
  const body = cleanRUT.slice(0, -1);
  const checkDigit = cleanRUT.slice(-1);
  const formattedBody = body.replaceAll(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${formattedBody}-${checkDigit}`;
};

export const escapeHtml = (value: string): string => {
  if (!value) {
    return '';
  }
  return value.replaceAll(
    /[&<>"']/g,
    (char: string) => HTML_ESCAPE_MAP[char] ?? char,
  );
};

/**
 * Sanitizes user-provided text following OWASP recommendations:
 * - Removes control characters and dangerous markup.
 * - Normalizes whitespace to prevent CSS injection via invisible characters.
 * - Escapes HTML entities to ensure the value can be safely rendered inside templates.
 */
export const sanitizeTextInput = (
  input: unknown,
  options: SanitizeTextOptions = {},
): string => {
  const { allowNewLines = false, maxLength } = options;
  if (input === undefined || input === null) {
    return '';
  }

  let value: string;
  if (typeof input === 'string') {
    value = input;
  } else if (
    typeof input === 'number' ||
    typeof input === 'boolean' ||
    typeof input === 'bigint'
  ) {
    value = String(input);
  } else if (input instanceof Date) {
    value = input.toISOString();
  } else if (typeof input === 'object') {
    try {
      value = JSON.stringify(input);
    } catch {
      value = '';
    }
  } else {
    value = '';
  }

  value = value.normalize('NFKC');

  value = stripDisallowedControlCharacters(value);
  value = value.replaceAll(/\r\n?/g, '\n');
  value = value.replaceAll(DANGEROUS_ELEMENT_CONTENT_REGEX, '');
  value = value.replaceAll(DANGEROUS_TAG_REGEX, '');
  value = value.replaceAll(EVENT_HANDLER_ATTRIBUTE_REGEX, ' ');
  value = value.replaceAll(DANGEROUS_PROTOCOL_REGEX, '');

  if (allowNewLines) {
    value = value.replaceAll(/[ \t]+/g, ' ');
    value = value
      .split('\n')
      .map((line) => line.trim())
      .join('\n');
    value = value.replaceAll(/\n{3,}/g, '\n\n');
  } else {
    value = value.replaceAll(/\s+/g, ' ');
  }

  value = escapeHtml(value).trim();

  if (
    typeof maxLength === 'number' &&
    Number.isFinite(maxLength) &&
    maxLength >= 0 &&
    value.length > maxLength
  ) {
    value = value.slice(0, maxLength);
  }

  return value;
};
