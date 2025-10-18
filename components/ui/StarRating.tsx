
import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex justify-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => onRatingChange(star)}
          className="focus:outline-none transform transition-transform duration-150 hover:scale-125 active:scale-110"
          aria-label={`Rate ${star} stars`}
        >
          <StarIcon
            className={`w-8 h-8 ${
              (hoverRating || rating) >= star
                ? 'text-yellow-400'
                : 'text-gray-400 dark:text-gray-600'
            } transition-colors duration-200`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
