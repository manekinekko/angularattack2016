/**
 * Compute the distance between two strings.
 *
 * @param  {String} str1 The first string
 * @param  {String} str2 The second string
 * @return {Number}      The distance between str1 and str2.
 */
export function Levenshtein(str1, str2) {
  // base cases
  if (str1 === str2) return 0;
  if (str1.length === 0) return str2.length;
  if (str2.length === 0) return str1.length;

  // two rows
  var prevRow  = new Array(str2.length + 1),
      curCol, nextCol, i, j, tmp;

  // initialise previous row
  for (i=0; i<prevRow.length; ++i) {
    prevRow[i] = i;
  }

  // calculate current row distance from previous row
  for (i=0; i<str1.length; ++i) {
    nextCol = i + 1;

    for (j=0; j<str2.length; ++j) {
      curCol = nextCol;

      // substution
      nextCol = prevRow[j] + ( (str1.charAt(i) === str2.charAt(j)) ? 0 : 1 );
      // insertion
      tmp = curCol + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }
      // deletion
      tmp = prevRow[j + 1] + 1;
      if (nextCol > tmp) {
        nextCol = tmp;
      }

      // copy current col value into previous (in preparation for next iteration)
      prevRow[j] = curCol;
    }

    // copy last col value into previous (in preparation for next iteration)
    prevRow[j] = nextCol;
  }

  return nextCol;
}
