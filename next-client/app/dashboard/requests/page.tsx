"use client";

import { useEffect, useState, Suspense } from "react";
import { RequestContainer, RequestSearch } from "../../../components";
import { useDataStore } from "../../../store/useDataStore";
import { useSearchParams } from "next/navigation";

function RequestContent() {
  const { getRequests, requests, totalRequests, isLoading } = useDataStore();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const search = searchParams.get("search") || "";
      const purpose = searchParams.get("purpose") || "all";
      const sort = searchParams.get("sort") || "latest";
      
      getRequests({ search, purpose, sort });
    }
  }, [searchParams, mounted, getRequests]);

  if (!mounted) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-slate-100 pb-6">
        <h3 className="text-2xl font-bold text-slate-900">Prayer Requests</h3>
        <p className="text-slate-500 mt-1">Manage and view prayer requests submitted by the congregation.</p>
      </div>

      <div className="space-y-8">
        <RequestSearch />
        {isLoading ? (
          <div className="py-12 text-center text-slate-500 animate-pulse">Loading requests...</div>
        ) : (
          <RequestContainer requests={requests} totalRequests={totalRequests} />
        )}
      </div>
    </div>
  );
}

export default function Request() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-slate-500">Loading requests...</div>}>
      <RequestContent />
    </Suspense>
  );
}