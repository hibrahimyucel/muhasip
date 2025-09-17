"use client";
import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: string | object) {
  try {
    const saved = localStorage.getItem(key);
    const initial = saved ? JSON.parse(saved) : "";
    return initial || defaultValue;
  } catch {
    return defaultValue;
  }
}

export const useLocalStorage = (key: string, defaultValue: string | object) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
