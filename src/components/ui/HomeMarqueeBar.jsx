import React, { useEffect, useMemo, useState } from "react";
import MarqueeRtl from "../../components/MarqueeRtl";

const DEFAULT_ITEMS = [
  "24/7 PREMIUM SUPPORT",

];

export default function HomeMarqueeBar() {
  const API = (import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5000").replace(/\/$/, "");
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchHeaderSettings = async () => {
      try {
        const res = await fetch(`${API}/api/header-settings`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Header settings fetch failed");

        const data = await res.json();

        if (mounted) {
          setSettings(data?.data || data);
        }
      } catch (error) {
        console.error("Header settings error:", error);
        if (mounted) setSettings(null);
      }
    };

    fetchHeaderSettings();

    return () => {
      mounted = false;
    };
  }, [API]);

  const enabled = settings?.topBarEnabled ?? settings?.enabled ?? true;

  const items = useMemo(() => {
    const arr =
      settings?.announcementTexts ||
      settings?.topBarTexts ||
      settings?.items;

    if (!Array.isArray(arr)) return DEFAULT_ITEMS;

    const texts = arr
      .map((item) => {
        if (typeof item === "string") return item.trim();
        return String(item?.text || "").trim();
      })
      .filter(Boolean);

    return texts.length ? texts : DEFAULT_ITEMS;
  }, [settings]);

  if (!enabled) return null;

  return <MarqueeRtl interval={4000} items={items} />;
}