import React from 'react';
import { TDirection } from '../types';

interface IPropType {
  page: number;
  pageCount: number;
}

const Pagination = ({ page, pageCount }: IPropType) => {
  const isNextDisabled = (): boolean => {
    return page >= pageCount;
  };

  const isPrevDisabled = (): boolean => {
    return page <= 1;
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
