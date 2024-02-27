export const capitalizeWord = (word: string) => {
  return word[0].toUpperCase().concat(word.slice(1));
};

export const capitalize = (sentence: string) => {
  const words = sentence.split(" ");
  let result = [];
  for (var word of words) {
    result.push(capitalizeWord(word.trim()));
  }
  return result.join(" ");
};
