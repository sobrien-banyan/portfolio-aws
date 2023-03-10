import React, { useEffect, useState, useContext } from "react";
import { MainContext } from "../Context";
import axios from 'axios';

export default function RecordList() {
  const store = useContext(MainContext);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      try {
        const response = await axios.get(`/api/record/`);
        const data = response.data;
        if (data.length <= 10) {
          setList1(data);
        } else {
          setList1(data.slice(0, 10));
          setList2(data.slice(10));
        }
      } catch (err) {
        console.log(err);
      }
    }

    getRecords();

  }, [list1.length, store.apiToggle]);

  // This method will map out the records on the table
  function recordList(list) {
    return list.map((record) => {
      return (
        <tr key={record.id}>
          <td>{record.name}</td>
          <td>{record.score}</td>
          <td>
          </td>
        </tr>
      );
    });
  }

  // This following section will display the table with the list of individuals.
  return (
    <div className="score-row">
      <div>
        <h3>High Scores.</h3>
        <table className="w3-table w3-striped w3-bordered" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{recordList(list1)}</tbody>
        </table>
      </div>
      {list2.length > 0 && (
        <div>
          <h3>High Scores</h3>
          <table className="w3-table w3-striped w3-bordered" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>{recordList(list2)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}