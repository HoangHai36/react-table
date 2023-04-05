import _ from 'lodash';
type SearchInputProps = {
    onSearchChange: (searchQuery: string) => void;
};

export const SearchInput: React.FC<SearchInputProps> = ({ onSearchChange }) => {
    const SEARCH_DELAY = 1000;
    const handleSearchDebounced = _.debounce((value: string): void => {
        onSearchChange(value);
    }, SEARCH_DELAY);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        handleSearchDebounced(value);
    };

    return (
        <div className="tb-search">
            <input type="text" placeholder="Search.." className="form-control" onChange={handleSearchChange} />
        </div>
    );
};