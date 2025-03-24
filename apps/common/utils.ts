export const getPageInfo = (total: number, page: number, perPage: number) => {
  return {
    total: Number(total),
    currentPage: Number(page),
    perPage: Number(perPage),
    hasNextPage: Number(page) < Math.ceil(total / Number(perPage)),
    hasPreviousPage: Number(page) > 1,
  };
};
