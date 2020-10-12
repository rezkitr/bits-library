export const titleShortener = (title) => {
  let shortenTitle = "";
  const titleLength = title.length;

  if (titleLength > 35) {
    shortenTitle = title.substring(0, 30) + "...";
  } else {
    shortenTitle = title;
  }
  return shortenTitle;
};
