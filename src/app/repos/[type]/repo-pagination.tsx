
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
    const pageNumbers: number[] = [];
    const start = currentPage >= totalPages ? --totalPages : currentPage;
    const initializer = Math.max(1, start - 1);
    const conditionalRange = initializer + 2;
    for (let i = initializer; i <= conditionalRange; i++) {
        pageNumbers.push(i);
    }
    let beforeEllipsis = false;
    let afterEllipsis = false;

    if (currentPage > 2) beforeEllipsis = true;
    if (currentPage < totalPages - 1) afterEllipsis = true;
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
