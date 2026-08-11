"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { UserData } from "../types";
import { initialUserData, loadUserData, saveUserData } from "../services/storage";

type UserContextValue = { data: UserData; ready: boolean; update: (fn: (current: UserData) => UserData) => void; toast: string; notify: (message: string) => void };
const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<UserData>(initialUserData);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => { loadUserData().then((value) => { setData(value); setReady(true); }); }, []);
  useEffect(() => { if (ready) saveUserData(data); }, [data, ready]);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = data.settings.theme;
    root.dataset.font = data.settings.fontSize;
    root.dataset.animations = String(data.settings.animations);
  }, [data.settings]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2400); };
  const value = useMemo(() => ({ data, ready, update: setData, toast, notify }), [data, ready, toast]);
  return <UserContext.Provider value={value}>{children}{toast && <div className="toast" role="status">{toast}</div>}</UserContext.Provider>;
}

export function useUser() {
  const value = useContext(UserContext);
  if (!value) throw new Error("useUser must be used inside UserProvider");
  return value;
}
