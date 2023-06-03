import "./Search.css";
import React, { useEffect, useState } from "react";

/*
1 - Search component is used for Search field to display. Using this user can enter the data they are searching for.
*/
const Search = ({
  data,
  setSearchArr,
  start,
  deleteArr,
  setDummyArr,
  searchArr,
  setNoData,
  inputArr,
  setSearchValue,
  searchValue,
}) => {
  const [debounceTimer, setDebounceTimer] = useState();
  // const [searchValue, setSearchValue] = useState("");
  // const [searchValueParent, setSearchValueParent] = useState(0);

  useEffect(() => {
    searchPagination(start);
  }, [searchArr, deleteArr, start, inputArr, data]);

  /**
   *
   * @param {number} startValue
   * Inside this function this logic is for pagination - one for search results pagination (10 records)
   */
  const searchPagination = (startValue) => {
    let tempArr = [];

    if (searchArr.length) {
      for (let i = 0; i < searchArr.length; i++) {
        if (deleteArr.includes(searchArr[i].id) === true) {
          searchArr.splice(i, 1);
          setSearchArr(searchArr);
          i--;
        } else {
          tempArr.push(searchArr[i]);
        }
      }
      if (tempArr.length > 10) {
        const newTempArr = [];
        for (let i = startValue * 10 - 1; i >= startValue * 10 - 10; i--) {
          if (i >= tempArr.length) {
            continue;
          } else {
            newTempArr.unshift(tempArr[i]);
          }
        }
        setDummyArr(newTempArr);
        return;
      } else {
        setDummyArr(tempArr);
        return;
      }
    }
  };

  /**
   *
   * @param {string} value
   *  After 800msec, the searchValueFunc() calls and the matching result data will update to the searchArr.
   */
  const searchValueFunc = (value) => {
    const temp = value.toLowerCase();
    let tempSearchArr = [];

    tempSearchArr = data.filter((item) => {
      return (
        item.name.toLowerCase().match(temp) ||
        item.email.toLowerCase().match(temp) ||
        item.role.toLowerCase().match(temp)
      );
    });
    setSearchArr(tempSearchArr);
  };

  /**
  * This useEffect is used for the Debounce technique.Whenever we are searching the word, it waits for the 800msec to search the data and render. It decreases the number of unwanted 
    re-renders.
  */
  useEffect(() => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }
    const newTimer = setTimeout(() => {
      searchValueFunc(searchValue);
    }, 800);

    setDebounceTimer(newTimer);
  }, [searchValue]);

  return (
    <input
      type="text"
      className="main-search"
      name="search"
      placeholder="Search by name, email and role"
      onChange={(e) => {
        setSearchValue(e.target.value);
      }}
    />
  );
};
export default Search;
