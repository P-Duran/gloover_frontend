export function hashCode(str: string): number {
  // java String#hashCode
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

export function intToRGB(i: number): string {
  var c = (i & 0x00ffffff).toString(16).toUpperCase();

  return "#" + "00000".substring(0, 6 - c.length) + c;
}

export const interpolateColors = function (
  color1: string,
  color2: string,
  factor = 0.5
) {
  const c1 = color1
    .substring(4)
    .replace(")", "")
    .split(",")
    .map((n) => parseFloat(n));
  const c2 = color2
    .substring(4)
    .replace(")", "")
    .split(",")
    .map((n) => parseFloat(n));
  let result = c1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (c2[i] - c1[i]));
  }
  return "rgb(" + result.join(",") + ")";
};
