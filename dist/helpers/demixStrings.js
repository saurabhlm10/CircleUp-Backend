"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function demixStrings(mixedString, pattern) {
    if (!pattern || pattern.length === 0) {
        throw new Error("Pattern must be provided and non-empty.");
    }
    let str1 = "";
    let str2 = "";
    let index1 = 0;
    let index2 = 0;
    for (const char of pattern) {
        if (char === "1") {
            str1 += mixedString[index1];
            index1++;
        }
        else if (char === "2") {
            str2 += mixedString[index2];
            index2++;
        }
    }
    // Append remaining characters from the mixed string
    str1 += mixedString.slice(index1);
    str2 += mixedString.slice(index2);
    return { str1, str2 };
}
exports.default = demixStrings;
