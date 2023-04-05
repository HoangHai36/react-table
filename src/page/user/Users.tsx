import _ from 'lodash';
import { ChangeEvent, useEffect } from "react";
import Pagination from "../../components/Pagination/Pagination";
import ScrollableTable from "../../components/Table/ScrollableTable";
import columns from "../../data/columns";
import { useStore } from "../../state/storeHooks";
import { searchUsers } from "../../services/request";
import { store } from "../../state/store";
import { setCurrentPage, setPageSize, setQuerySearch, setUsers } from "./Users.slice";
import { UsersFilters } from "../../types/user";
import PageSizeSelector from '../../components/Form/Select/PageSizeSelector';
import { SearchInput } from '../../components/Form/Input/SearchInput';


const Users: React.FC = () => {
    const { data, currentPage, pageSize, querySearch } = useStore(({ users }) => users);
    const totalUser: number = 1000;
    const pageCount: number = Math.ceil(totalUser / pageSize);
    const startIndex: number = (currentPage - 1) * pageSize + 1;
    const endIndex: number = startIndex + pageSize - 1;
    useEffect(() => {
        async function fetchData() {
            try {
                let option: UsersFilters = {
                    _page: currentPage,
                    _limit: pageSize,
                }
                if (querySearch) option.firstName = querySearch;
                const response = await searchUsers(option);
                store.dispatch(setUsers(response));
            } catch (error) {
                console.log('Failed to fetch data: ', error);
            }
        }
        fetchData();
    }, [currentPage, pageSize, querySearch]);
    const handlePageChange = (pageNumber: number): void => {
        store.dispatch(setCurrentPage(pageNumber));
    };

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>): void => {
        const selectedPageSize = parseInt(event.target.value, 10);
        store.dispatch(setPageSize(selectedPageSize));
    };

    const showResult = (): string => `Showing ${startIndex} to ${endIndex} of ${totalUser} entries`;


    const handleSearchChange = (value: string): void => {
        store.dispatch(setQuerySearch(value));
    };
    return (
        <>
            <div className="container">
                <div className="header-wrap">
                    <PageSizeSelector pageSize={pageSize} handleSelectChange={handleSelectChange} />
                    <SearchInput onSearchChange={handleSearchChange} />
                </div>
                <ScrollableTable
                    columns={columns}
                    data={data}
                />
                <div className="pagination-container">
                    <Pagination
                        pageCount={pageCount}
                        currentPage={currentPage}
                        onChange={handlePageChange}
                    />
                </div>
                <div className="rows-count">{showResult()}</div>
            </div>
        </>
    );
};
export default Users;
