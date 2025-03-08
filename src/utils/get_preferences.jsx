/*    PERSONAL REMINDER TO MANAGE THE LOGIC OF RETRIEVING
 *    THE USER PREFERENCES FROM A OUTER SOURCE AND ITS FALLBACK 
 *    TO THE DEFAULT CONFIGURATION THROUGHT THE JSON STORED IN
 *    CONFIG
 *
 *    ON THIS FILE STRICTLY, NO OTHER RETRIEVING LOGIC SHOULD BE
 *    MANAGED OUT OF THIS FILE FOR CLEANESS AND MAINTAINABILITY
 *    PURPOSES 
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
  parsedDefaultsConf = defaults_conf ? defaults_conf : null;
} catch (e) {
  console.error("Failed to parse defaults_conf:", e);
  parsedDefaultsConf = null;
}

// Now use the parsed objects (or fallback) safely
const user_pref = parsedExternalConf || parsedDefaultsConf || {}; // Use empty object as final fallback

export default user_pref;
