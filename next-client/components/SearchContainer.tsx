"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import Wrapper from "../app/assets/wrappers/SearchContainer";
import { FormRow, FormRowSelect } from "./index";

const sortOptions = ["latest", "oldest", "a-z", "z-a"];

export const SearchContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Create a local state to handle fast typing without stuttering the URL instantly
  const [localSearch, setLocalSearch] = useState(searchParams.get("search") || "");

  // Debounce logic for updating the URL
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = (e: any) => {
    const { name, value } = e.target;
    
    if (name === "search") {
      setLocalSearch(value);
      // Basic debounce implementation
      clearTimeout((window as any).searchTimeout);
      (window as any).searchTimeout = setTimeout(() => {
        router.push(`${pathname}?${createQueryString(name, value)}`);
      }, 500);
    } else {
      router.push(`${pathname}?${createQueryString(name, value)}`);
    }
  };

  const handleClearFilters = (e) => {
    e.preventDefault();
    setLocalSearch("");
    router.push(pathname);
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={handleSearch}
          />
          <FormRowSelect
            name="sort"
            value={searchParams.get("sort") || "latest"}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            onClick={handleClearFilters}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
