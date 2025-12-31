import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./banner.css";

export default function HeroBanner() {
  const [announcements, setAnnouncements] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function loadAnnouncements() {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .eq("active", true)
        .order("order", { ascending: true });

      if (!error) setAnnouncements(data || []);
    }

    loadAnnouncements();
  }, []);

  useEffect(() => {
    if (!announcements.length) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [index, announcements]);

  const next = () =>
    setIndex((prev) => (prev + 1) % announcements.length);

  const prev = () =>
    setIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );

  if (!announcements.length) return null;

  return (
    <div className="hero-banner mb-3">
      
      {/* Image */}
      <img
        src={announcements[index].image_url}
        alt={announcements[index].title || "announcement"}
        className="hero-banner-img"
      />

      {/* Controls */}
      <button className="hero-btn left" onClick={prev}>‹</button>
      <button className="hero-btn right" onClick={next}>›</button>
    </div>
  );
}
