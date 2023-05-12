/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    serverUrl: 'http://localhost:5000',
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
