import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unicorn from 'eslint-plugin-unicorn';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  // 1. Базовые правила JS
  js.configs.recommended,
  // 2. Рекомендованные правила TS (включает парсер и плагин)
  ...tseslint.configs.recommended,
  // 3. React рекомендованные конфиги
  {
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat['jsx-runtime'],
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  // 4. Дополнительные правила для всех файлов
  {
    plugins: {
      'react-hooks': reactHooks,
      unicorn,
      prettier: prettierPlugin
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },
    rules: {
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Отключаем базовое правило, оставляем TS-вариант
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Unicorn
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
          ignore: ['\\.(test|spec)\\.(js|jsx|ts|tsx)$', '^[A-Z]+\\.(js|jsx|ts|tsx)$']
        }
      ],
      // Prettier
      'prettier/prettier': 'error',
      // Прочие
      'no-console': 'warn',
      'no-debugger': 'error'
    }
  },
  // 6. Игноры
  {
    ignores: ['dist/', 'node_modules/', 'webpack.config.*', 'eslint.config.*', '.prettierrc*']
  }
);
