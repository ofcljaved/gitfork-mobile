
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ParamsValid } from "@/lib/url-state";
import { cn } from "@/lib/utils";
import { SearchParams } from "next/dist/server/request/search-params";

const createPathname = (params: ParamsValid) => {
    const { type } = params;
    return `/repos/${type}`;
};

const createSearchParams = (searchParams: SearchParams, goTopage?: number) => {
    if (goTopage === undefined) return searchParams;

    goTopage = goTopage > 0 ? goTopage : 1;
    return {
        ...searchParams,
        page: goTopage,
    };
};

const generatePageNumber = (currentPage: number, totalPages: number): {
    beforeEllipsis: boolean;
    afterEllipsis: boolean;
    pageNumbers: number[];
} => {
    if (totalPages < 1 ) return { beforeEllipsis: false, afterEllipsis: false, pageNumbers: [] };

    const parsedCurrentPage = Math.max(1, isNaN(Number(currentPage))? 1 : Number(currentPage));
    const adjustedCurrentPage = parsedCurrentPage >= totalPages ? totalPages - 1 : parsedCurrentPage;
    const startPage = Math.max(1, adjustedCurrentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    const pageNumbers: number[] = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const beforeEllipsis = startPage > 1;
    const afterEllipsis = endPage < totalPages;

    return { beforeEllipsis, afterEllipsis, pageNumbers };
};

export const RepoPagination = ({
    currentPage,
    totalPages,
    params,
    searchParams,
}: {
    currentPage: number,
    totalPages: number
    params: ParamsValid;
    searchParams: SearchParams;
}) => {
    if (totalPages <= 1) return null;

    const { beforeEllipsis, afterEllipsis, pageNumbers } = generatePageNumber(currentPage, totalPages);
    return (
        <Pagination className="my-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href={{
                            pathname: createPathname(params),
                            query: createSearchParams(searchParams, Math.max(1, currentPage - 1)),
                        }}
                        className={cn(currentPage <= 1 && "cursor-not-allowed pointer-events-none opacity-50")}
                    />
                </PaginationItem>
                {beforeEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                {pageNumbers.map((pageNumber) => (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink
                            href={{
                                pathname: createPathname(params),
                                query: createSearchParams(searchParams, pageNumber),
                            }}
                            isActive={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {afterEllipsis && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationNext
                        href={{
                            pathname: createPathname(params),
                            query: createSearchParams(searchParams, Math.min(totalPages, currentPage + 1)),
                        }}
                        className={cn(currentPage >= totalPages && "cursor-not-allowed pointer-events-none opacity-50")}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
};
