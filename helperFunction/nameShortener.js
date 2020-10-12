export const nameShortener = (name) => {
  let shortenName = "";
  const nameLength = name.length;

  if (nameLength > 15) {
    shortenName = name.substring(0, 12) + "...";
  } else {
    shortenName = name;
  }
  return shortenName;
};
