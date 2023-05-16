import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { flexbox } from '@material-ui/system';
import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { createFolder } from '../../actions/folderActions';
// import { getFoldersByParentId } from '../../actions/folderActions';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch'
      },
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
      }
  }));

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  

export default function AddPatient( { currentFolder }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    // const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const initialFormState = {
    parentId: ''
  }
  const [formData, setformData] = React.useState(initialFormState);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = () => {
    console.log(formData)
    //   dispatch(createFolder(formData))
      handleClose();
      setformData(prevstate => ({
        ...prevstate,
        name: '',
        parentId: ''
      }))
      let lastPath = window.location.href.substr(window.location.href.lastIndexOf('/'));
      let parentId = lastPath.split('/')[1]
      axios.post('http://localhost:8000/patient/create', formData).then(
          userData => {
              console.log(userData, 'userData')
          }
      )
    //   dispatch(getFoldersByParentId(parentId))
      
  }

  const handleChange = (e) => {
      console.log(e.target.value, e.target.name)
      let lastPath = window.location.href.substr(window.location.href.lastIndexOf('/'));
      let parentId = lastPath.split('/')[1]
      setformData(prevstate => ({
        ...prevstate,
        [e.target.name]: e.target.value,
        parentId: parentId
      }))
  }

  useEffect(() => {
  })

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">New Patient </h2>
      {/* <SimpleM /> */}
      <TextField
          required
          id="outlined-required"
          label="Name"
          name="name"
          defaultValue=""
          variant="outlined"
          onChange={handleChange}
        /> <br /> <br />
        <TextField
          required
          id="outlined-required"
          label="Age"
          name="age"
          defaultValue=""
          variant="outlined"
          onChange={handleChange}
        />
         <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select Gender</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
        //   value={age}
          onChange={handleChange}
          label="Select gender"
          name="gender"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
      </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select issue</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
        //   value={age}
          onChange={handleChange}
          label="Select a issue"
          name="issue"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"accident"}>Accident</MenuItem>
          <MenuItem value={"dengue"}>Dengue</MenuItem>
          <MenuItem value={"vomting"}>Vomting</MenuItem>
          <MenuItem value={"others"}>Others</MenuItem>
        </Select>
      </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select Test</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
        //   value={age}
          onChange={handleChange}
          label="Select a test"
          name="test"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"xray"}>X Ray</MenuItem>
          <MenuItem value={"scanning"}>Scanning</MenuItem>
          <MenuItem value={"bloodtest"}>Blood Test</MenuItem>
          <MenuItem value={"urinetest"}>Urine Test</MenuItem>
        </Select>
      </FormControl>  
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select priority</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="Priority"
          name="priority"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"priority1"}>Priority 1</MenuItem>
          <MenuItem value={"priority2"}>Priority 2</MenuItem>
          <MenuItem value={"priority3"}>Priority 3</MenuItem>
          <MenuItem value={"priority4"}>Priority 4</MenuItem>
          <MenuItem value={"priority5"}>Priority 5</MenuItem>
          <MenuItem value={"nopriority"}>No Priority</MenuItem>
        </Select>
      </FormControl>  
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Send to Lab</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="sendtolab"
          name="sendtolab"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"yes"}>yes</MenuItem>
          <MenuItem value={"no"}>no</MenuItem>
        </Select>
      </FormControl>
      <br /><br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
        Close
        </Button>
    </div>
  );

  return (
    <div>
      {/* <button type="button" onClick={handleOpen}>
        {/* {console.log(formData, 'in render')} */}
        {/* Create Folder */}
      {/* </button>  */}
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Add Patient
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}