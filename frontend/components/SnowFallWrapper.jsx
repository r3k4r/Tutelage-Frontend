'use client'
import SnowFall from 'react-snowfall';

function SnowFallWrapper() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based, December is 11, January is 0
  const currentDay = currentDate.getDate();

  // Show snowfall from December 21st to January 6
  const isHolidaySeason = (currentMonth === 11 && currentDay >= 21) || (currentMonth === 0 && currentDay === 6);

  if (!isHolidaySeason) {
    return null;
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <SnowFall snowflakeCount={500}/>
    </div>
  );
}

export default SnowFallWrapper;
