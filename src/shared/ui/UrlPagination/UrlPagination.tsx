"use client";

import { Pagination } from "@mantine/core";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface UrlPaginationProps {
  pageParam: string;
  currentPage: number;
  totalPages: number;
}

const UrlPagination = ({ pageParam, currentPage, totalPages }: UrlPaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) {
    return null;
  }

  const onChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextPage <= 1) {
      params.delete(pageParam);
    } else {
      params.set(pageParam, String(nextPage));
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <Pagination
      value={currentPage}
      total={totalPages}
      onChange={onChange}
      withControls
      siblings={1}
      boundaries={1}
    />
  );
};

export default UrlPagination;

