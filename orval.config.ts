import { defineConfig } from 'orval';

// .env.local 파일 로드

export default defineConfig({
  api: {
    input: {
      target: 'https://ht-api.ericpark.shop/swagger-ui/index.html',
    },
    output: {
      target: './src/lib/api/generated.ts',
      client: 'axios-functions',
      mode: 'tags-split',
      schemas: './src/types/api',
      override: {
        mutator: {
          path: './src/lib/api/config.ts',
          name: 'apiClient',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
