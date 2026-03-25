import { Suspense } from "react";
import { RequestContainer, RequestSearch } from "../../../components";

async function getDashboardRequests(searchParams) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  // Construct query string based on search params
  const params = new URLSearchParams();
  if (searchParams?.purpose && searchParams.purpose !== "all") params.append("purpose", searchParams.purpose);
  if (searchParams?.sort) params.append("sort", searchParams.sort);
  if (searchParams?.page) params.append("page", searchParams.page);
  
  const queryString = params.toString() ? `?${params.toString()}` : "";
  
  const reqRes = await fetch(`${baseUrl}/contact${queryString}`, { next: { revalidate: 0 } }).catch(() => null);
  const reqData = reqRes?.ok ? await reqRes.json() : { requests: [], totalRequests: 0 };

  return {
    requests: reqData.requests || [],
    totalRequests: reqData.totalRequests || 0
  };
}

export default async function Request({ searchParams }) {
  const { requests, totalRequests } = await getDashboardRequests(searchParams);

  return (
    <>
      <Suspense fallback={<div>Loading search...</div>}>
        <RequestSearch />
      </Suspense>
      <RequestContainer requests={requests} totalRequests={totalRequests} />
    </>
  );
}
