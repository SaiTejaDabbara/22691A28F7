export const logEvent = (type, data) => {
  const log = {
    type,
    data,
    timestamp: new Date().toISOString(),
  };
  const logs = JSON.parse(localStorage.getItem("logs")) || [];
  logs.push(log);
  localStorage.setItem("logs", JSON.stringify(logs));
};


// src/utils/generateShortcode.js
const generateShortcode = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
};

export default generateShortcode;
