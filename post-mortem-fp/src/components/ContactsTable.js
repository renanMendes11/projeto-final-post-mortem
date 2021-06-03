import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import EditIcon from '@material-ui/icons/Edit';
import RemoveIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import history from '../history';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function ContactsTable() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const userId = localStorage.getItem('@post-mortem/userId');
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [parentage, setParentage] = useState('');
  const [userInstagram, setUserInstagram] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function loadContacts(){
      const response = await axios.get(`http://localhost:8080/contacts/user/${userId}`);
      setContacts(response.data);
    }
    loadContacts();
  }, []);

  async function handleRemove(e, id) {
    await axios.delete(`http://localhost:8080/contacts/${id}`);
    setContacts(contacts.filter(contact => {
      return contact.id !== id;
    }));
  }

  async function handleSubmit(event){
    event.preventDefault();
    let contactCreate = {
      name,
      parentage,
      email,
      userInstagram,
      userId,
      id: ''
    };

    const response = await axios.post(`http://localhost:8080/contacts`, contactCreate);
    const contactId = response.data;
    contactCreate.id = contactId;
    handleCloseModal();
    const contactsAux = contacts;
    contactsAux.push(contactCreate);
    setContacts(contactsAux);

  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.root} 
              noValidate 
              autoComplete="off" 
              onSubmit={e => handleSubmit(e)}>
            <Grid container spacing={2}>
            <Grid item xs={5}>
              <label htmlFor="name">Nome</label>
              <Input 
                  name="name"  
                  id="name"
                  fullWidth
                  onChange={ event => setName(event.target.value) }
                />
            </Grid>
            <Grid item xs={5}>
              <label htmlFor="email">Email</label>
              <Input 
                  name="email"  
                  id="email"
                  fullWidth
                  onChange={ event => setEmail(event.target.value) }
                />
            </Grid>
            <Grid item xs={5}>
              <label htmlFor="userInstagram">Username Instagram</label>
              <Input 
                  name="userInstagram"  
                  id="userInstagram"
                  fullWidth
                  onChange={ event => setUserInstagram(event.target.value) }
                />
            </Grid>
            <Grid item xs={5}>
              <label htmlFor="parentage">Parentesco</label>
              <Input 
                name="parentage"  
                id="parentage"
                fullWidth
                onChange={ event => setParentage(event.target.value) }
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Adicionar
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onSubmit={e => handleCloseModal(e)}>
              
                Cancelar
              </Button>
            </Grid>
            </Grid>
          </form>
    </div>
  );


  return (
    <>
    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      Menu
    </Button>
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleOpenModal}>Adicionar Contato</MenuItem>
    </Menu>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Parentesco</TableCell>
            <TableCell align="right">Username Instagram</TableCell>
            <TableCell align="right">Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}> 
              <TableCell component="th" scope="row">
                  {contact.name}
              </TableCell>
              <TableCell align="right">        
                  {contact.parentage}
                </TableCell>
              <TableCell align="right">
                {contact.userInstagram}
              </TableCell>
              <TableCell align="right">
                  {contact.email}
                </TableCell>
                <TableCell align="right">
                  <Link to={{
                    pathname: "/contact-viewer-edit",
                    state: { contact }
                  }}
                  style={{ textDecoration: "none" }}>
                    <EditIcon 
                      style={{ cursor: "pointer" }}
                    />
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <RemoveIcon
                    onClick={e => handleRemove(e, contact.id)} 
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
