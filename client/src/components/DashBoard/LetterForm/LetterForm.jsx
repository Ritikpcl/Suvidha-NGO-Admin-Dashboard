import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import letterImg from '../../../assets/email-and-file.png'
import {ScaleLoader} from 'react-spinners'

const LetterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    from: '',
    to: '',
    email: '',
  });

  // Create state variables to track error state for each field
  const [nameError, setNameError] = useState(false);
  const [designationError, setDesignationError] = useState(false);
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetDetails = () => {
    setFormData({
      name: '',
      designation: '',
      from: '',
      to: '',
      email: '',
    });
    setNameError(false);
    setDesignationError(false);
    setFromError(false);
    setToError(false);
    setEmailError(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Reset the error state when the user types in the field
    if (name === 'name') {
      setNameError(false);
    }
    if (name === 'designation') {
      setDesignationError(false);
    }
    if (name === 'from') {
      setFromError(false);
    }
    if (name === 'to') {
      setToError(false);
    }
    if (name === 'email') {
      setEmailError(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation here
    let isValid = true;

    if (!formData.name) {
      setNameError(true);
      isValid = false;
    }
    if (!formData.designation) {
      setDesignationError(true);
      isValid = false;
    }
    if (!formData.from) {
      setFromError(true);
      isValid = false;
    }
    if (!formData.to) {
      setToError(true);
      isValid = false;
    }
    if (!formData.email) {
      setEmailError(true);
      isValid = false;
    }

    // Validate the email using a regular expression
    const emailPattern = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(formData.email)) {
      setEmailError(true);
      isValid = false;
    }

    // Check if the "from" date is greater than the "to" date
    if (new Date(formData.from) > new Date(formData.to)) {
      setFromError(true);
      setToError(true);
      isValid = false;
    }

    if (isValid) {
      // Send the form data to the server
      setLoading(true);
      axios.post(`${import.meta.env.VITE_DOMAIN}/api/letter/generate`, formData)
        .then((response) => {
          console.log('Letter generated:', response);
          resetDetails();
          setLoading(false)
          window.location.reload();
        })
        .catch((error) => {
          setLoading(false)
          console.error('Error generating letter:', error);
        });
    }
  };

  return (
    <div>
      <hr style={{ height: '0.1px', backgroundColor: '#c2c2c2', border: 'none', marginTop:'-16px' , marginBottom:'25px'}} />
      <div style={{display:"flex", justifyContent:'space-between'}}>
      <div style={{display:"flex"}}>
      <img style={{width:'70px'}} src={letterImg}/>
      <h2 style={{ textAlign: 'left', color:'#fab23e'}} >Generate Letter</h2>
      </div>
      <Button style={{height:'40px', marginRight:'70px', marginTop:'30px'}} variant="outlined" onClick={handleSubmit}>
      {loading ? <ScaleLoader color="#c2c2c2" height={15} /> : 'Generate Letter'}
      </Button>
      </div>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={nameError} 
        />

        <TextField
          required
          id="outlined-required"
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          error={designationError}
        />

        <TextField
          required
          id="outlined-required"
          type="date"
          name="from"
          value={formData.from}
          onChange={handleChange}
          error={fromError}
        />

        <TextField
          required
          id="outlined-required"
          type="date"
          name="to"
          value={formData.to}
          onChange={handleChange}
          error={toError}
        />

        <TextField
          required
          id="outlined-required"
          label="user@gmail.com"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={emailError}
        />
      </Box>
      <hr style={{ height: '0.1px', backgroundColor: '#c2c2c2', border: 'none'}} />
    </div>
  );
};

export default LetterForm;
