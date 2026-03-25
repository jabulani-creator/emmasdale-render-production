"use client";

import { useState } from "react";
import moment from "moment";
import { useDataStore } from "../store/useDataStore";
import Image from "next/image";
import { FaTrash, FaCalendarAlt, FaEdit } from "react-icons/fa";
import Link from "next/link";

export const Posts = ({
  postTitle,
  postDesc,
  _id,
  createdAt,
  postPhoto,
}: {
  postTitle: string;
  postDesc: string;
  _id: string;
  createdAt: string;
  postPhoto: string;
}) => {
  const [readMore, setReadMore] = useState(false);
  let date = moment(createdAt).format("MMM Do, YYYY");
  const { deletePost } = useDataStore();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      
      {/* Image Header */}
      <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
        {postPhoto ? (
          <Image 
            src={postPhoto} 
            alt={postTitle || "Post"} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <span className="text-4xl">📸</span>
          </div>
        )}
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-slate-700 shadow-sm">
          <FaCalendarAlt className="text-teal-600" />
          {date}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <h5 className="text-lg font-bold text-slate-900 mb-3 leading-tight line-clamp-2">
          {postTitle}
        </h5>
        
        <p className="text-sm text-slate-600 mb-4 flex-grow leading-relaxed">
          {readMore ? postDesc : `${postDesc.substring(0, 120)}...`}
          {postDesc.length > 120 && (
            <button 
              onClick={() => setReadMore(!readMore)}
              className="ml-1 text-teal-600 font-semibold hover:text-teal-700"
            >
              {readMore ? "Show less" : "Read more"}
            </button>
          )}
        </p>
      </div>

      {/* Actions Footer */}
      <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/50 flex justify-between items-center">
        <Link 
          href={`/dashboard/edit-content/post/${_id}`}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-white hover:text-amber-600 rounded-lg transition-colors border border-transparent hover:border-amber-200"
        >
          <FaEdit /> Edit
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          onClick={() => {
            if (window.confirm("Are you sure you want to delete this post?")) {
              deletePost(_id);
            }
          }}
        >
          <FaTrash /> Delete
        </button>
      </div>

    </div>
  );
};
