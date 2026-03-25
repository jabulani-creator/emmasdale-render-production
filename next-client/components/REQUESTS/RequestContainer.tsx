import { SingleRequest } from "./SingleRequest";

export const RequestContainer = ({ requests = [], totalRequests = 0 }: { requests?: any[], totalRequests?: number }) => {
  if (requests.length === 0) {
    return (
      <div className="py-12 text-center bg-slate-50 rounded-xl border border-slate-200 border-dashed">
        <h2 className="text-xl font-semibold text-slate-500">No requests found...</h2>
        <p className="text-slate-400 mt-2">Try adjusting your search filters.</p>
      </div>
    );
  }

  return (
    <div>
      <h5 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">
        {totalRequests} Request{totalRequests !== 1 && "s"} Found
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((request) => {
          return <SingleRequest key={request._id} {...request} />;
        })}
      </div>
    </div>
  );
};
