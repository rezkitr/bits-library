export const dateFormatter = (date, long = true) => {
  const d = new Date(date);

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  let formattedMonth = "";

  if (long) {
    formattedMonth = monthNames[d.getMonth()];
  } else {
    formattedMonth = monthNames[d.getMonth()].substr(0, 3);
  }

  return `${d.getDate()} ${formattedMonth} ${d.getFullYear()}`;
};
