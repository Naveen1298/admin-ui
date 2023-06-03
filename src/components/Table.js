import Edit from "./Edit";
import "./Adminpage.css";

const Table = ({
  dummyArr,
  setCheck,
  inputArr,
  check,
  constantApiData,
  searchArr,
  data,
  setData,
  setDeleteArr,
  setInputArr,
  setSearchArr,
  noData,
}) => {
  let tempCheckAll = [];
  let checkArr = [];

  /** 
   * @param {object}
   *  This function is called when head checkbox is selected and it takes the repsective page data id's and updates into the 
      check state.
   *  When check state changes, it re-renders the page and small logic is used inside JSX to handle checkbox state of repsective data.
   *
   */
  const handleSelectAll = (e) => {
    if (e.target.checked === true) {
      for (let i = 0; i < dummyArr.length; i++) {
        tempCheckAll.push(dummyArr[i].id);
      }

      for (let i = 0; i < tempCheckAll.length; i++) {
        if (check.includes(tempCheckAll[i]) === false) {
          setCheck((oldArr) => [...oldArr, tempCheckAll[i]]);
        }
      }
    } else {
      setCheck([]);
    }
  };

  const updateCheckBoxArr = (e) => {
    if (e.target.checked === true) {
      setCheck((oldArr) => [...oldArr, e.target.value]);
    } else {
      checkArr = check.filter((a) => a !== e.target.value);
      setCheck(checkArr);
    }
  };

  return (
    <section className="container-table">
      <table className="table">
        <thead>
          <tr className="table-head">
            <th id="check-th">
              <input
                type="checkbox"
                name="selectAll"
                defaultChecked={false}
                onChange={(e) => {
                  handleSelectAll(e);
                }}
              />
            </th>
            <th id="name-th">Name</th>
            <th id="email-th">Email</th>
            <th id="role-th">Role</th>
            <th id="action-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyArr.length
            ? dummyArr.map((res) => (
                <tr
                  key={res.id}
                  className={
                    check.includes(res.id) === true
                      ? "table-row selected"
                      : "table-row"
                  }
                >
                  <td>
                    <input
                      type="checkbox"
                      id={res.id}
                      name={res.name}
                      value={res.id}
                      checked={check.includes(res.id) === true}
                      onChange={(e) => {
                        updateCheckBoxArr(e);
                      }}
                    />
                  </td>
                  <Edit
                    res={res}
                    inputArr={inputArr}
                    check={check}
                    constantApiData={constantApiData}
                    searchArr={searchArr}
                    data={data}
                    setData={setData}
                    setDeleteArr={setDeleteArr}
                    setInputArr={setInputArr}
                    setSearchArr={setSearchArr}
                  />
                </tr>
              ))
            : ""}
          {!dummyArr.length && noData ? (
            <tr>
              <td>
                <p>No Results Found</p>
              </td>
            </tr>
          ) : (
            ""
          )}
          {data.length ? (
            ""
          ) : (
            <tr>
              <td>
                <p>Error while fetching Data</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};
export default Table;
