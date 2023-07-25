import React from 'react';

const timeToSeconds = (hour: number, minute: number, seconds: number) => {
    return(hour * 3600 + minute * 60 + seconds);
};

export default timeToSeconds;