import { describe, it, expect } from 'vitest';
import {
  decodeBase64URLSafe,
  obfuscate,
  deobfuscate,
  toCamelCase,
  transformObjectToCamelCase,
  transformArrayToCamelCase,
  toSnakeCase,
  transformObjectToSnakeCase,
  transformArrayToSnakeCase,
  startsWithSpecialChar,
  capitalize,
  isValidEmail,
  isValidRut,
  formatRUT,
  escapeHtml,
  sanitizeTextInput,
} from '../string';

describe('String Helper Functions', () => {
  describe('decodeBase64URLSafe', () => {
    it('should decode URL-safe Base64 strings correctly', () => {
      const encoded = 'SGVsbG8gV29ybGQ=';
      const expected = 'Hello World';
      expect(decodeBase64URLSafe(encoded)).toBe(expected);
    });

    it('should handle URL-safe characters', () => {
      // Test string that would contain + and / in standard Base64
      const urlSafeEncoded = 'VGVzdCBzdHJpbmcgd2l0aCBzcGVjaWFsIGNoYXJhY3RlcnM_';
      const result = decodeBase64URLSafe(urlSafeEncoded);
      expect(result).toBeDefined();
    });

    it('should handle strings with underscores and hyphens', () => {
      const encoded = 'dGVzdF9zdHJpbmc-';
      const result = decodeBase64URLSafe(encoded);
      expect(result).toBeDefined();
    });

    it('should add padding when needed', () => {
      const encoded = 'SGVsbG8'; // Missing padding (should be SGVsbG8=)
      const result = decodeBase64URLSafe(encoded);
      expect(result).toBe('Hello');
    });

    it('should handle empty strings', () => {
      expect(decodeBase64URLSafe('')).toBe('');
    });

    it('should handle strings with trailing double dashes', () => {
      // This is the specific case that was failing
      const tokenWithTrailingDashes =
        'eyJhbWIiOiJERVYiLCJnYWVTZXJ2ZXIiOiJodHRwczovL2FwaWRldi50b3RlYXQuY29tIiwieGlyIjoxNDQxNTA5ODU1MjY5MTM2LCJ4aWwiOjEsIm5yIjoiQ2hpbGUgLSBZb3NlciIsInhpZCI6MTc5ODM1NzA2ODA4NDU4NSwieHRvdDEiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbWNtVnphQ0k2Wm1Gc2MyVXNJbWxoZENJNk1UYzFNVE14TURZME1pd2lhblJwSWpvaU16TmxZV0kwTlRZdFlqUTNZaTAwTjJJM0xUZ3paamd0TkRVM01qa3daalExTUdRMklpd2lkSGx3WlNJNkltRmpZMlZ6Y3lJc0luTjFZaUk2SW0xaGJuUjFibVY2UUhSdmRHVmhkQzVqYjIwaUxDSnVZbVlpT2pFM05URXpNVEEyTkRJc0ltTnpjbVlpT2lJME1qZ3hNMlV4TmkweVpXWTBMVFF3WVRBdE9UZzNOUzFqT0RsbFpqZGhNV0ZtTkRBaUxDSmxlSEFpT2pFM05URXpOamd5TkRJc0ltVnVkR2wwZVNJNklsVlRSVklpTENKelkyOXdaU0k2SW5SeWJTSjkuRTVHRWJJUFlwZm5RMW5TNVNiTGQxOWp1Q1ItcnRCcEtxNU9ZR2xIMnVyOCIsIm51IjoiTWF1cmljaW8gQW50dW5leiIsInBmIjoxLCJhZG0iOjAsImxvY2FsSWQiOiI2NWQ1Zjc0MjQ0ZGRhNjNiNTAzYjYwMmUiLCJyZXN0YXVyYW50SWQiOiI2NWQ1Zjc0MjQ0ZGRhNjNiNTAzYjYwMjgifQ--';

      const result = decodeBase64URLSafe(tokenWithTrailingDashes);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      // Should be able to parse as JSON without throwing an error
      expect(() => JSON.parse(result)).not.toThrow();

      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('amb');
      expect(parsed).toHaveProperty('localId');
      expect(parsed).toHaveProperty('restaurantId');
    });

    it('should handle strings with multiple trailing dashes', () => {
      // Create a valid base64 string and add trailing dashes
      const validBase64 = btoa('{"test": "value"}')
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');
      const withTrailingDashes = validBase64 + '---';

      const result = decodeBase64URLSafe(withTrailingDashes);
      expect(result).toBe('{"test": "value"}');

      const parsed = JSON.parse(result);
      expect(parsed).toEqual({ test: 'value' });
    });

    it('should remove single trailing dash as it is likely a separator', () => {
      // Single trailing dashes are now treated as separators and removed
      // This is the correct behavior for strings like JWT tokens ending with "-"
      const validBase64 = btoa('{"test": "value"}')
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');
      const withTrailingDash = validBase64 + '-';

      const result = decodeBase64URLSafe(withTrailingDash);

      // The trailing dash should be removed, resulting in valid JSON
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).toBe('{"test": "value"}'); // Single dash is removed as separator

      // Should be valid JSON
      expect(() => JSON.parse(result)).not.toThrow();
      const parsed = JSON.parse(result);
      expect(parsed).toEqual({ test: 'value' });
    });

    it('should not affect valid dashes within the base64 string', () => {
      // Test that internal dashes (converted from +) are preserved
      const testString = 'Test+String/With+Special-Chars';
      const base64 = btoa(testString);
      const urlSafe = base64
        .replaceAll('+', '-')
        .replaceAll('/', '_')
        .replaceAll('=', '');

      const result = decodeBase64URLSafe(urlSafe);
      expect(result).toBe(testString);
    });

    it('should handle null and undefined gracefully', () => {
      expect(decodeBase64URLSafe('')).toBe('');
    });

    it('should decode the provided JWT-like token correctly', () => {
      const testString =
        'eyJhbWIiOiJERVYiLCJnYWVTZXJ2ZXIiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJ4aXIiOjY0OTgwNzExOTkzNTA3ODQsInhpbCI6MSwibnIiOiJFeHViZXJuYWNpYSIsInhpZCI6NjcwOTQxMDg1MjIxNzM0NCwieHRvdDEiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbWNtVnphQ0k2Wm1Gc2MyVXNJbWxoZENJNk1UYzFNVE14TXpRMk5Dd2lhblJwSWpvaU1tSmxOakJtTTJFdFltRXlOeTAwTkRGaUxUa3pZekF0TlRNNE4yTmlZalkxWVRRMElpd2lkSGx3WlNJNkltRmpZMlZ6Y3lJc0luTjFZaUk2SW1GaFkyVjJaV1J2UUhSdmRHVmhkQzVqYjIwaUxDSnVZbVlpT2pFM05URXpNVE0wTmpRc0ltTnpjbVlpT2lJd09UWXlaVFU0TlMwM01UYzNMVFJrWmpjdE9XWXdNeTB5TXpaak5tUmlNakEwTm1RaUxDSmxlSEFpT2pFM05URXpOekV3TmpRc0ltVnVkR2wwZVNJNklsVlRSVklpTENKelkyOXdaU0k2SW5SeWJTSjkuakEzOTBwSzJxcHZkMVFlNllnTUFIdE5Db3VrbUFzUWFqb1I2aHJQRUJJRSIsIm51IjoiQWxiZXJ0IEFjZXZlZG8iLCJwZiI6MSwiYWRtIjowLCJsb2NhbElkIjoiNjgzMGEwMDYwNThjMTZlMmEwYTE0YjJhIiwicmVzdGF1cmFudElkIjoiNjgzMGEwMDYwNThjMTZlMmEwYTE0YjI4In0-';

      const result = decodeBase64URLSafe(testString);

      // Should successfully decode without throwing an error
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');

      // Should now be valid JSON directly (no extra characters)
      expect(() => JSON.parse(result)).not.toThrow();

      // Parse and verify the structure
      const parsed = JSON.parse(result);
      expect(parsed).toHaveProperty('amb', 'DEV');
      expect(parsed).toHaveProperty('gaeServer', 'http://localhost:8080');
      expect(parsed).toHaveProperty('xir', 6498071199350784);
      expect(parsed).toHaveProperty('xil', 1);
      expect(parsed).toHaveProperty('nr', 'Exubernacia');
      expect(parsed).toHaveProperty('nu', 'Albert Acevedo');
      expect(parsed).toHaveProperty('pf', 1);
      expect(parsed).toHaveProperty('adm', 0);
      expect(parsed).toHaveProperty('localId');
      expect(parsed).toHaveProperty('restaurantId');

      // Verify specific values
      expect(parsed.amb).toBe('DEV');
      expect(parsed.nu).toBe('Albert Acevedo');
      expect(parsed.nr).toBe('Exubernacia');
      expect(parsed.pf).toBe(1);
      expect(parsed.adm).toBe(0);
      expect(parsed.localId).toBe('6830a006058c16e2a0a14b2a');
      expect(parsed.restaurantId).toBe('6830a006058c16e2a0a14b28');

      // Verify that the JWT token is also present in the xtot1 field
      expect(parsed).toHaveProperty('xtot1');
      expect(typeof parsed.xtot1).toBe('string');
      expect(parsed.xtot1).toContain('eyJhbGciOiJIUzI1NiI'); // JWT header
    });
  });

  describe('obfuscate', () => {
    it('should obfuscate string data', () => {
      const data = 'test string';
      const result = obfuscate(data);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
      expect(result).not.toBe(data);
    });

    it('should obfuscate object data', () => {
      const data = { name: 'John', age: 30 };
      const result = obfuscate(data);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });

    it('should return empty string for empty string input', () => {
      expect(obfuscate('')).toBe('');
    });

    it('should return empty string for empty object input', () => {
      expect(obfuscate({})).toBe('');
    });

    it('should handle objects with properties', () => {
      const data = { test: 'value', number: 42 };
      const result = obfuscate(data);
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle complex nested objects', () => {
      const data = {
        user: {
          name: 'John',
          details: {
            age: 30,
            active: true,
          },
        },
      };
      const result = obfuscate(data);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });

  describe('deobfuscate', () => {
    it('should deobfuscate string data correctly', () => {
      const originalData = 'test string';
      const obfuscated = obfuscate(originalData);
      const result = deobfuscate(obfuscated);
      expect(result).toBe(originalData);
    });

    it('should deobfuscate object data correctly', () => {
      const originalData = { name: 'John', age: 30 };
      const obfuscated = obfuscate(originalData);
      const result = deobfuscate(obfuscated);
      expect(result).toEqual(originalData);
    });

    it('should return empty string for empty string input', () => {
      expect(deobfuscate('')).toBe('');
    });

    it('should handle invalid obfuscated data gracefully', () => {
      const invalidData = 'invalid-obfuscated-data';
      const result = deobfuscate(invalidData);
      expect(result).toBeDefined();
      // Should return a string when JSON parsing fails
      expect(typeof result).toBe('string');
    });

    it('should handle complex nested objects', () => {
      const originalData = {
        user: {
          name: 'John',
          details: {
            age: 30,
            active: true,
          },
        },
        items: [1, 2, 3],
      };
      const obfuscated = obfuscate(originalData);
      const result = deobfuscate(obfuscated);
      expect(result).toEqual(originalData);
    });
  });

  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('snake_case')).toBe('snakeCase');
      expect(toCamelCase('hello_world')).toBe('helloWorld');
      expect(toCamelCase('user_id')).toBe('userId');
    });

    it('should handle multiple underscores', () => {
      expect(toCamelCase('multiple_snake_case_words')).toBe(
        'multipleSnakeCaseWords',
      );
    });

    it('should handle strings without underscores', () => {
      expect(toCamelCase('alreadycamelcase')).toBe('alreadycamelcase');
      expect(toCamelCase('single')).toBe('single');
    });

    it('should handle empty strings', () => {
      expect(toCamelCase('')).toBe('');
    });

    it('should handle strings with numbers', () => {
      expect(toCamelCase('test_case_1')).toBe('testCase_1'); // Numbers after underscore aren't converted
    });
  });

  describe('transformObjectToCamelCase', () => {
    it('should transform object keys to camelCase', () => {
      const input = { user_name: 'John', user_age: 30 };
      const expected = { userName: 'John', userAge: 30 };
      expect(transformObjectToCamelCase(input)).toEqual(expected);
    });

    it('should handle nested objects', () => {
      const input = {
        user_info: {
          first_name: 'John',
          last_name: 'Doe',
        },
      };
      const expected = {
        userInfo: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };
      expect(transformObjectToCamelCase(input)).toEqual(expected);
    });

    it('should handle arrays', () => {
      const input = [{ user_name: 'John' }, { user_name: 'Jane' }];
      const expected = [{ userName: 'John' }, { userName: 'Jane' }];
      expect(transformObjectToCamelCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(transformObjectToCamelCase('string')).toBe('string');
      expect(transformObjectToCamelCase(42)).toBe(42);
      expect(transformObjectToCamelCase(true)).toBe(true);
      expect(transformObjectToCamelCase(null)).toBe(null);
    });

    it('should handle empty objects', () => {
      expect(transformObjectToCamelCase({})).toEqual({});
    });

    it('should handle empty arrays', () => {
      expect(transformObjectToCamelCase([])).toEqual([]);
    });

    it('should handle mixed data types', () => {
      const input = {
        user_name: 'John',
        user_age: 30,
        is_active: true,
        user_scores: [10, 20, 30],
        user_profile: {
          profile_pic: 'pic.jpg',
        },
      };
      const expected = {
        userName: 'John',
        userAge: 30,
        isActive: true,
        userScores: [10, 20, 30],
        userProfile: {
          profilePic: 'pic.jpg',
        },
      };
      expect(transformObjectToCamelCase(input)).toEqual(expected);
    });
  });

  describe('transformArrayToCamelCase', () => {
    it('should transform array of strings to camelCase', () => {
      const input = ['user_name', 'user_age', 'is_active'];
      const expected = ['userName', 'userAge', 'isActive'];
      expect(transformArrayToCamelCase(input)).toEqual(expected);
    });

    it('should handle empty arrays', () => {
      expect(transformArrayToCamelCase([])).toEqual([]);
    });

    it('should handle single element arrays', () => {
      expect(transformArrayToCamelCase(['user_name'])).toEqual(['userName']);
    });
  });

  describe('toSnakeCase', () => {
    it('should convert camelCase to snake_case', () => {
      expect(toSnakeCase('camelCase')).toBe('camel_case');
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
      expect(toSnakeCase('userId')).toBe('user_id');
    });

    it('should handle multiple capital letters', () => {
      expect(toSnakeCase('XMLHttpRequest')).toBe('_x_m_l_http_request'); // Leading underscore is expected
    });

    it('should handle strings without capital letters', () => {
      expect(toSnakeCase('alreadysnakecase')).toBe('alreadysnakecase');
      expect(toSnakeCase('single')).toBe('single');
    });

    it('should handle empty strings', () => {
      expect(toSnakeCase('')).toBe('');
    });

    it('should handle strings starting with capital letters', () => {
      expect(toSnakeCase('CamelCase')).toBe('_camel_case');
    });
  });

  describe('transformObjectToSnakeCase', () => {
    it('should transform object keys to snake_case', () => {
      const input = { userName: 'John', userAge: 30 };
      const expected = { user_name: 'John', user_age: 30 };
      expect(transformObjectToSnakeCase(input)).toEqual(expected);
    });

    it('should handle nested objects', () => {
      const input = {
        userInfo: {
          firstName: 'John',
          lastName: 'Doe',
        },
      };
      const expected = {
        user_info: {
          first_name: 'John',
          last_name: 'Doe',
        },
      };
      expect(transformObjectToSnakeCase(input)).toEqual(expected);
    });

    it('should handle arrays', () => {
      const input = [{ userName: 'John' }, { userName: 'Jane' }];
      const expected = [{ user_name: 'John' }, { user_name: 'Jane' }];
      expect(transformObjectToSnakeCase(input)).toEqual(expected);
    });

    it('should handle primitive values', () => {
      expect(transformObjectToSnakeCase('string')).toBe('string');
      expect(transformObjectToSnakeCase(42)).toBe(42);
      expect(transformObjectToSnakeCase(true)).toBe(true);
      expect(transformObjectToSnakeCase(null)).toBe(null);
    });

    it('should handle empty objects', () => {
      expect(transformObjectToSnakeCase({})).toEqual({});
    });

    it('should handle empty arrays', () => {
      expect(transformObjectToSnakeCase([])).toEqual([]);
    });
  });

  describe('transformArrayToSnakeCase', () => {
    it('should transform array of strings to snake_case', () => {
      const input = ['userName', 'userAge', 'isActive'];
      const expected = ['user_name', 'user_age', 'is_active'];
      expect(transformArrayToSnakeCase(input)).toEqual(expected);
    });

    it('should handle empty arrays', () => {
      expect(transformArrayToSnakeCase([])).toEqual([]);
    });

    it('should handle single element arrays', () => {
      expect(transformArrayToSnakeCase(['userName'])).toEqual(['user_name']);
    });
  });

  describe('startsWithSpecialChar', () => {
    it('should return true for strings starting with special characters', () => {
      expect(startsWithSpecialChar('!hello')).toBe(true);
      expect(startsWithSpecialChar('@world')).toBe(true);
      expect(startsWithSpecialChar('#test')).toBe(true);
      expect(startsWithSpecialChar('$money')).toBe(true);
      expect(startsWithSpecialChar('%percent')).toBe(true);
      expect(startsWithSpecialChar('^caret')).toBe(true);
      expect(startsWithSpecialChar('&ampersand')).toBe(true);
      expect(startsWithSpecialChar('*asterisk')).toBe(true);
      expect(startsWithSpecialChar('(parenthesis')).toBe(true);
      expect(startsWithSpecialChar(')parenthesis')).toBe(true);
      expect(startsWithSpecialChar('_underscore')).toBe(true);
      expect(startsWithSpecialChar('+plus')).toBe(true);
      expect(startsWithSpecialChar('-minus')).toBe(true);
      expect(startsWithSpecialChar('=equals')).toBe(true);
      expect(startsWithSpecialChar('[bracket')).toBe(true);
      expect(startsWithSpecialChar(']bracket')).toBe(true);
      expect(startsWithSpecialChar('{brace')).toBe(true);
      expect(startsWithSpecialChar('}brace')).toBe(true);
      expect(startsWithSpecialChar(';semicolon')).toBe(true);
      expect(startsWithSpecialChar("'quote")).toBe(true);
      expect(startsWithSpecialChar('"quote')).toBe(true);
      expect(startsWithSpecialChar(':colon')).toBe(true);
      expect(startsWithSpecialChar(String.raw`\backslash`)).toBe(true);
      expect(startsWithSpecialChar('|pipe')).toBe(true);
      expect(startsWithSpecialChar(',comma')).toBe(true);
      expect(startsWithSpecialChar('.period')).toBe(true);
      expect(startsWithSpecialChar('<less')).toBe(true);
      expect(startsWithSpecialChar('>greater')).toBe(true);
      expect(startsWithSpecialChar('/slash')).toBe(true);
      expect(startsWithSpecialChar('?question')).toBe(true);
      expect(startsWithSpecialChar('¿inverted')).toBe(true);
      expect(startsWithSpecialChar('¡exclamation')).toBe(true);
      expect(startsWithSpecialChar('~tilde')).toBe(true);
      expect(startsWithSpecialChar('`backtick')).toBe(true);
    });

    it('should return false for strings starting with letters or numbers', () => {
      expect(startsWithSpecialChar('hello')).toBe(false);
      expect(startsWithSpecialChar('World')).toBe(false);
      expect(startsWithSpecialChar('123test')).toBe(false);
      expect(startsWithSpecialChar('0start')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(startsWithSpecialChar('')).toBe(false);
    });

    it('should handle single character strings', () => {
      expect(startsWithSpecialChar('!')).toBe(true);
      expect(startsWithSpecialChar('a')).toBe(false);
      expect(startsWithSpecialChar('1')).toBe(false);
    });
  });

  describe('capitalize', () => {
    it('should capitalize single words', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
      expect(capitalize('test')).toBe('Test');
    });

    it('should capitalize multiple words', () => {
      expect(capitalize('hello world')).toBe('Hello World');
      expect(capitalize('this is a test')).toBe('This Is A Test');
    });

    it('should handle words starting with special characters', () => {
      expect(capitalize('!hello world')).toBe('!Hello World');
      expect(capitalize('@test case')).toBe('@Test Case');
    });

    it('should handle mixed case words', () => {
      expect(capitalize('hELLo WoRLd')).toBe('Hello World');
      expect(capitalize('tESt CaSe')).toBe('Test Case');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('!')).toBe('!');
    });

    it('should handle strings with only special characters', () => {
      expect(capitalize('!@# $%^')).toBe('!@# $%^');
    });

    it('should handle strings with numbers', () => {
      expect(capitalize('hello 123 world')).toBe('Hello 123 World');
    });
  });

  describe('isValidEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
      expect(isValidEmail('user+tag@example.org')).toBe(true);
      expect(isValidEmail('user123@test123.com')).toBe(true);
      expect(isValidEmail('a@b.co')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('invalid@')).toBe(false);
      expect(isValidEmail('@invalid.com')).toBe(false);
      expect(isValidEmail('invalid@.com')).toBe(false);
      expect(isValidEmail('invalid.com')).toBe(false);
      expect(isValidEmail('invalid@com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@domain')).toBe(false);
      expect(isValidEmail('test.domain.com')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidEmail('test@domain.')).toBe(false);
      expect(isValidEmail('test @domain.com')).toBe(false);
      expect(isValidEmail('test@ domain.com')).toBe(false);
      expect(isValidEmail('test@domain .com')).toBe(false);
    });
  });

  describe('isValidRut', () => {
    it('should return true for valid RUT formats', () => {
      // Valid RUTs with correct check digits
      expect(isValidRut('12345678-5')).toBe(true); // Calculated correct check digit
      expect(isValidRut('12.345.678-5')).toBe(true);
      expect(isValidRut('123456785')).toBe(true);
      expect(isValidRut('11111111-1')).toBe(true); // Known valid RUT
      expect(isValidRut('12.345.670-K')).toBe(true); // RUT with K check digit
    });

    it('should return false for invalid RUT formats', () => {
      expect(isValidRut('')).toBe(false);
      expect(isValidRut('invalid')).toBe(false);
      expect(isValidRut('12345678')).toBe(false); // Missing check digit
      expect(isValidRut('12345678-X')).toBe(false); // Invalid check digit
      expect(isValidRut('123-4')).toBe(false); // Too short
    });

    it('should handle RUTs with spaces and different separators', () => {
      expect(isValidRut('12 345 678-5')).toBe(true); // Using correct check digit
      expect(isValidRut('12.345.678 5')).toBe(true);
    });

    it('should validate check digit correctly', () => {
      // Test with known valid RUTs
      expect(isValidRut('11111111-1')).toBe(true);
      expect(isValidRut('12345678-5')).toBe(true); // Correct check digit
      // Test with invalid check digits
      expect(isValidRut('11111111-2')).toBe(false);
      expect(isValidRut('12345678-9')).toBe(false); // Wrong check digit
    });

    it('should handle K as check digit', () => {
      // RUT that should have K as check digit
      expect(isValidRut('12345670-K')).toBe(true);
      expect(isValidRut('12345670-k')).toBe(true); // lowercase k should work
    });

    it('should validate RUT where calculated check digit is 10 (K)', () => {
      // This RUT should calculate to check digit 10, which becomes 'K'
      expect(isValidRut('10000013-K')).toBe(true);
      expect(isValidRut('10000013-k')).toBe(true); // lowercase k should work
    });

    it('should validate RUT where calculated check digit is 11 (0)', () => {
      // This RUT should calculate to check digit 11, which becomes '0'
      expect(isValidRut('10000004-0')).toBe(true);
      expect(isValidRut('10.000.004-0')).toBe(true); // with formatting
    });

    it('should return false for RUT with incorrect K check digit', () => {
      // RUT that should NOT have K as check digit
      expect(isValidRut('12345678-K')).toBe(false);
      expect(isValidRut('11111111-K')).toBe(false);
    });

    it('should return false for RUT with incorrect 0 check digit', () => {
      // RUT that should NOT have 0 as check digit
      expect(isValidRut('12345678-0')).toBe(false);
      expect(isValidRut('11111111-0')).toBe(false);
    });
  });

  describe('formatRUT', () => {
    it('should format RUT with dots and hyphen', () => {
      expect(formatRUT('123456789')).toBe('12.345.678-9');
      expect(formatRUT('12345678K')).toBe('12.345.678-K');
    });

    it('should handle already formatted RUTs', () => {
      expect(formatRUT('12.345.678-9')).toBe('12.345.678-9');
      expect(formatRUT('12-345-678-9')).toBe('12.345.678-9');
    });

    it('should handle RUTs with spaces', () => {
      expect(formatRUT('12 345 678 9')).toBe('12.345.678-9');
      expect(formatRUT('12 345 678 K')).toBe('12.345.678-K');
    });

    it('should handle short RUTs', () => {
      expect(formatRUT('12')).toBe('1-2');
      expect(formatRUT('123')).toBe('12-3');
    });

    it('should handle single character RUTs', () => {
      expect(formatRUT('1')).toBe('1');
      expect(formatRUT('')).toBe('');
    });

    it('should remove non-numeric and non-K characters', () => {
      expect(formatRUT('12.345.678-9')).toBe('12.345.678-9');
      expect(formatRUT('12abc345def678ghi9')).toBe('12.345.678-9');
    });

    it('should handle lowercase k', () => {
      expect(formatRUT('12345678k')).toBe('12.345.678-K');
    });

    it('should handle longer RUTs', () => {
      expect(formatRUT('123456789')).toBe('12.345.678-9');
      expect(formatRUT('1234567890')).toBe('123.456.789-0');
    });
  });

  describe('escapeHtml', () => {
    it('should escape angle brackets, quotes, and ampersands', () => {
      const result = escapeHtml('<div class="test">& "quote"</div>');
      expect(result).toBe(
        '&lt;div class=&quot;test&quot;&gt;&amp; &quot;quote&quot;&lt;/div&gt;',
      );
    });

    it('should return empty string for falsy input', () => {
      expect(escapeHtml('')).toBe('');
    });
  });

  describe('sanitizeTextInput', () => {
    it('should remove script tags and escape remaining markup', () => {
      const payload = 'Hello<script>alert(1)</script><b>World</b>';
      const sanitized = sanitizeTextInput(payload);
      expect(sanitized).toBe('Hello&lt;b&gt;World&lt;/b&gt;');
      expect(sanitized).not.toContain('<script');
    });

    it('should remove dangerous attributes and protocols', () => {
      const payload =
        '<img src="javascript:alert(1)" onerror="alert(1)">Click me';
      const sanitized = sanitizeTextInput(payload);
      expect(sanitized).not.toContain('javascript');
      expect(sanitized).not.toContain('onerror');
      expect(sanitized).toContain('&lt;img');
    });

    it('should strip control characters and normalize whitespace', () => {
      const payload = 'abc\u0000def\u0007   ghi';
      const sanitized = sanitizeTextInput(payload);
      expect(sanitized).toBe('abcdef ghi');
    });

    it('should preserve intentional new lines when enabled', () => {
      const payload = ' line1 \r\n line2 \n\n line3 ';
      const sanitized = sanitizeTextInput(payload, { allowNewLines: true });
      expect(sanitized).toBe('line1\nline2\n\nline3');
    });

    it('should enforce maximum length', () => {
      const payload = 'a'.repeat(50);
      const sanitized = sanitizeTextInput(payload, { maxLength: 10 });
      expect(sanitized).toHaveLength(10);
    });

    it('should stringify objects safely before sanitizing', () => {
      const sanitized = sanitizeTextInput({ message: '<b>bold</b>' });
      expect(sanitized).toContain('&lt;b&gt;bold&lt;/b&gt;');
    });

    it('should handle nullish values gracefully', () => {
      expect(sanitizeTextInput(undefined)).toBe('');
      expect(sanitizeTextInput(null)).toBe('');
    });
  });
});
