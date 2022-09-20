import React from 'react';
import { TDirection } from '../types';

const Pagination = () => {
  const isNextDisabled = (): boolean => {
    return false;
  };

  const isPrevDisabled = (): boolean => {
    return true;
  };

  const handlePaginate = async (direction: TDirection) => {
    if (direction === 1 && isNextDisabled()) {
      return;
    }

    if (direction === -1 && isPrevDisabled()) {
      return;
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <button
        onClick={() => handlePaginate(-1)}
        className={`${'bg-primary py-2 px-4 text-white w-24 rounded'} ${
          isPrevDisabled() ? 'disabled' : ''
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => handlePaginate(1)}
        className={`${'bg-primary py-2 px-4 text-white w-24 rounded ml-4'} ${
          isNextDisabled() ? 'disabled' : ''
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
