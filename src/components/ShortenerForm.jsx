import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { logEvent } from "../middleware/logger";
import generateShortcode from "../utils/generateShortcode";

const ShortenerForm = () => {
  const [inputs, setInputs] = useState([{ url: "", validity: "", code: "" }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  const handleAdd = () => {
    if (inputs.length >= 5) return;
    setInputs([...inputs, { url: "", validity: "", code: "" }]);
  };

  const handleSubmit = () => {
    const newResults = [];
    const now = new Date();
    const storedLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];

    inputs.forEach(({ url, validity, code }) => {
      if (!url.startsWith("http://") && !url.startsWith("https://")) return;
      if (validity && isNaN(validity)) return;
      const shortcode = code || generateShortcode();
      const exists = storedLinks.find((l) => l.shortcode === shortcode);
      if (exists) return;
      const expiry = new Date(now.getTime() + (parseInt(validity || 30) * 60000));
      const newLink = {
        shortcode,
        originalUrl: url,
        createdAt: now,
        expiresAt: expiry,
        clicks: []
      };
      storedLinks.push(newLink);
      newResults.push(newLink);
      logEvent("Shortened", newLink);
    });

    localStorage.setItem("shortLinks", JSON.stringify(storedLinks));
    setResults(newResults);
  };

  return (
    <Box p={3}>
      <Typography variant="h4">URL Shortener</Typography>
      {inputs.map((input, i) => (
        <Box key={i} display="flex" gap={2} my={1}>
          <TextField label="Long URL" value={input.url} onChange={(e) => handleChange(i, "url", e.target.value)} fullWidth />
          <TextField label="Validity (min)" value={input.validity} onChange={(e) => handleChange(i, "validity", e.target.value)} />
          <TextField label="Custom Shortcode" value={input.code} onChange={(e) => handleChange(i, "code", e.target.value)} />
        </Box>
      ))}
      <Button onClick={handleSubmit} variant="contained">SHORTEN URLS</Button>
      <Button onClick={handleAdd} style={{ marginLeft: 10 }}>+ ADD ANOTHER</Button>
      <Typography variant="h6" mt={3}>Results:</Typography>
      {results.map((r, i) => (
        <Box key={i}>
          <a href={`http://localhost:3000/${r.shortcode}`}><b>http://localhost:3000/{r.shortcode}</b></a> → {r.originalUrl}
          <Typography variant="body2">Expires at: {new Date(r.expiresAt).toLocaleString()}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ShortenerForm;