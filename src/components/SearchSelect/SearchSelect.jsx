import React, { useEffect, useState } from "react";

import "./styles.scss";

const SearchSelect = ({
  options,
  setSelectedItem,
  placeholder,
  disabled,
  styles,
}) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const searchList = () => {
    const result = Object.values(options).filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
    setResults(result);
  };

  useEffect(() => {
    setQuery("");
  }, [options]);

  return (
    <div
      className={`autocomplete ${styles ? "custom-autocomplete" : ""}`}
      // style={styles}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="autocomplete-input"
        value={query}
        disabled={disabled}
        onChange={(e) => {
          setQuery(e.target.value);
          searchList();
          setDropdownVisible(true);
        }}
      />
      {dropdownVisible && (
        <div className="autocomplete-dropdown">
          <ul className="autocomplete-search-results-list">
            {results.map((result, index) => (
              <li
                className="autocomplete-search-result"
                key={result}
                onClick={() => {
                  setSelectedItem({ id: index, label: result });
                  setQuery(result);
                  setDropdownVisible(false);
                }}
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSelect;
