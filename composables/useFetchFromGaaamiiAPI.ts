type DefaultFetchOptions = {
  mode: RequestMode | undefined;
  credentials: RequestCredentials;
  headers: RequestInit["headers"];
};
const defaultFetchOptions: DefaultFetchOptions = {
  mode: "cors",
  credentials: "include",
  headers: { "Content-Type": "application/json; charset=utf-8" },
};
type FetchOptions = Parameters<typeof $fetch>[1];
type AsyncDataOptions = Parameters<typeof useAsyncData>[2];

export const useFetchFromGaaamiiAPI = (
  key: string,
  path: string,
  fetchOptions: FetchOptions,
  asyncDataOptions: AsyncDataOptions,
) => {
  const { API_SERVER_ORIGIN } = useRuntimeConfig().public;

  return useAsyncData(
    key,
    () =>
      $fetch(`${API_SERVER_ORIGIN}${path}`, {
        ...defaultFetchOptions,
        ...fetchOptions,
      }),
    asyncDataOptions,
  );
};
