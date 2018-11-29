export const getDefaultPaginationOptions = () =>
  Object.assign(
    {},
    {
      paginationOptions: {
        defaultCurrent: 1,
        current: 1,
        pageSize: 5,
        total: 1
      }
    }
  );
