const url = require('url');

/**
 *
 * @param {string} data
 *
 * @returns {{
 *   method: string,
 *   route: url.UrlWithParsedQuery,
 *   headers: string[]
 * }}
 */
const getUrlHeaders = (data) => {
  data = data.toLowerCase();
  const dataArr = data.split('\r\n');
  const urlstring = url.parse(dataArr[0].split(' ')[1], true);
  urlstring.pathname = urlstring.pathname.replace(/\/$/, '');
  return {
    method: dataArr[0].split(' ')[0],
    route: urlstring,
    headers: dataArr.slice(1),
  };
};

module.exports = getUrlHeaders;
