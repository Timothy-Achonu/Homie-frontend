import { fetcher, post, patch, deleteReq, paginatedFetcher, fetcherWithParams } from './fetcher.client';
import { serverFetcher, serverPost, fetcherWithParamsOnserver } from './fetcher.sever';

// Network request interface
export const network = {
  clientGet: fetcher,
  delete: deleteReq,
  clientPost: post,
  clientPatch: patch,
  clientPaginatedFetcher: paginatedFetcher,
  clientFetcherWithParams: fetcherWithParams,
  getOnServer: serverFetcher,
  fetcherWithParamsOnserver,
  serverPost
};
       