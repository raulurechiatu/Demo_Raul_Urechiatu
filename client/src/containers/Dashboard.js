import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import Button from "react-bootstrap/Button";


const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'salary',
    headerName: 'Salary',
    type: 'number',
    width: 90,
  },
];

function Dashboard(props) {
    const [rows, setRows] = useState([]);

    const loadRows = () => {
        const context =  this;
        const url = 'http://localhost:8000/db/employees';

        fetch(url)
        .then(data => {
            data.json().then(employees => {
                let dataList = [];
                let index = 0;
                employees.forEach(employee => {
                    console.log(employee);
                    employee['id'] = index++;
                    dataList.push(employee);
                });
                setRows(dataList);
            })
        })
    }

    const insertRandomRow = () => {
        const context =  this;
        const url = 'http://localhost:8000/db/employees/insert/random';

        fetch(url, {method: 'POST'})
        .then(data => {
            data.json().then(employee => {
                loadRows();
            })
        })
    }

    // Calling the function on component mount
    useEffect(() => {
        loadRows();
    }, []);

  const navigate = useNavigate()
  // handle click event of logout button
  const handleLogout = () => {
    navigate('/login');
  }

  return (
    <div>
      <Button block size="lg" onClick={insertRandomRow}>
        Insert Random Employee
      </Button>
      <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
        />
    </div>
  );
}

export default Dashboard;