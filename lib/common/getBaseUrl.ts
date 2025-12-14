import { cache } from 'react';

export const getBaseUrl = cache(() => process.env.API_HOST);
export const getClientBaseUrl = cache(() => process.env.NEXT_PUBLIC_API_HOST);
   