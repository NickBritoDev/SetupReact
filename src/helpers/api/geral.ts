import { IQueryFilter } from "@modules/admin/marketplace/types/types";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function queryFilterToURLParams<T>(query: IQueryFilter<T>): string {
  let body = "";

  for (const key in query) {
    if (key in query) {
      body += key + "=" + JSON.stringify(query[key as keyof typeof query]) + "&";
    } 
  }

  return body;
}
