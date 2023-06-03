import "./Button.css";
import React from "react";

/*

1 - Button is a component where it takes inputs as props from Adminpage.js and does some logic and displays the buttons accordingly.
2 - Here using parent to child concept here to implement some logics here.

*/

const Button = (props) => {
  // Implemented for number of buttons should display as per the data dynamically.

  const numberOfButtons = Math.ceil(props.length / 10);

  // The below loop is used for the number of buttons in a natural number format. eg. [1,2,3,4,5] So that I can use this for looping for the buttons
  let arr = [];
  for (let i = 1; i <= numberOfButtons; i++) {
    arr.push(i);
  }

  /**
   *
   * @param {number} value :  It is the button number.
   */
  const updateBtnvalue = (value) => {
    const temp = Number(value.target.id);
    props.setBtnValue(temp);
  };

  /**
   * This function is used to update the delete id's from the check.
   */
  const updateDeleteData = () => {
    alert("Selected User Data will be Deleted.");
    props.setDeleteArr(props.check);
    if (props.btnValue === numberOfButtons) {
      props.setBtnValue(props.btnValue - 1);
    }
  };
  return (
    <section className="container-btn">
      <section className="container-delete">
        <button
          className="delete-btn"
          onClick={(e) => {
            updateDeleteData();
          }}
        >
          {" "}
          Delete Selected{" "}
        </button>
      </section>
      <nav className="container-pagination">
        <button
          className={
            numberOfButtons === 1
              ? "page-btn one"
              : props.btnValue === 1
              ? "page-btn one"
              : "page-btn"
          }
          onClick={() => {
            if (props.btnValue > 1) {
              props.setBtnValue(1);
              props.setStart(1);
            }
          }}
        >
          &lt;&lt;
        </button>
        <button
          className={
            numberOfButtons === 1
              ? "page-btn one"
              : props.btnValue === 1
              ? "page-btn one"
              : "page-btn"
          }
          onClick={() => {
            if (props.btnValue > 1) {
              props.setBtnValue(props.btnValue - 1);
              props.setStart(props.btnValue - 1);
            }
          }}
        >
          &lt;
        </button>
        {arr.map((number) => {
          return (
            <button
              className={
                numberOfButtons === 1
                  ? "page-btn btn-click btns"
                  : props.btnValue === number
                  ? "page-btn btn-click btns"
                  : "page-btn btns"
              }
              key={number}
              id={number}
              onClick={(e) => {
                updateBtnvalue(e);
                props.setStart(e.target.id);
              }}
            >
              {number}
            </button>
          );
        })}
        <button
          className={
            numberOfButtons === 1
              ? "page-btn last"
              : props.btnValue === numberOfButtons
              ? "page-btn last"
              : "page-btn"
          }
          onClick={() => {
            if (props.btnValue < numberOfButtons) {
              props.setBtnValue(props.btnValue + 1);
              props.setStart(props.btnValue + 1);
            }
          }}
        >
          &gt;
        </button>
        <button
          className={
            numberOfButtons === 1
              ? "page-btn last"
              : props.btnValue === numberOfButtons
              ? "page-btn last"
              : "page-btn"
          }
          onClick={() => {
            if (props.btnValue < numberOfButtons) {
              props.setBtnValue(numberOfButtons);
              props.setStart(numberOfButtons);
            }
          }}
        >
          &gt;&gt;
        </button>
      </nav>
    </section>
  );
};

export default Button;
