export const formatDateToString = (date: Date): string => {
  const dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
  const MM = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
  const yyyy = date.getFullYear();
  // create the format you want
  return (dd + "." + MM + "." + yyyy);
};
