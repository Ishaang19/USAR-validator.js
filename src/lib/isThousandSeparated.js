import assertString from './util/assertString';
import merge from './util/merge';

const default_thousand_separated_options = {
  thousands_separator: ',',
  decimal_separator: '.',
  allow_negatives: true,
};

export default function isThousandSeparated(str, options) {
  assertString(str);
  options = merge(options, default_thousand_separated_options);

  const { thousands_separator, decimal_separator, allow_negatives } = options;

  // Escape special regex characters
  const escapedThousandsSep = thousands_separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedDecimalSep = decimal_separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Build regex pattern
  // Pattern explanation:
  // ^(-?)                                    - optional negative sign
  // ([1-9]\\d{0,2}(escapedThousandsSep\\d{3})+|\\d{1,3})  - number with thousand separators OR 1-3 digit number
  // (escapedDecimalSep\\d+)?                 - optional decimal part
  // $

  const negativeSign = allow_negatives ? '-?' : '';

  // Pattern for numbers with thousand separators (e.g., 1,000 or 10,000 or 1,000,000)
  const numbersWithSeparators = [1-9]\\d{0,2}(${escapedThousandsSep}\\d{3})+;

  // Pattern for numbers without separators (only 1-3 digits are valid without separators)
  const numbersWithoutSeparators = '\\d{1,3}';

  // Combine both patterns
  const wholePart = (${numbersWithSeparators}|${numbersWithoutSeparators});

  // Optional decimal part
  const decimalPart = (${escapedDecimalSep}\\d+)?;

  const pattern = new RegExp(^${negativeSign}${wholePart}${decimalPart}$);

  return pattern.test(str);
}