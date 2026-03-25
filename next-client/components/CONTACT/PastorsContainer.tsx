import Pastor from "./Pastor";
import { FaUserFriends } from "react-icons/fa";

const PastorsContainer = ({ pastors = [] }) => {
  if (pastors.length === 0) {
    return (
      <div className="bg-slate-50 rounded-3xl p-12 text-center border border-slate-100 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-400 text-2xl mb-4">
          <FaUserFriends />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No Leaders Found</h3>
        <p className="text-slate-500 max-w-md mx-auto">There are currently no profiles listed in this department.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-start gap-x-8 gap-y-16 max-w-[1200px] mx-auto">
      {pastors.map((leader) => {
        return (
          <div key={leader._id} className="flex justify-center">
            <Pastor {...leader} />
          </div>
        );
      })}
    </div>
  );
};

export default PastorsContainer;
