export interface IMeta {
  pagination: IPagination;
};

export interface IPagination {
  limit?: number;
  total?: number;
  pages?: number;
  page?: number;
};
