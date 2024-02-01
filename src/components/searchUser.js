import React, { useEffect, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const SearchUser = (props) => {
    const { users, onSelectUser } = props
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (selected.length > 0) {
            onSelectUser(selected[0]);
            setSelected([]);
        }
    }, [selected, onSelectUser]);

    const handleSearch = (query) => {
        const filteredResults = users.filter((item) =>
            item.toLowerCase().includes(query.toLowerCase())
        );
        return filteredResults;
    };

    return (
        <Typeahead
            id="search-component"
            labelKey="name"
            options={users}
            placeholder="Buscar..."
            selected={selected}
            onChange={setSelected}
            onSearch={(query) => handleSearch(query)}
            className="form-control bg-light"
        />
    );
};
export default SearchUser;