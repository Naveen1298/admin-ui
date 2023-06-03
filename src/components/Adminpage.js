import React, { useEffect, useState } from "react";
import ipConfig from "../ipConfig.json";
import "./Adminpage.css";
import Button from "./Button";
import Search from "./Search";
import Table from "./Table";

const api = ipConfig.api;

/* 
Author : NAVEEN ALAPATI

1 - Adminpage is the main component where our core logic and other small components are added into it according to the logic.
2 - Here I have been generating the api data and rendering into the application with respective state change.
3 - And the 10 records for single page logic also using in it according to the respective button number / left arrow / right arrow 
    button clicked.
*/
const Adminpage = () => {
  // This is actual api data from the api.
  let [data, setData] = useState([]);

  //This is the constant api data that using to update the Empty field parameters in edit functionality.
  const [constantApiData, setConstantApiData] = useState([]);

  //This is also api data but after doing all delete operations, this dummyArr data will render according to pagination.
  let [dummyArr, setDummyArr] = useState([]);

  //This is used to check the which button is clicked and its number will be hold in it.
  let [start, setStart] = useState();

  //The data which should be deleted will insert those id's into this state.
  let [deleteArr, setDeleteArr] = useState([]);

  //The data which are resulted after entering in the search bar will hold in this state.
  const [searchArr, setSearchArr] = useState([]);

  //All the entries which are selected using checkbox are inserted into this state.
  const [check, setCheck] = useState([]);

  //The data which is editing, those id's are inserting in it.
  const [inputArr, setInputArr] = useState([]);

  //This state is used to render the " No Results Found " when no search values are matched.
  const [noData, setNoData] = useState(0);

  //The value which is entered in the search box will be hold by this state.
  const [searchValue, setSearchValue] = useState("");

  //This value is updated according to the button clicked.
  const [btnValue, setBtnValue] = useState(1);
  /**
   *
   * @returns {array}  It returns the response from the api - array of objects
   */
  const apiData = async () => {
    try {
      const response = await fetch(api);
      var responseJson = await response.json();
      return responseJson;
    } catch (e) {
      alert(" Error while fetching data : ", e);
    }
  };

  /*
  1 - This useEffect is used to fetch api data every first time the page reload.
  2 - when page reloads, apiData() function is called and the return response is stored in data state.
  3 - Same data has been storing in constantApiData state for comparing data from both state for other logic.
  4 - constantApiData state is using, whenever the user updated null data. And taking the repsective id data from constantApiData and 
      updating the respective data state id.
  5 - start state is for the default page data number. Whenever button clicked the page data changes accordingly.
  */
  useEffect(() => {
    const pageLoad = async () => {
      try {
        const fetchApiData = await apiData();
        setData(fetchApiData);
        setConstantApiData(fetchApiData);
        setStart(1);
      } catch (e) {
        alert(" Something went wrong : ", e);
      }
    };
    pageLoad();
  }, []);

  /*
  1 - This useEffect is used for particular rendering of the application.
  2 - Whenever the dependency state changes the core function called and the application renders with appropriate data.
  */
  useEffect(() => {
    btnClickedData(start);
  }, [data, start, deleteArr, check, inputArr, searchArr]);

  /**
   * @param {number} number having the button value. According to it, the page data changes.
   * The core pagination logic is implemented in this function. This has the startValue argument when respective button 
      clicked from child component, using props the startValue is changes.
   * And also deleting the records from the main data state inside this function.
   * dummyArr is the state used while rendering. Whatever the data changed in the main data state. It updates the dummyArr state.
  */
  const btnClickedData = (startValue) => {
    let tempArr = [];
    if (searchArr.length) return;
    if (!searchArr.length && searchValue) {
      setNoData(1);
      setDummyArr([]);
      return;
    }

    if (startValue > Math.ceil(data.length / 10)) {
      setStart(startValue - 1);
    }
    for (let i = startValue * 10 - 1; i >= startValue * 10 - 10; i--) {
      if (i >= data.length) {
        continue;
      } else if (deleteArr.includes(data[i].id) === true) {
        let tempArrNew = [...data];
        tempArrNew.splice(i, 1);
        setData(tempArrNew);
        let tempArrNewConst = [...constantApiData];
        tempArrNewConst.splice(i, 1);
        setConstantApiData(tempArrNewConst);
      } else {
        tempArr.unshift(data[i]);
      }
    }
    setDummyArr(tempArr);
  };
  // console.log("start ", start)
  // console.log("data ", data.length);

  return (
    <section className="container">
      <Search
        data={data}
        setSearchArr={setSearchArr}
        setNoData={setNoData}
        start={start}
        deleteArr={deleteArr}
        setDummyArr={setDummyArr}
        searchArr={searchArr}
        inputArr={inputArr}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />

      <Table
        dummyArr={dummyArr}
        setCheck={setCheck}
        inputArr={inputArr}
        check={check}
        constantApiData={constantApiData}
        searchArr={searchArr}
        data={data}
        setData={setData}
        setDeleteArr={setDeleteArr}
        setInputArr={setInputArr}
        setSearchArr={setSearchArr}
        noData={noData}
      />

      {dummyArr.length ? (
        <Button
          length={searchArr.length ? searchArr.length : data.length}
          setStart={setStart}
          start={start}
          setDeleteArr={setDeleteArr}
          check={check}
          setBtnValue={setBtnValue}
          btnValue={btnValue}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default Adminpage;
