import React, { useState } from 'react';

const ReadMore = ({ text, maxLength }) => {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div>
      <p>
        {isReadMore ? text.slice(0, maxLength) : text}
        {text.length > maxLength && (
          <span onClick={toggleReadMore} style={{ color: 'blue', cursor: 'pointer' }}>
            {isReadMore ? '...Read more' : ' Show less'}
          </span>
        )}
      </p>
    </div>
  );
};

export default ReadMore;
