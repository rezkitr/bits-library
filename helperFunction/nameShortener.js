export const nameShortener = (name, limit) => {
  let shortenName = "";
  const nameLength = name.length;

  if (nameLength >= limit) {
    shortenName = name.substring(0, limit - 3) + "...";
  } else {
    shortenName = name;
  }
  return shortenName;
};
