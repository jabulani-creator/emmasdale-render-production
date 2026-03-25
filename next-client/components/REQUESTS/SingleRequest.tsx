"use client";

import moment from "moment";
import { useDataStore } from "../../store/useDataStore";
import { useState } from "react";
import { FaTrash, FaChevronDown, FaChevronUp, FaEnvelope, FaPhone, FaCalendarAlt } from "react-icons/fa";

interface RequestProps {
  _id?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  purpose?: string;
  createdAt?: string;
  message?: string;
  additionalInfo?: any;
}

export const SingleRequest = ({
  _id,
  name,
  firstName,
  lastName,
  email,
  phone,
  purpose = "general",
  createdAt,
  message,
  additionalInfo,
}: RequestProps) => {
  const { deleteRequest } = useDataStore();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const date = moment(createdAt).format("MMM Do, YYYY, h:mm a");
  const displayName = firstName ? `${firstName} ${lastName}` : name;
  
  // Parse additionalInfo if it was saved as a string
  let parsedInfo = {};
  if (additionalInfo) {
    if (typeof additionalInfo === 'string') {
      try { parsedInfo = JSON.parse(additionalInfo); } catch (e) {}
    } else {
      parsedInfo = additionalInfo;
    }
  }

  // Helper to format keys like "prayerRequest" to "Prayer Request"
  const formatKey = (key: string) => {
    const result = key.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
      
      {/* HEADER */}
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-xl uppercase shrink-0">
          {purpose.charAt(0)}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-bold text-slate-900">{displayName || "Anonymous"}</h4>
            <span className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-full uppercase tracking-wider">
              {purpose}
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            <FaCalendarAlt className="text-slate-400" /> {date}
          </p>
        </div>
      </div>

      {/* CORE CONTACT INFO */}
      <div className="p-6 bg-white flex flex-col gap-3 text-sm text-slate-700 border-b border-slate-100">
        {email && (
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-teal-600 text-lg" />
            <a href={`mailto:${email}`} className="hover:text-teal-600 transition-colors">{email}</a>
          </div>
        )}
        {phone && (
          <div className="flex items-center gap-3">
            <FaPhone className="text-teal-600 text-lg" />
            <a href={`tel:${phone}`} className="hover:text-teal-600 transition-colors">{phone}</a>
          </div>
        )}
      </div>

      {/* EXPANDABLE DETAILS */}
      <div className="p-6 bg-white flex-grow">
        {/* Always show message if it exists */}
        {message && (
          <div className="mb-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Message</p>
            <p className="text-slate-700 bg-slate-50 p-4 rounded-xl text-sm italic border border-slate-100">"{message}"</p>
          </div>
        )}

        {/* Dynamic Fields Toggle */}
        {Object.keys(parsedInfo).length > 0 && (
          <div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full py-2 text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors"
            >
              {isExpanded ? "Hide Details" : "View Full Request Details"}
              {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {isExpanded && (
              <div className="mt-4 space-y-4 animate-fade-in border-l-2 border-teal-200 pl-4">
                {Object.entries(parsedInfo).map(([key, val]) => {
                  if (!val || val === "") return null;
                  return (
                    <div key={key}>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {formatKey(key)}
                      </p>
                      <p className="text-sm text-slate-800 font-medium bg-slate-50 p-3 rounded-lg border border-slate-100">
                        {String(val)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS */}
      <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto flex justify-end">
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this request?")) {
              deleteRequest(_id);
            }
          }}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 rounded-xl text-sm font-bold transition-colors shadow-sm"
        >
          <FaTrash /> Delete
        </button>
      </div>

    </div>
  );
};
