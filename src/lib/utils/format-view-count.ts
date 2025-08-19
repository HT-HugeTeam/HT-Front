export const formatViewCount = (count: number): string => {
  if (count >= 10000) {
    const man = Math.floor(count / 10000);
    return `${man}만회`;
  }
  return `${count}회`;
};
