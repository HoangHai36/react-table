import { ChangeEvent } from 'react';

type PageSizeSelectorProps = {
  pageSize: number;
  handleSelectChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const PageSizeSelector: React.FC<PageSizeSelectorProps> = ({ pageSize, handleSelectChange }) => {
  return (
    <div className="num-rows">
      <div className="form-group">
        <select className="form-control" name="state" value={pageSize} onChange={handleSelectChange}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};
export default PageSizeSelector;