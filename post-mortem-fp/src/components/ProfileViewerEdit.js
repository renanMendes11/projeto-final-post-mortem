import React, {useState, useEffect} from 'react';
import axios from 'axios';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ProfileIcon from '@material-ui/icons/People';
import ContactIcon from '@material-ui/icons/ContactPhone';
import { authConfig } from '../auth/configFirebase';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function ProfileViewerEdit({history, location}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const userId = localStorage.getItem('@post-mortem/userId');
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUser(){
      const response = await axios.get(`http://localhost:8080/users/${userId}`);
      console.log(response.data);
      setUser(response.data);
    }
    loadUser();
  }, []);
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  function handleProfile(e){
    history.push('/profile-viewer-edit');
  }

  function handleContacts(e){
    history.push('/');
  }

  async function handleLogout(e){
    authConfig.auth().signOut();
    await axios.post(`http://localhost:8080/users/logout/${userId}`);
    history.push('/login');
  }

  async function handleSubmit(event){
    event.preventDefault();
    let userUpdate = {
      name: '',
      email: '',
      phone: '',
    };
    
    if(name) userUpdate['name'] = name;
    else userUpdate['name'] = user.name;

    if(email) userUpdate['email'] = email;
    else userUpdate['email'] = user.email;

    if(phone) userUpdate['phone'] = phone;
    else userUpdate['phone'] = user.phone;
    

    await axios.put(`http://localhost:8080/users/${userId}`, userUpdate);
    history.push('/');
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Post Mortem
          </Typography>
          <IconButton color="inherit" onClick={(e) => handleLogout(e) } >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div>
          <ListItem button onClick={e => handleProfile(e)}>
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItem>
          <ListItem button onClick={e => handleContacts(e)}>
            <ListItemIcon>
              <ContactIcon />
            </ListItemIcon>
            <ListItemText primary="Contatos" />
          </ListItem>
        </div>

      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
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
                  defaultValue={user.name}
                  onChange={ event => setName(event.target.value) }
                />
            </Grid>
            <Grid item xs={5}>
              <label htmlFor="email">Email</label>
              <Input 
                  name="email"  
                  id="email"
                  fullWidth
                  defaultValue={user.email}
                  onChange={ event => setEmail(event.target.value) }
                />
            </Grid>
            <Grid item xs={5}>
              <label htmlFor="userInstagram">Telefone</label>
              <Input 
                  name="phone"  
                  id="phone"
                  fullWidth
                  defaultValue={user.phone}
                  onChange={ event => setPhone(event.target.value) }
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
                Editar
              </Button>
            </Grid>
            </Grid>
          </form>
        </Container>
      </main>
    </div>
  );
}