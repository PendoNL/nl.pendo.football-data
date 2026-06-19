'use strict';

/**
 * Resolve a BCP-47 locale for user-facing date/time formatting based on the
 * Homey's configured language, falling back to English when the language is
 * unavailable or not supported by Intl.
 *
 * Timezone is handled separately via this.homey.clock.getTimezone(); this only
 * controls the language of weekday/month names and 12h/24h time formatting.
 *
 * @param {object} homey - The Homey instance (this.homey)
 * @returns {string} A locale tag usable with toLocaleDateString/toLocaleTimeString
 */
function getLocale(homey) {
  const fallback = 'en';
  try {
    const language = homey.i18n.getLanguage();
    if (language && Intl.DateTimeFormat.supportedLocalesOf(language).length > 0) {
      return language;
    }
  } catch (err) {
    // Ignore and use the fallback below.
  }
  return fallback;
}

module.exports = { getLocale };
