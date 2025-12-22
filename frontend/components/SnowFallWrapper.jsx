'use client'
import SnowFall from 'react-snowfall';

function SnowFallWrapper() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      <SnowFall snowflakeCount={500}/>
    </div>
  );
}

export default SnowFallWrapper;