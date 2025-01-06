import { REPO_TYPE } from "@/constant";

export interface SearchParams {
  name?: string;
  page?: string;
}

export interface ParamsValid {
  isValid: true;
  type: REPO_TYPE;
}

export interface ParamsInvalid {
  isValid: false;
  type: string | undefined;
}

export type Params = ParamsValid | ParamsInvalid;

export function parseSearchParams(
  searchParams: Record<string, string | undefined>,
): SearchParams {
  return {
    name: typeof searchParams.name === "string" ? searchParams.name : undefined,
    page: typeof searchParams.page === "string" ? searchParams.page : undefined,
  };
}

function isRepoType(value: string | undefined): value is REPO_TYPE {
  return (
    typeof value === "string" &&
    Object.values(REPO_TYPE).includes(value as REPO_TYPE)
  );
}

export function parseParams(
  params: Record<string, string | undefined>,
): Params {
  const { type } = params;

  if (!isRepoType(type)) {
    return {
      isValid: false,
      type,
    };
  }
  return {
    isValid: true,
    type,
  };
}
