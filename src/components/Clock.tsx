import { useState, useEffect } from 'react';

function CurrentDate() {
  const [date, setDate] = useState(getFormattedDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDate(getFormattedDate(now));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getFormattedDate(dateObj: Date) {
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  return (
    <p className="font-bold">{date}</p>
  );
}

const CurrentTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-lg font-bold"><strong>{time}</strong></p>
  );

};

export default CurrentDate; 
export { CurrentTime };
