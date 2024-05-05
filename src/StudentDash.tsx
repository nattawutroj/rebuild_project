import * as React from 'react';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Axios from '@/api/axios';
import ProjectDash from '@/components/ProjectDash';



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
    if (role !== 'student') {
        localStorage.removeItem('token')
    }

    const [profile, setProfile] = React.useState({});
    React.useEffect(() => {
        Axios.get('/user/profile').then(res => {
            setProfile(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            <ThemeProvider theme={defaultTheme}>
                <ProjectDash />
            </ThemeProvider>
        </ProfileContext.Provider >
    );
}