import { Posts } from "./Posts";

export const PostsContainer = ({ posts = [], totalPost = 0 }) => {
  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-sm mt-8">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl text-slate-400">📄</span>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">No Posts Found</h2>
        <p className="text-slate-500 max-w-md">There are currently no news posts published. Click "Publish Content" in the sidebar to create your first post.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6 px-1">
        <h5 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
          {totalPost} Published Post{posts.length > 1 && "s"}
        </h5>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {posts.map((post) => {
          return <Posts key={post._id} {...post} />;
        })}
      </div>
      
      {/* Pagination component logic would go here if needed later */}
    </div>
  );
};
