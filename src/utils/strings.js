import stripIndent from "common-tags/lib/stripIndent";
import capitalize from "lodash/capitalize";
export { stripIndent };
export { capitalize };

export const slugify = function(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const toCamelCase = function(str) {
  // Lower cases the string
  return (
    str
      .toLowerCase()
      // Replaces any - or _ characters with a space
      .replace(/[-_]+/g, " ")
      // Removes any non alphanumeric characters
      .replace(/[^\w\s]/g, "")
      // Uppercases the first character in each group immediately following a space
      // (delimited by spaces)
      .replace(/ (.)/g, function($1) {
        return $1.toUpperCase();
      })
      // Removes spaces
      .replace(/ /g, "")
  );
};

export const stripString = function(string) {
  return string.replace(/[^\w\-]+/g, "");
};
