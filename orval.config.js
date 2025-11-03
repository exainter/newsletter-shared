module.exports = {
  api: {
    input: './specs/openapi-v1.0.0-prod.json',
    output: {
      target: './src/sdk/client.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: false,
      mode: 'single',
      override: {
        fetch: {
          includeHttpStatusReturnType: false,
        },
      },
    },
    hooks: {
      afterAllFilesWrite: ['prettier --write'],
    },
  },
};
