import React, { useEffect, useState } from "react";
import { Box, Typography, Divider } from "@mui/material";

const StatsPage = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("shortLinks")) || [];
    setLinks(stored);
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4">Shortened URL Statistics</Typography>
      {links.map((link, i) => (
        <Box key={i} my={2}>
          <Typography><a href={`/${link.shortcode}`}>/{link.shortcode}</a> → {link.originalUrl}</Typography>
          <Typography>Created: {new Date(link.createdAt).toLocaleString()}</Typography>
          <Typography>Expires: {new Date(link.expiresAt).toLocaleString()}</Typography>
          <Typography>Total Clicks: {link.clicks.length}</Typography>
          <Typography>Click Logs:</Typography>
          <ul>
            {link.clicks.map((c, j) => (
              <li key={j}>{new Date(c.timestamp).toLocaleString()} from {c.source}</li>
            ))}
          </ul>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default StatsPage;