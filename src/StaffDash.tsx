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
import Axios from '@/api/axios';
import ReportProTeaStaff from '@/components/ReportProTeaStaff';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import axios from '@/api/axios';
import { useAuth } from "@/hooks";




const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

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
    if (role !== 'staff') {
        localStorage.removeItem('token')
    }


    const { iseditProfileModal, isopenPasswordModal, setIseditProfileModal, setIsopenPasswordModal, user } = useAuth();

    const [profile, setProfile] = React.useState<any>(user?.data);
    React.useEffect(() => {
        Axios.get('/user/profilereal').then(res => {
            setProfile(res.data.result[0]);
            console.log("ssd",res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }, [iseditProfileModal]);

    const [open, setOpen] = React.useState(false);


    const [errAlert, setErrAlert] = React.useState<any>(false);


    const handleClose = () => setIsopenPasswordModal(!isopenPasswordModal);
    const handleClosePro = () => setIseditProfileModal(!iseditProfileModal);

    const [selectedTitle, setSelectedTitle] = React.useState<any>(user?.data.id_name_title);

    const [editProfile, setEditProfile] = React.useState<any>(profile);

    const handleInfoChangeNT = (event: any) => {
        setEditProfile({ ...editProfile, id_name_title: event.target.value });
        setSelectedTitle(event.target.value);
    }

    const handleInfoChange = (event: any) => {
        setEditProfile({ ...editProfile, [event.target.name]: event.target.value });
    }



    const [majorCode, setMajorCode] = React.useState<any>([]);
    const [nametitle, setNametitle] = React.useState<any>([]);

    React.useEffect(() => {
        axios.get('/resources/public/major')
            .then(res => {
                setMajorCode((prevMajorCode: any) => {
                    const newMajorCode = res.data.data.map((item: any) => ({
                        label: item.major_code + ' ' + item.major_name,
                        value: item.major_code
                    }));
                    return [...prevMajorCode, ...newMajorCode];
                });
            })
            .catch(err => {
                console.log(err);
            });

        axios.get('/resources/public/name_title')
            .then(res => {
                setNametitle((prevNametitle: any) => {
                    const nameTitles = res.data.data.map((item: any) => ({
                        label: item.name_title_th,
                        value: item.id_name_title
                    }));
                    return [...prevNametitle, ...nameTitles];
                });
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    const handleChangPassword = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const datalist = {
            password: data.get('repassword1'),
            repassword: data.get('repassword2'),
        }
        if (datalist.password === datalist.repassword && datalist.password !== '' && datalist.repassword !== '') {
            axios.put('/user/change', {
                new_password: datalist.password
            }).then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    alert('เปลี่ยนรหัสผ่านสำเร็จ');
                    setIsopenPasswordModal(false);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        else {
            setErrAlert(true);
        }
        console.log(datalist);
    }




    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            <ThemeProvider theme={defaultTheme}>
                <ReportProTeaStaff />

                <Modal
                    open={isopenPasswordModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box
                            sx={{
                                my: 12,
                                mt: 3,
                                mx: 4,
                                mr: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Avatar sx={{ m: 3, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                เปลี่ยนรหัสผ่าน
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleChangPassword} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="repassword1"
                                    label="รหัสผ่าน"
                                    type='password'
                                    name="repassword1"
                                    autoFocus
                                    error={errAlert}
                                    helperText={errAlert ? 'รหัสผ่านไม่ตรงกัน' : ''}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="repassword2"
                                    label="ยืนยันรหัสผ่าน"
                                    type="password"
                                    id="repassword2"
                                    autoComplete="current-password"
                                    error={errAlert}
                                    helperText={errAlert ? 'รหัสผ่านไม่ตรงกัน' : ''}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    เปลี่ยนรหัสผ่าน
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={iseditProfileModal}
                    onClose={handleClosePro}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h6" gutterBottom>
                            ข้อมูลบัญชี
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="initials"
                                    name="initials"
                                    label="รหัสผู้ใช้งาน"
                                    defaultValue={user?.data.initials}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="id_name_title"
                                    name="id_name_title"
                                    label="คำนำหน้า"
                                    helperText="กรุณาเลือกคำนำหน้า"
                                    select
                                    fullWidth
                                    variant="standard"
                                    value={selectedTitle} // ต้องมี value attribute
                                    defaultValue={user?.data.id_name_title}
                                    onChange={handleInfoChangeNT}
                                >
                                    {nametitle.map((option: any, index: any) => (
                                        <MenuItem key={index} value={option.value}>{option.label}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="first_name_th"
                                    name="first_name_th"
                                    label="ชื่อ"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={user?.data.first_name_th}
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="last_name_th"
                                    name="last_name_th"
                                    label="นามสกุล"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={user?.data.last_name_th}
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="first_name_en"
                                    name="first_name_en"
                                    label="Name (English)"
                                    defaultValue={user?.data.first_name_en}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    defaultValue={user?.data.last_name_en}
                                    id="last_name_en"
                                    name="last_name_en"
                                    label="Surname (English)"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="email"
                                    name="email"
                                    label="Email"
                                    defaultValue={user?.data.email}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    defaultValue={user?.data.address}
                                    id="address"
                                    name="address"
                                    label="Address"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    defaultValue={user?.data.phone}
                                    id="phone"
                                    name="phone"
                                    label="เบอร์โทรศัพท์"
                                    fullWidth
                                    variant="standard"
                                    onChange={handleInfoChange}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            onClick={() => {
                                axios.put('/resources/admin/staff/edit',
                                    {
                                        id_staff: user?.data.id_staff,
                                        id_name_title: editProfile.id_name_title,
                                        first_name_th: editProfile.first_name_th,
                                        last_name_th: editProfile.last_name_th,
                                        first_name_en: editProfile.first_name_en,
                                        last_name_en: editProfile.last_name_en,
                                        email: editProfile.email,
                                        address: editProfile.address,
                                        phone: editProfile.phone,
                                        initials: editProfile.initials,
                                    }
                                ).then((res) => {
                                    if (res.status === 200) {
                                        console.log(res);
                                        alert('แก้ไขข้อมูลสำเร็จ');
                                        localStorage.removeItem('token')
                                        window.location.href = '/';
                                        setIseditProfileModal(false);
                                    }
                                }).catch((err) => {
                                    console.log(err);
                                })
                            }
                            }
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </Modal>
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