import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import HeroBanner from "../components/HeroBanner";
import "./images.css";

export default function Home() {
  const [mode, setMode] = useState("category"); // 👈 "category" or "brand"
  const [groups, setGroups] = useState([]);
  const [groupImages, setGroupImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // 1. Fetch group (category or brand) with image_url
      const { data, error } = await supabase
        .from("products")
        .select(`${mode}, image_url`)
        .eq("found", true); // 👈 only products that are found

      if (error) {
        console.error("Error fetching:", error);
        setGroups([]);
        setLoading(false);
        return;
      }

      // 2. Deduplicate (categories or factories)
      const dedup = Array.from(new Set(data.map((r) => r[mode]).filter(Boolean)));
      setGroups(dedup);

      // 3. Pick one image per group
      const groupImgMap = {};
      dedup.forEach((g) => {
        const product = data.find((p) => p[mode] === g && p.image_url);
        groupImgMap[g] =
          product?.image_url ||
          "https://via.placeholder.com/400x250?text=" + g;
      });
      setGroupImages(groupImgMap);

      setLoading(false);
    }

    loadData();
  }, [mode]);

  if (loading) return <p>Loading {mode}s...</p>;

  return (
    <>
   

    <div className="container mt-4">
      <h2 className="mb-4 text-center gaby-name">
        <span style={{ color: "#e92a46ff" }}>G</span>
        aby 
        Store
      </h2>

       <HeroBanner />
      <div className="text-center mb-4">
        <button
          className={`btn me-2 ${mode === "category" ? "btn-dark" : "btn-outline-dark"}`}
          onClick={() => setMode("category")}
        >
          Category
        </button>
        <button
          className={`btn ${mode === "brand" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setMode("brand")}
        >
          Brand
        </button>
      </div>

      <h3 className="mb-3">Shop by {mode}</h3>
      <div className="row">
        {groups.map((g) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={g}>
            <Link
              to={`/${mode}/${encodeURIComponent(g)}`} // 👈 dynamic link
              className="text-decoration-none"
            >
              <div className="card shadow-lg h-100 border-0">
                <div style={{height: 290, overflow: 'hidden'}}>
              <img src={groupImages[g]} alt={g} className="card-img-center product-image"/>
            </div>
                <div className="card-body text-center">
                  <h5 className="card-title text-dark">{g}</h5>
                  <button className="btn btn-outline-primary btn-sm">
                    Explore
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
