import React, { useState } from "react";
import "./Edit.css";

const Edit = ({
  res,
  inputArr,
  check,
  constantApiData,
  searchArr,
  data,
  setData,
  setDeleteArr,
  setInputArr,
  setSearchArr,
}) => {
  const [inputState, setInputState] = useState(0);
  var inputArrNew = [];

  /**
   * @param {object, id}
   *  Whenever user trys to edit the data, this function calls and it updates the respective data state. And when data state is changed
      the re-render happens.
   * Inside this function, calling validateInput function to validate the inputs user tries to edit.
   * Another logic for editing the searched result data.
   */
  const onChangeInput = (e, id) => {
    setInputState(0);
    const { name, value } = e.target;
    if (validateInput(name, value)) {
      if (searchArr.length) {
        updateEditSearchData(id, name, value);
        setInputState(1);
        return;
      }
      updateEditData(id, name, value);
      setInputState(1);
      return;
    }
    if (searchArr.length > 0) {
      updateEditSearchData(id, name, value);
    } else {
      updateEditData(id, name, value);
    }
  };

  /**
   * For Re-using in the " onChangeInput() "it sis  used in separate function.
   * @param {string} id
   * @param {string} name
   * @param {string} value
   */
  const updateEditSearchData = (id, name, value) => {
    const editSearchData = searchArr.map((item) =>
      item.id === id && name ? { ...item, [name]: value } : item
    );
    setSearchArr(editSearchData);
    updateEditData(id, name, value);
  };

  /**
   *  For Re-using in the " onChangeInput() "it sis  used in separate function.
   * @param {string} id
   * @param {string} name
   * @param {string} value
   */
  const updateEditData = (id, name, value) => {
    const editData = data.map((item) =>
      item.id === id && name ? { ...item, [name]: value } : item
    );
    setData(editData);
  };

  /**
   *
   * @param {string} name
   * @param {string} value
   * @returns {boolean}
   */

  const validateInput = (name, value) => {
    if (name === "name" && value === "") {
      alert("Please Enter Name");
      return true;
    } else if (name === "email") {
      if (value === "") {
        alert("Please Enter Email");
        return true;
      }
      if (value.indexOf("@") === -1) {
        alert(
          "Please Enter Valid Email (Eg: naveen@abc.com ). To Change Full Email Select Fully and Edit it."
        );
        return true;
      }
      if (
        value.indexOf("@") === 0 ||
        value.lastIndexOf(".") - value.lastIndexOf("@") < 0
      ) {
        alert(
          "Please Enter valid Email (Eg: naveen@abc.com ). To Change Full Email Select Fully and Edit it."
        );
        return true;
      }
    } else if (name === "role" && value === "") {
      alert("Please Enter Role");
      return true;
    }
    return false;
  };

  /**
   *
   * @param {object} e - When onClick() of " updateUserData() " is triggered, this function is called.
   * This function is used for EmptyInput field. Whenever the user try to submit empty data, then this function updates the old value in that field.
   */
  const updateEmptyInput = (e) => {
    if (searchArr.length) {
      const findIndex = searchArr.findIndex((a) => {
        return a.id === e.target.id;
      });
      const findConstantIndex = constantApiData.findIndex((a) => {
        return a.id === e.target.id;
      });
      searchArr[findIndex] = constantApiData[findConstantIndex];
      const temp = searchArr;
      setSearchArr(temp);
      const findDataIndex = data.findIndex((a, i) => {
        return a.id === e.target.id;
      });
      data[findDataIndex] = constantApiData[findDataIndex];
      const tempData = data;
      setData(tempData);
    } else {
      const findIndex = data.findIndex((a, i) => {
        return a.id === e.target.id;
      });
      data[findIndex] = constantApiData[findIndex];
      const temp = data;
      setData(temp);
    }
  };

  /**
   *
   * @param {object} e - This function is used to update the userData
   */
  const updateUserData = (e) => {
    if (inputArr.includes(e.target.id) === false) {
      setInputArr((oldArr) => [...oldArr, e.target.id]);
    } else {
      if (inputState) {
        updateEmptyInput(e);
      }
      setInputState(0);
      inputArrNew = inputArr.filter((a) => a !== e.target.id);
      setInputArr(inputArrNew);
      alert("User Data Updated Successfully.");
    }
  };

  return (
    <>
      <td>
        <input
          className={
            check.includes(res.id) === true
              ? "input-class selected"
              : "input-class"
          }
          type="text"
          value={res.name}
          name="name"
          id={res.id}
          onChange={(e) => {
            inputArr.includes(res.id) && onChangeInput(e, res.id);
          }}
        />
      </td>
      <td>
        <input
          className={
            check.includes(res.id) === true
              ? "input-class selected"
              : "input-class"
          }
          type="email"
          value={res.email}
          name="email"
          id={res.id}
          onChange={(e) => {
            inputArr.includes(res.id) && onChangeInput(e, res.id);
          }}
        />
      </td>
      <td>
        <input
          className={
            check.includes(res.id) === true
              ? "input-class selected"
              : "input-class"
          }
          type="text"
          value={res.role}
          name="role"
          id={res.id}
          onChange={(e) => {
            inputArr.includes(res.id) && onChangeInput(e, res.id);
          }}
        />
      </td>

      <td id="action-td">
        <a
          href="#"
          id={res.id}
          className="action"
          onClick={(e) => {
            updateUserData(e);
          }}
        >
          {inputArr.includes(res.id) === true ? (
            <i className="fa fa-save" id={res.id}></i>
          ) : (
            <i className="fas fa-edit" id={res.id}></i>
          )}
        </a>
        &nbsp; &nbsp; &nbsp;
        <a
          href="#"
          id={res.id}
          onClick={(e) => {
            alert("Selected User Data will be Deleted.");
            setDeleteArr((oldArr) => [...oldArr, e.target.id]);
          }}
        >
          <i className="fas fa-trash-alt" id={res.id}></i>
        </a>
      </td>
    </>
  );
};
export default Edit;
