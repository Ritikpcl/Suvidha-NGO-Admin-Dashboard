import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import View from '../../../assets/view.png';
import gMail from '../../../assets/gmail.png';
import Checked from '../../../assets/checked.png'
import Search from '../../../assets/search.png'
import TextField from '@mui/material/TextField';
import {ScaleLoader} from 'react-spinners'

const LetterList = () => {
  const [letters, setLetters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loadingStates, setLoadingStates] = useState({});
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_DOMAIN}/api/letter/getAllLetters`)
      .then((response) => {
        const rowsWithIds = response.data.map((letter, index) => ({
          ...letter,
          id: index + 1,
          from: new Date(letter.from),
        }));

        const filteredRows = rowsWithIds.filter((row) =>
          row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (typeof row.ref_no === 'number' && row.ref_no.toString().includes(searchQuery.toLowerCase()))
        );

        setLetters(filteredRows);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchQuery,letters]);

  const sendEmail = async (recipientEmail, pdfUrl, rowId, name) => {
    
    setLoadingStates((prevStates) => ({
      ...prevStates,
      [rowId]: true,
    }));

    axios
      .post(`${import.meta.env.VITE_DOMAIN}/api/letter/sendEmail`, { recipientEmail, pdfUrl, name })
      .then((response) => {
        console.log('Letter sent:', response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      }).finally(() => {
        setLoadingStates((prevStates) => ({
          ...prevStates,
          [rowId]: false,
        }));
      });
  }

  const customColumns = [
    {
      field: 'urlText',
      headerName: 'View Letter',
      width: 160,
      renderCell: (params) => (
        <a
          style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
          href={params.row.url} target="_blank"
        >
          <img style={{ width: "30px" }} src={View} alt="View" />
        </a>
      ),
      headerAlign: 'center', align: 'center'
    },
    {
      field: 'sendEmail',
      headerName: 'Send Email',
      width: 160,
      renderCell: (params) => (
        <button
          style={{ border: "none", background: "transparent", cursor: 'pointer' }}
          onClick={() => sendEmail(params.row.email, params.row.url, params.row.id, params.row.name)}>
          {loadingStates[params.row.id] ? (
            <div><ScaleLoader color="#c2c2c2" height={15} /></div>
          ) : (
            params.row.emailSent ? <img style={{ width: "30px" }} src={Checked} alt="Checked" /> : <img style={{ width: "30px" }} src={gMail} alt="Send Email" />
          )}
        </button>
      ),
      headerAlign: 'center', align: 'center'
    },
  ];

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, headerAlign: 'center', align: 'center' },
    { field: 'name', headerName: 'Name', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'designation', headerName: 'Designation', width: 200, headerAlign: 'center', align: 'center' },
    { field: 'from', headerName: 'Start', type: 'date', width: 160, valueGetter: (params) => new Date(params.row.from), headerAlign: 'center', align: 'center' },
    { field: 'to', headerName: 'End', type: 'date', width: 160, valueGetter: (params) => new Date(params.row.to), headerAlign: 'center', align: 'center' },
    ...customColumns,
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection:'column',alignItems: 'center', height:'60vh'}}>
      <div style={{display:'flex', justifyContent:'space-between', width:"100%"}}>
        <h2 style={{color:'#fab23e',marginBottom:'10px'}} >Letter List</h2>
        <div style={{alignSelf:'flex-end', marginBottom:'10px'}}>
          <img style={{width:'30px', marginTop:'20px'}} src={Search}/>
          <TextField
            id="standard-search"
            label="Search..."
            type="search"
            variant="standard"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div style={{ width: '100%'}}>
        <DataGrid
          rows={letters}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10,50]}
        />
      </div>
    </div>
  );
};

export default LetterList;
