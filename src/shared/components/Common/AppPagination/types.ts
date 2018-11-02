export interface IPagination {
  numFound: number;
  currentPage: number;
  maxPage: number;
  currentItemsPerPage: number;
  validItemsPerPageOptions: number[];
}
