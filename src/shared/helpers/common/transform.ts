export const firstLetterToUpperCase = (word: any): string | null => {
  if (!word) {
    return null;
  }

  let title: string;
  const possibleSeparators = ['-', '_'];
  const separator = possibleSeparators.filter((item: string) => {
    if (word.indexOf(item) > -1) {
      return item;
    }
  });

  if(separator && separator.length) {
    const wordParts = word.split(separator[0]);
    title = (wordParts.length > 1) ? wordParts[0] : word;
  } else {
    title = word;
  }

  return title.charAt(0).toUpperCase() + title.slice(1);
};
