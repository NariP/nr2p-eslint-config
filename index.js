/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {browser: true, es2020: true, jest: true, node: true, "jest/globals": true},
  globals: {window: true},
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react', 'react-refresh', 'import', 'unused-imports', 'prettier'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
      node: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      },
    },
  },
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    /** prettier 에러 */
    'prettier/prettier': 'error',
    'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
    /** emotion/react 의 css 사용시 에러 무시 */
    'react/no-unknown-property': ['error', {ignore: ['css']}],
    /** JSX 안에서 HTML 엔티티(escape sequence)를 사용하면 에러 */
    'react/no-unescaped-entities': ['error', {
      forbid: [{
        char: '>',
        alternatives: ['&gt;'],
      }, {
        char: '}',
        alternatives: ['&#125;'],
      }],
    }],
    /** JSX 안에서 {''} 이런식으로 사용하면 에러 */
    'react/jsx-curly-brace-presence': 'error',
    /** prop types 를 강제하는 규칙 */
    'react/prop-types': 'off',
    /** JSX 존재한다면 React를 import하도록 강제하는 규칙 */
    'react/react-in-jsx-scope': 'off',
    /** 무의미한 Fragment 를 막는 규칙 <>{foo}</> 이건 가능 */
    'react/jsx-no-useless-fragment': ['off', {allowExpressions: true}],
    /** JSX 네이밍 규칙 강제 */
    'react/jsx-pascal-case': ['error', {allowAllCaps: false, allowNamespace: true, allowLeadingUnderscore: false}],
    /** JSX props 불필요한 스페이싱을 막는 규칙 */
    'react/jsx-props-no-multi-spaces': 'error',
    /** jsx를 사용했는데 확장자가 .jsx가 아니면 에러를 내는 규칙*/
    'react/jsx-filename-extension': ['error', {extensions: ['.tsx', '.jsx']}],
    /** 셀프 클로징 가능한 상태일 때 셀프 클로징을 강제하는 규칙 */
    'react/self-closing-comp': ['error', {
      'component': true,
      'html': true,
    }],
    /** JSX Props 정렬하는 규칙 */
    'react/jsx-sort-props': ['error', {
      callbacksLast: true,
      shorthandFirst: true,
      noSortAlphabetically: true,
      multiline: 'last',
      reservedFirst: ['key'],
    }],
    'no-unused-vars': ['error', {
      /** args prefix _ 사용시 에러 무시 */
      argsIgnorePattern: '^_',
      args: 'after-used',
      /** catch 문 error prefix ignore 사용시 에러 무시 */
      caughtErrorsIgnorePattern: '^ignore',
      /** ..rest 사용시 siblings 사용하지 않아도 에러 무시 */
      ignoreRestSiblings: true,
    }],
    /** 정의되지 않은 변수 사용 방지 규칙 */
    'no-undef': 'error',
    /** 변수 및 함수를 정의 전에 사용할 수 있게 해주는 규칙 */
    'no-use-before-define': ['error', {variables: false, functions: false}],
    /** foo['bar'] 대신 foo.bar 사용 강제 규칙 */
    'dot-notation': 'error',
    /** 한 줄당 글자 제한하는 규칙, 주석 제외 */
    'max-len': ['error', {code: 100, ignoreComments: true, ignoreStrings: true}],
    /** dependencies인 모듈이 devDependencies에 있는 경우 에러 발생시키는 규칙 */
    "import/no-extraneous-dependencies": ['error', {"devDependencies": true}],
    /** import 시에 파일의 확장자를 쓰지 않도록 강제하는 규칙 */
    'import/extensions': ['error', {json: 'always'}],
    'import/no-unresolved': 'error',
    /** import 구문 중괄호 사이의 member 모듈 알파벳 순으로 정렬하는 규칙 */
    'sort-imports': ['error', {ignoreDeclarationSort: true}],
    'unused-imports/no-unused-vars': [
      'error',
      {vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_'},
    ],
    /** import 순서 */
    'import/order': [
      'error',
      {
        warnOnUnassignedImports: true,
        pathGroupsExcludedImportTypes: ['type'],
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@emotion/*',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '{react*,*/react}',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'lodash-es',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '**/*.+(css|sass|less|scss|pcss|style|svg)',
            patternOptions: {dot: true, nocomment: true},
            group: 'unknown',
            position: 'after',
          },
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        /** import 구문 개행 금지 */
        'newlines-between': 'never',
      },
    ],
  },
  overrides: [{
    files: ['**/*.ts', '**/*.tsx'],
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:@typescript-eslint/recommended',
    ],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      /** 빈 함수 사용 금지하는 옵션 */
      '@typescript-eslint/no-empty-function': 'off',
    },
  }, {
    "files": ["test/**", "**.test.ts", "**.test.tsx"],
    "plugins": ["jest"],
    "extends": ["plugin:jest/recommended"],
    "rules": {"jest/prefer-expect-assertions": "off"}
  }]
};