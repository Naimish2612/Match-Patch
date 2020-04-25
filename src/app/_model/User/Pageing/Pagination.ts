export interface Pageination {
    currentPage?:Number;
    pageSize?:Number;
    totalItems:Number;
    totalPages:Number;
    hasPreviousPage:boolean;
    hasNextPage:boolean;
}

export class PageResult<T>{
    result:T;
    pagination:Pageination;
}


