"use client";

import moment from "moment";
import { MdPlace } from "react-icons/md";
import { AiTwotoneClockCircle } from "react-icons/ai";
import { useDataStore } from "../../store/useDataStore";
import Image from "next/image";
import { FaTrash, FaCalendarAlt, FaEdit } from "react-icons/fa";
import Link from "next/link";

export const Events = ({
  _id,
  eventDate,
  venue,
  time,
  eventPhoto,
  eventTitle,
}: any) => {
  let displayDate = eventDate ? moment(eventDate).format("MMM Do, YYYY") : "Upcoming";
  let Time = moment(time, "HH:mm:ss").format("hh:mm A");
  const { deleteEvent } = useDataStore();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      
      {/* Image Header */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
        {eventPhoto ? (
          <Image 
            src={eventPhoto} 
            alt={eventTitle || "Event"} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <span className="text-4xl">📅</span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-slate-700 shadow-sm">
          <FaCalendarAlt className="text-teal-600" />
          {displayDate}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h5 className="text-lg font-bold text-slate-900 mb-4 leading-tight line-clamp-2">
          {eventTitle}
        </h5>
        
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <AiTwotoneClockCircle />
            </div>
            <span className="font-medium">{Time}</span>
          </div>
          
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <MdPlace />
            </div>
            <span className="font-medium line-clamp-1">{venue}</span>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
        <Link 
          href={`/dashboard/edit-content/event/${_id}`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white hover:text-amber-600 rounded-lg transition-colors border border-transparent hover:border-amber-200"
        >
          <FaEdit /> Edit
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this event?")) {
              deleteEvent(_id);
            }
          }}
        >
          <FaTrash /> Delete
        </button>
      </div>

    </div>
  );
};
