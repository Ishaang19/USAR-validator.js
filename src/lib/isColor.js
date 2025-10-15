import assertString from './util/assertString'; 

import merge from './util/merge'; 

 

// Hex color patterns 

const hexColor = /^#?([0-9A-F]{3}|[0-9A-F]{6})$/i; 

const hexColorWithAlpha = /^#?([0-9A-F]{4}|[0-9A-F]{8})$/i; 

 

// RGB/RGBA patterns (both number and percentage formats) 

const rgbColor = /^rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*\)$/i; 

const rgbaColor = /^rgba\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*,\s*(0?\.\d+|1(\.0+)?|0(\.0+)?|1)\s*\)$/i; 

const rgbColorPercent = /^rgb\(\s*([0-9]%|[1-9][0-9]%|100%)\s*,\s*([0-9]%|[1-9][0-9]%|100%)\s*,\s*([0-9]%|[1-9][0-9]%|100%)\s*\)$/i; 

const rgbaColorPercent = /^rgba\(\s*([0-9]%|[1-9][0-9]%|100%)\s*,\s*([0-9]%|[1-9][0-9]%|100%)\s*,\s*([0-9]%|[1-9][0-9]%|100%)\s*,\s*(0?\.\d+|1(\.0+)?|0(\.0+)?|1)\s*\)$/i; 

 

// Modern space-separated RGB/RGBA format (CSS Color Module Level 4) 

const rgbColorModern = /^rgb\(\s*([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s+([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s+([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\s*(\/\s*(0?\.\d+|1(\.0+)?|0(\.0+)?|1|\d+%))?\s*\)$/i; 

const rgbColorPercentModern = /^rgb\(\s*([0-9]%|[1-9][0-9]%|100%)\s+([0-9]%|[1-9][0-9]%|100%)\s+([0-9]%|[1-9][0-9]%|100%)\s*(\/\s*(0?\.\d+|1(\.0+)?|0(\.0+)?|1|\d+%))?\s*\)$/i; 

 

// HSL/HSLA patterns 

const hslComma = /^hsl\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?\s*,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%)\s*,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%)\s*\)$/i; 

const hslaComma = /^hsla\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?\s*,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%)\s*,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%)\s*,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*\)$/i; 

const hslSpace = /^hsl\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?\s+((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%)\s+((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%)\s*(\/\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\s*\)$/i; 

 

const default_color_options = { 

format: null, // null means all formats, or can be 'hex', 'hexa', 'rgb', 'rgba', 'hsl', 'hsla' 

}; 

 

function testHex(str) { 

return hexColor.test(str); 

} 

 

function testHexa(str) { 

return hexColorWithAlpha.test(str); 

} 

 

function testRgb(str) { 

return rgbColor.test(str) || rgbColorPercent.test(str) || rgbColorModern.test(str) || rgbColorPercentModern.test(str); 

} 

 

function testRgba(str) { 

return rgbaColor.test(str) || rgbaColorPercent.test(str) || rgbColorModern.test(str) || rgbColorPercentModern.test(str); 

} 

 

function testHsl(str) { 

return hslComma.test(str) || hslSpace.test(str); 

} 

 

function testHsla(str) { 

return hslaComma.test(str) || hslSpace.test(str); 

} 

 

export default function isColor(str, options) { 

assertString(str); 

options = merge(options, default_color_options); 

 

const { format } = options; 

 

// If a specific format is requested, validate against that format only 

if (format) { 

switch (format.toLowerCase()) { 

case 'hex': 

return testHex(str); 

case 'hexa': 

return testHexa(str); 

case 'rgb': 

return testRgb(str); 

case 'rgba': 

return testRgba(str); 

case 'hsl': 

return testHsl(str); 

case 'hsla': 

return testHsla(str); 

default: 

throw new Error(`Invalid color format '${format}'`); 

} 

} 

 

// If no format specified, validate against all formats 

return testHex(str) || 

testHexa(str) || 

testRgb(str) || 

testRgba(str) || 

testHsl(str) || 

testHsla(str); 

} 

 