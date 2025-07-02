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
              <PaginationPrevious to={`${baseUrl}?page=${currentPage - 1}`} />
            </PaginationItem>
            {
              Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index + 1}>
                  <PaginationLink to={`${baseUrl}?page=${index + 1}`} isActive={currentPage === index + 1}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            }
            {/* <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem> */}
            <PaginationItem>
              <PaginationNext to={`${baseUrl}?page=${currentPage + 1}`} />
            </PaginationItem>
        </PaginationContent>
        </Pagination>
  )
}

export default CustomPagination