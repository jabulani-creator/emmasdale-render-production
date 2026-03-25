import React from "react";
import { EventsContainer } from "../../../components";

async function getDashboardEvents() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
  const eventsRes = await fetch(`${baseUrl}/events`, { next: { revalidate: 0 } }).catch(() => null);
  const eventsData = eventsRes?.ok ? await eventsRes.json() : { events: [], totalEvents: 0, numOfEventsPages: 0 };

  return {
    events: eventsData.events || [],
    totalEvents: eventsData.totalEvents || 0,
    numOfEventsPages: eventsData.numOfEventsPages || 0
  };
}

export default async function AllEvents() {
  const { events, totalEvents, numOfEventsPages } = await getDashboardEvents();

  return (
    <>
      <EventsContainer 
        events={events} 
        totalEvents={totalEvents} 
        numOfEventsPages={numOfEventsPages} 
      />
    </>
  );
}
