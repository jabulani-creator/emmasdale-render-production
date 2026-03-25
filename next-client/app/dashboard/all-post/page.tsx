import { PostsContainer } from "../../../components";

async function getDashboardPosts(searchParams) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  
  // Construct query string based on search params
  const params = new URLSearchParams();
  if (searchParams?.search) params.append("search", searchParams.search);
  if (searchParams?.sort) params.append("sort", searchParams.sort);
  if (searchParams?.page) params.append("page", searchParams.page);
  
  const queryString = params.toString() ? `?${params.toString()}` : "";
  
  const postsRes = await fetch(`${baseUrl}/posts${queryString}`, { next: { revalidate: 0 } }).catch(() => null);
  const postsData = postsRes?.ok ? await postsRes.json() : { posts: [], totalPost: 0 };

  return {
    posts: postsData.posts || [],
    totalPost: postsData.totalPost || 0
  };
}

export default async function AllPost({ searchParams }) {
  const { posts, totalPost } = await getDashboardPosts(searchParams);

  return (
    <>
      <PostsContainer posts={posts} totalPost={totalPost} />
    </>
  );
}
