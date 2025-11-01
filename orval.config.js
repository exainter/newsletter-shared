module.exports = {
  api: {
    input: './specs/openapi-v0.3.0-staging.json',
    output: {
      target: './src/sdk/client.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true,
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
