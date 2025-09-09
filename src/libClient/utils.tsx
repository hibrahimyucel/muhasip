export const orderStr = (
  a: string,
  b: string,
  ascending: boolean = true,
): number => {
  if (ascending) {
    return a.localeCompare(b) > 0 ? 1 : -1;
  } else {
    return a.localeCompare(b) > 0 ? -1 : 1;
  }
};
