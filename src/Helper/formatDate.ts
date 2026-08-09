// export const formatDate = (date: string) =>
//   new Date(date).toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
export const formatDate =(date: string) => new Date(date).toLocaleString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
});
