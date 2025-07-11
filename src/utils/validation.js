

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidShortcode = (code) => {
  return /^[a-zA-Z0-9]{3,10}$/.test(code); 
};

export const isValidMinutes = (value) => {
  return /^\d+$/.test(value);
};
