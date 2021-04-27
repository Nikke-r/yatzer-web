import { useLazyQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react"
import { GET_ALL_USERS } from "../graphql/queries";
import { UserType } from "../types";

interface GetAllUsersQuery {
    getAllUsers: UserType[];
}

const useSearch = () => {
    const searchBarRef = useRef<HTMLDivElement>(null);
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState<UserType[]>([]);
    const [getAllUsers, { data, loading }] = useLazyQuery<GetAllUsersQuery>(GET_ALL_USERS);

    const handleInputChange = (event: { target: { value: string }}) => {
        if (event) {
            setSearchInput(event.target.value);
        }
    }

    useEffect(() => {
        if (searchInput !== '') {
            getAllUsers({ variables: { username: searchInput }});
        }
    }, [searchInput]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (data && data.getAllUsers) {
            setSearchResult(data.getAllUsers);
        }
    }, [data]);

    const clearSearchInput = () => setSearchInput('');

    return {
        searchBarRef,
        searchInput,
        searchResult,
        handleInputChange,
        clearSearchInput,
        loading,
    }
}

export default useSearch;