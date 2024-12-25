const CurrentDate = () => {
  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDay();
  const year = date.getFullYear();
  return (
    <span>
      {month} {day}, {year}
    </span>
  );
};
export const date = new Date();
export default CurrentDate;
