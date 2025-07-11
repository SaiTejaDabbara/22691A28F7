import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { logEvent } from "../middleware/logger";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];
    const found = storedLinks.find((link) => link.shortcode === shortcode);

    if (!found) {
      alert("Short link not found or expired");
      navigate("/");
      return;
    }

    const now = new Date();
    const expiry = new Date(found.expiresAt);
    if (now > expiry) {
      alert("Link has expired");
      navigate("/");
      return;
    }

    found.clicks.push({
      timestamp: now,
      source: window.location.hostname
    });
    localStorage.setItem("shortLinks", JSON.stringify(storedLinks));
    logEvent("Redirect", { shortcode, to: found.originalUrl });
    window.location.href = found.originalUrl;
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;