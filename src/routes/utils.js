/**
 * @typedef Date date
 * @type String
 * */
export const formatDate = (date) => {
  return date.toLocaleString("default", {month: "long", year: "numeric"});
}
