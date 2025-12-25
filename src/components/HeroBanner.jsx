import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "./banner.css";


export default function AnnouncementBar() {
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

  // Auto slide
  useEffect(() => {
    if (announcements.length === 0) return;

    const timer = setInterval(() => {
      next();
    }, 4000);

    return () => clearInterval(timer);
  }, [index, announcements]);

  const next = () => {
    setIndex((prev) => (prev + 1) % announcements.length);
  };

  const prev = () => {
    setIndex((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );
  };

  if (announcements.length === 0) return null;

  return (
    <div className="bg-transparent border-0 py-2 mb-5">
      <div className="container d-flex align-items-center justify-content-between">

        {/* Previous */}
        <button className="hover-circle-btn" onClick={prev}>
          ‹
        </button>

        {/* Image */}
        <div className="flex-grow-1 text-center px-3 ">
          <img
            src={announcements[index].image_url}
            alt={announcements[index].title || "announcement"}
            style={{
              maxHeight: "500px",
              width: "auto",
              objectFit: "fill",
            }}
          />
        </div>

        {/* Next */}
        <button className="hover-circle-btn" onClick={next}>
          ›
        </button>

      </div>
    </div>
  );
}
