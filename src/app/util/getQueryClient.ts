// eslint-disable-next-line import/no-extraneous-dependencies
import { QueryClient } from '@tanstack/query-core';
import { cache } from 'react';

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
