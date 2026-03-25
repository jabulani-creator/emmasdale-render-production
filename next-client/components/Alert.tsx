"use client";

import { useUIStore } from '../store/useUIStore';

export const Alert = () => {
    const { alertType, alertText } = useUIStore();
  return (
    <div className={`alert alert-${alertType}`}>{alertText}</div>
  )
}
