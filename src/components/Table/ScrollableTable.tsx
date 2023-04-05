import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../../types/user';

interface ScrollableTableProps {
  data: User[];
  columns: string[];
}

const ScrollableTable: React.FC<ScrollableTableProps> = ({ data, columns }) => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number>(-1);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' && selectedRowIndex > 0) {
      setSelectedRowIndex(selectedRowIndex - 1);
    } else if (event.key === 'ArrowDown' && selectedRowIndex < data.length - 1) {
      setSelectedRowIndex(selectedRowIndex + 1);
    }
  }, [data.length, selectedRowIndex]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="table-container">
      <table className="table table-hover table-bordered table-responsive">
        <thead className="thead-light">
          <tr>
            {_.map(columns,(col: string, index: number) => (
              <th key={index} className="text-truncate">{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_.map(data,(user: User, index: number) => (
            <tr key={index} className={index === selectedRowIndex ? 'highlight' : ''}>
              {_.map(_.values(user),(value, index) => (
                <td key={index} className="text-truncate">{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrollableTable;