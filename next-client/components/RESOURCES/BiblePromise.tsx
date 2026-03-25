import React from "react";
import { FaBookOpen } from "react-icons/fa";

const BiblePromise = () => {
  return (
    <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 text-xl shrink-0">
          <FaBookOpen />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Promise for Today</h3>
          <p className="text-sm text-slate-500">Daily inspiration from Scripture</p>
        </div>
      </div>
      
      <div className="flex-grow bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center p-4">
        <iframe
          title="promise"
          src="https://www.biblepromise.net/BiblePromiseForToday"
          frameBorder={0}
          scrolling="no"
          className="w-full h-[150px] mix-blend-multiply"
        ></iframe>
      </div>
    </section>
  );
};

export default BiblePromise;
