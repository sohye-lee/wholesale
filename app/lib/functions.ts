export const capitalizeWord = (word: string) => {
  return word != "" ? word[0].toUpperCase().concat(word.slice(1)) : "";
};

export const capitalize = (sentence: string) => {
  const words = sentence.split(" ");
  let result = [];
  for (var word of words) {
    result.push(capitalizeWord(word.trim()));
  }
  return result.join(" ");
};

export const salePrice = (base: number, discounted: number): number => {
  return base && base > 0 ? Math.round((base - discounted) / base) : 0;
};
