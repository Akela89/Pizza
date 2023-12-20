import React from 'react';
import styles from './Serach.module.scss';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';

function Search() {
  const [value, setValue] = React.useState('');
  const { searchValue, setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  const onClickerClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 250),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        height="24"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" x2="16.65" y1="21" y2="16.65" />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        type="text"
        placeholder="Поиск пиццы"
      />
      {searchValue && (
        <svg
          onClick={onClickerClear}
          className={styles.clear}
          xmlns="http://www.w3.org/2000/svg"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 128 128">
          <g>
            <polygon points="82.4,40 64,58.3 45.6,40 40,45.6 58.3,64 40,82.4 45.6,88 64,69.7 82.4,88 88,82.4 69.7,64 88,45.6  " />
            <path d="M1,127h126V1H1V127z M9,9h110v110H9V9z" />
          </g>
        </svg>
      )}
    </div>
  );
}

export default Search;
