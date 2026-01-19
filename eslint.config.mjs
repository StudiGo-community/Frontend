import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import eslintConfigPrettier from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app/**' },
        {
          type: 'features',
          pattern: 'src/features/*/**',
          capture: ['sliceName'],
        },
        { type: 'shared', pattern: 'src/shared/**' },
      ],
    },
    rules: {
      'boundaries/element-types': [
        2,
        {
          default: 'disallow',
          message:
            '${file.type} 레이어는 ${dependency.type} 레이어를 참조할 수 없습니다.',
          rules: [
            { from: 'app', allow: ['features', 'shared'] },
            {
              from: 'features',
              allow: [
                'shared',
                ['features', { sliceName: '${from.sliceName}' }],
              ],
              disallow: [['features', { sliceName: '!${from.sliceName}' }]],
              message:
                '${from.sliceName} 슬라이스는 ${dependency.sliceName} 슬라이스를 참조할 수 없습니다.',
            },
            { from: 'shared', allow: ['shared'] },
          ],
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  eslintConfigPrettier,
])

export default eslintConfig
