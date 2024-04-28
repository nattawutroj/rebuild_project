import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems } from './components/listItems';
import UserList from './components/UList';
import Setting from './components/Settings';
import RouteAdd from './components/AddData';
import Axios from '@/api/axios';
import RouteStdGrops from './components/StdGrops';
import RouteStudent from './components/TableStuden'
import RouteTeacher from './components/TableTeaher'
import RouteAdminDash from './components/AdminDash'
import Record from './components/Record';
import Course from './components/SettingsRotue/Course';
import Department from './components/SettingsRotue/Department';
import NameTitle from './components/SettingsRotue/NameTitle';
import Major from './components/SettingsRotue/Major';
import Subject from './components/SettingsRotue/Subject';
import Room from './components/SettingsRotue/Room';
import News from './components/SettingsRotue/News';
import Semester from './components/SettingsRotue/Semester';
import Boss from './components/SettingsRotue/Boss';
import ProjectAll from './components/ProjectAll'
import ReportData from './components/ReportData';
// import ReportProTea from './components/ReportProTea';
import { Outlet } from '@tanstack/react-router';


const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const defaultTheme = createTheme();
export const ProfileContext = React.createContext({});
export default function Dashboard() {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
        localStorage.removeItem('token')
    }

    const [profile, setProfile] = React.useState<any>({});
    React.useEffect(() => {
        Axios.get('/user/profile').then(res => {
            setProfile(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const [open, setOpen] = React.useState<any>(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            <ThemeProvider theme={defaultTheme}>
                <Outlet />
            </ThemeProvider>
        </ProfileContext.Provider >
    );
}


// <Grid container spacing={0}>
// <Grid item xs={12} md={6} lg={6}>
//     --
// </Grid>
// <Grid item xs={12} md={6} lg={6}>
//     --
// </Grid>
// </Grid>