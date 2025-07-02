import React from 'react'
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Props{
  currentPage: number;
  totalPages: number;
  count: number;
  baseUrl: string
}

const CustomPagination: React.FC<Props> = ({ currentPage, totalPages, baseUrl }) => {
  return (
    <Pagination>
        <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                to={`${baseUrl}?page=${currentPage - 1}`}
                className={currentPage <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-blue-300'}
                />
            </PaginationItem>
            {
              Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink
                    to={`${baseUrl}?page=${index + 1}`} isActive={currentPage === index + 1}
                    className={currentPage === index + 1 ? 'pointer-events-none': 'hover:bg-blue-300'}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext
                to={`${baseUrl}?page=${currentPage + 1}`}
                className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-blue-300'}
                />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
  )
}

export default CustomPagination