// Retrieve values from localStorage with proper error handling
const external_conf = localStorage.getItem("pageper_external_conf");
const defaults_conf = localStorage.getItem("pageper_defaults"); // Note: this key appears to be duplicated

// First parse the JSON strings if they exist
let parsedExternalConf;
let parsedDefaultsConf;

try {
  parsedExternalConf = external_conf ? JSON.parse(external_conf) : null;
} catch (e) {
  console.error("Failed to parse external_conf:", e);
  parsedExternalConf = null;
}

try {
  parsedDefaultsConf = defaults_conf ? JSON.parse(defaults_conf) : null;
} catch (e) {
  console.error("Failed to parse defaults_conf:", e);
  parsedDefaultsConf = null;
}

// Now use the parsed objects (or fallback) safely
const user_pref = parsedExternalConf || parsedDefaultsConf || {}; // Use empty object as final fallback

export default user_pref;
