"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { FormRowSelect } from "../index";

const sortOptions = ["latest", "oldest", "a-z", "z-a"];
const purposeOptions = ["prayer", "baptism", "visitation", "other"];

export const RequestSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "all") {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    router.push(`${pathname}?${createQueryString(name, value)}`);
  };

  const handleClearFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(pathname);
  };

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
      <form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        <div className="w-full">
          <FormRowSelect
            labelText="search purpose"
            name="purpose"
            value={searchParams.get("purpose") || "all"}
            handleChange={handleSearch}
            list={["all", ...purposeOptions]}
          />
        </div>

        <div className="w-full">
          <FormRowSelect
            labelText="sort"
            name="sort"
            value={searchParams.get("sort") || "latest"}
            handleChange={handleSearch}
            list={sortOptions}
          />
        </div>

        <button
          className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 px-4 rounded-xl transition-colors border border-red-200"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </form>
    </div>
  );
};
