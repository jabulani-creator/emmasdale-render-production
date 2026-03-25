import { HealthContainer } from "../../../components"

async function getDashboardHealth(searchParams) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  // Construct query string based on search params
  const params = new URLSearchParams();
  if (searchParams?.search) params.append("search", searchParams.search);
  if (searchParams?.sort) params.append("sort", searchParams.sort);
  if (searchParams?.page) params.append("page", searchParams.page);
  
  const queryString = params.toString() ? `?${params.toString()}` : "";
  
  const healthRes = await fetch(`${baseUrl}/health${queryString}`, { next: { revalidate: 0 } }).catch(() => null);
  const healthData = healthRes?.ok ? await healthRes.json() : { healthPosts: [], totalHealthPost: 0 };

  return {
    healthPosts: healthData.healthPosts || [],
    totalHealthPost: healthData.totalHealthPost || 0
  };
}

export default async function AllHealth({ searchParams }) {
  const { healthPosts, totalHealthPost } = await getDashboardHealth(searchParams);

  return (
     <>
       <HealthContainer healthPosts={healthPosts} totalHealthPost={totalHealthPost} />
     </>
  )
}
