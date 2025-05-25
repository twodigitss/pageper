/*    PERSONAL REMINDER TO MANAGE THE LOGIC OF RETRIEVING
 *    THE USER PREFERENCES FROM A OUTER SOURCE AND ITS FALLBACK 
 *    TO THE DEFAULT CONFIGURATION THROUGHT THE JSON STORED IN
 *    CONFIG
 *
 *    ON THIS FILE STRICTLY, NO OTHER RETRIEVING LOGIC SHOULD BE
 *    MANAGED OUT OF THIS FILE FOR CLEANESS AND MAINTAINABILITY
 *    PURPOSES 
  *
  *    lmao i forgot this warning existed
 *
 * */

// Retrieve values from localStorage with proper error handling
const external_conf = localStorage.getItem("pageper_external_conf");
import defaults_conf from '@template'

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
  parsedDefaultsConf = defaults_conf ? JSON.parse(JSON.stringify(defaults_conf))  : null;
} catch (e) {
  console.error("Failed to parse defaults_conf:", e);
  parsedDefaultsConf = null;
}

// Parse the default config nicely if not external config
if (!parsedExternalConf && parsedDefaultsConf) {
  const templateAsString = JSON.stringify(parsedDefaultsConf, null, 2);
  localStorage.setItem("pageper_external_conf", templateAsString);
  console.log("Template configuration saved to localStorage");
}

// Now use the parsed objects (or fallback) safely
const user_pref = parsedExternalConf || parsedDefaultsConf || {}; // Use empty object as final fallback

export default user_pref;
