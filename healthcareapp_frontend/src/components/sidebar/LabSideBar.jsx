import React, { useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux';
// import { getFolderDetail } from '../../actions/folderActions';
// import Navbar from '../drive/Navbar';
// import AddFolderButton from '../drive/AddFolderButton';
// import { FolderContent } from './folderContent';
// import { useFolder } from '../hooks/useFolder';
// import UploadFile from '../drive/UploadFile';
// import { FileContent } from './fileContent';
// import { HandleBack } from './handleBack';
// import { useFolder } from '../hooks/useFolder';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, Link } from "react-router-dom";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddPatient from '../AddPatient/AddPatient';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export const LabSideBar = ({ component1, component2}) => {
    // const dispatch = useDispatch();
    // const folderData = useSelector((state) => state)
    const classes = useStyles();
    let history = useHistory();
    // console.log(folderData, 'folderData')

    const leftMenu = [
        // { name: 'My Drive', link: '/drive/my-drive'},
        // { name: 'Trash', link: '/trash'}
    ]    

    useEffect(() => {
        // dispatch(getFolderDetail())
    }, [])

    return (
        <>
            {/* <Navbar /> */}
            {/* <AddFolderButton currentFolder={'gfg'} /> */}
            {/* {folderData} */}
            {/* <FolderContent /> */}
            <div className={classes.root}>
                <CssBaseline />
                {/* <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        {/* <Navbar /> */}
                    {/* </Toolbar> */}
                {/* </AppBar>  */}
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                >
                    <div className={classes.toolbar} />
                    <div className="createFolder">
                    {/* <AddFolderButton currentFolder={'gfg'} /> */}
                    {/* <AddPatient /> */}
                    </div>
                    <Divider />
                    <div className="uploadFolder">
                    {/* <UploadFile /> */}
                    </div>
                    <Divider />
                    <List>
                        {leftMenu.map((v, index) => (
                            <ListItem button key={index} onClick={
                                () => {
                                    console.log('handle click left menu')
                                    history.push(`${v.link}`)
                                }
                            }>
                                <ListItemIcon>{index % 2 === 0 ? <InsertDriveFileOutlinedIcon /> : <DeleteOutlineIcon />}</ListItemIcon>
                                <ListItemText primary={v.name} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Logout'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {component1}
                    <br />
                    <br />
                    <br />
                    <br />
                    {component2}
                    
                </main>
            </div>
        </>
    )
}