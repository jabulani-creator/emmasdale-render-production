"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaCalendarAlt, FaArrowLeft, FaShareAlt } from "react-icons/fa";
import { notFound } from "next/navigation";
import axios from "axios";

export default function SinglePostPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        const { data } = await axios.get(`${baseUrl}/posts/${id}`);
        setPost(data.post || data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-slate-500 font-bold">Loading Article...</p></div>;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50"><p className="text-red-500 font-bold">Article not found.</p></div>;
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link 
          href="/posts" 
          className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to All News
        </Link>

        {/* Article Header */}
        <header className="mb-10 text-center">
          <p className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-4">Church News</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
            {post.postTitle}
          </h1>
          <div className="flex items-center justify-center gap-4 text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-slate-400" />
              <span>{formattedDate}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-2 cursor-pointer hover:text-teal-600 transition-colors">
              <FaShareAlt /> Share
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.postPhoto && (
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mb-12 bg-slate-200">
            <Image 
              src={post.postPhoto} 
              alt={post.postTitle} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Article Body */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-12">
          <div className="prose prose-lg prose-slate max-w-none">
            {/* Split description by newlines to render proper paragraphs */}
            {post.postDesc ? post.postDesc.split('\n').map((paragraph: string, index: number) => (
              paragraph.trim() ? <p key={index} className="mb-6 leading-relaxed text-slate-700">{paragraph}</p> : null
            )) : <p>No description available.</p>}
          </div>
        </div>

      </article>
    </main>
  );
}