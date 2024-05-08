import * as React from 'react';
import axios from '@/api/axios';
import { Box, Button, Modal, Stack } from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


export default function ModalAddJust({ act, setAct, projectcode, setOpenAddJust }: any) {

    const [id_staff, setIdStaff] = React.useState<any>(-1);
    const [id_staff1, setIdStaff1] = React.useState<any>(-1);
    const [id_staff2, setIdStaff2] = React.useState<any>(-1);
    const [id_staff3, setIdStaff3] = React.useState<any>(-1);

    const [id_staffold, setIdStaffold] = React.useState<any>(-1);
    const [id_staffold1, setIdStaffold1] = React.useState<any>(-1);
    const [id_staffold2, setIdStaffold2] = React.useState<any>(-1);
    const [id_staffold3, setIdStaffold3] = React.useState<any>(-1);

    console.log("id_staffold", id_staffold3);

    const [nametitle, setNametitle] = useState<any>([]);
    const [editProfileAlert, setEditProfileAlert] = useState<any>(false);
    const [selectedTitle, setSelectedTitle] = useState<any>('');
    const [staffList, setStaffList] = React.useState<any>([]);
    const [staff, setStaff] = React.useState<any>([]);

    React.useEffect(() => {
        if (staff?.staff) {
            var staffx = staff.staff.filter((staff: any) => staff.id_project_staff_position === 1);
            var staffx1 = staff.staff.filter((staff: any) => staff.id_project_staff_position === 2);
            var staffx2 = staff.staff.filter((staff: any) => staff.id_project_staff_position === 3 && staff.id_staff !== staffx[0].id_staff);
            var staffx3 = staff.staff.filter((staff: any) => staff.id_staff === staffx[0].id_staff && staff.id_project_staff_position === 3);
            setIdStaff3(staffx[0]?.id_staff || -1);
            setIdStaffold3(staffx3[0]?.id_project_staff || -1);
            setIdStaff(staffx1[0]?.id_staff || -1);
            setIdStaffold(staffx1[0]?.id_project_staff || -1);
            setIdStaff1(staffx2[0]?.id_staff || -1);
            setIdStaffold1(staffx2[0]?.id_project_staff || -1);
            setIdStaff2(staffx2[1]?.id_staff || -1);
            setIdStaffold2(staffx2[1]?.id_project_staff || -1);

        }
    }, [staff]);

    const [formData, setFormData] = useState<any>({
        id_project: projectcode,
        id_project_staff_position: '4',
        id_name_title: '',
        first_name_th: '',
        last_name_th: '',
        first_name_en: '',
        last_name_en: '',
        phone: '',
        email: '',
    });

    const [subOpen, setSubOpen] = React.useState<any>(false); // Change subOpen to a state variable

    React.useEffect(() => {
        FetchStaff();
    }, []);

    const handleTitleChange = (event: any) => {
        setSelectedTitle(event.target.value);
        handleChangesub(event);
    };

    const handleChangesub = (event: any) => {
        const { name, value } = event.target;
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSave = () => {
        console.log('Saved data:', formData);
        if (formData.id_name_title === '' || formData.first_name_th === '' || formData.last_name_th === '' || formData.first_name_en === '' || formData.last_name_en === '' || formData.phone === '' || formData.email === '') {
            setEditProfileAlert(true);
        }
        else {
            setEditProfileAlert(false);
            axios.post('/user/staffos', {
                id_project: projectcode,
                id_project_staff_position: '4',
                id_name_title: formData.id_name_title,
                first_name_th: formData.first_name_th,
                last_name_th: formData.last_name_th,
                first_name_en: formData.first_name_en,
                last_name_en: formData.last_name_en,
                phone: formData.phone,
                email: formData.email,
            })
                .then(res => {
                    console.log(res.data);
                    if (res.data.status === 200) {
                        window.alert("ดำเนินการแล้ว");
                    } else {
                        window.alert("เพิ่มข้อมูลไม่สำเร็จ");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    };

    React.useEffect(() => {
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

    function FetchStaff() {
        axios.get('/user/stafflist')
            .then(res => {
                console.log(res.data);
                setStaffList(res.data.result);
                axios.get('/resources/admin/projectinfomation/staff',
                    {
                        params: {
                            id_project: projectcode
                        }
                    }
                ).then(res => {

                    setStaff(res.data.result[0]);
                }).catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleChange(event: any) {
        setIdStaff(event.target.value);
    }

    function handleChange1(event: any) {
        setIdStaff1(event.target.value);
    }

    function handleChange2(event: any) {
        setIdStaff2(event.target.value);
    }

    function handleChange3(event: any) {
        setIdStaff3(event.target.value);
    }

    function addStaff() {
        if (id_staffold !== -1) {
            axios.delete('/user/projectstaff', {
                data: {
                    id_project_staff: id_staffold
                }
            })
                .then(res => {
                    console.log("done");
                }
                )
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staffold1 !== -1) {
            axios.delete('/user/projectstaff', {
                data: {
                    id_project_staff: id_staffold1
                }
            })
                .then(res => {
                    console.log("done");
                }
                )
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staffold2 !== -1) {
            axios.delete('/user/projectstaff', {
                data: {
                    id_project_staff: id_staffold2
                }
            })
                .then(res => {
                    console.log("done");
                }
                )
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staffold3 !== -1) {
            axios.delete('/user/projectstaff', {
                data: {
                    id_project_staff: id_staffold3
                }
            })
                .then(res => {
                    console.log("done");
                }
                )
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staff != -1) {
            axios.post('/user/projectstaff', {
                id_project: projectcode,
                id_staff: id_staff,
                id_project_staff_position: 2
            })
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staff1 != -1) {
            axios.post('/user/projectstaff', {
                id_project: projectcode,
                id_staff: id_staff1,
                id_project_staff_position: 3
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staff2 != -1) {
            axios.post('/user/projectstaff', {
                id_project: projectcode,
                id_staff: id_staff2,
                id_project_staff_position: 3
            })
                .then(res => {
                })
                .catch(err => {
                    console.log(err);
                });
        }
        if (id_staff3 != -1) {
            axios.post('/user/projectstaff', {
                id_project: projectcode,
                id_staff: id_staff3,
                id_project_staff_position: 3
            })
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        setOpenAddJust(false);
        setAct(act + 1);
        setAct(act + 1);

    }

    return (
        <React.Fragment>
            <Box sx={{ width: '100%', height: '100%' }}>
                <Stack
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    spacing={2}
                    sx={{ mb: 2, mt: 2 }}
                >
                    <h3>จัดตั้งกรรมการ</h3>
                </Stack>
                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-label">ประธาน</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id_staff}
                        label="Staff"
                        onChange={handleChange}
                    >
                        <MenuItem value={-1}><em>เลือกประธาน</em></MenuItem>
                        {staffList
                            .map((staff: any, index: any) => (
                                <MenuItem key={index} value={staff.id_staff}>{staff.name_title_th + ' ' + staff.first_name_th + ' ' + staff.last_name_th}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-label">กรรมการ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id_staff1}
                        label="Staff"
                        onChange={handleChange1}
                    >
                        <MenuItem value={-1}><em>เลือกกรรมการ</em></MenuItem>
                        {staffList
                            .filter((staff: any) => staff.id_staff !== id_staff)
                            .map((staff: any, index: any) => (
                                <MenuItem key={index} value={staff.id_staff}>{staff.name_title_th + ' ' + staff.first_name_th + ' ' + staff.last_name_th}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-label">กรรมการ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id_staff2}
                        label="Staff"
                        onChange={handleChange2}
                    >
                        <MenuItem value={-1}><em>เลือกกรรมการ</em></MenuItem>
                        {staffList
                            .filter((staff: any) => staff.id_staff !== id_staff && staff.id_staff !== id_staff1)
                            .map((staff: any, index: any) => (
                                <MenuItem key={index} value={staff.id_staff}>{staff.name_title_th + ' ' + staff.first_name_th + ' ' + staff.last_name_th}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mt: 3 }}>
                    <InputLabel id="demo-simple-select-label">กรรมการ</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={id_staff3}
                        label="Staff"
                        onChange={handleChange3}
                    >
                        <MenuItem value={-1}><em>เลือกกรรมการ</em></MenuItem>
                        {staffList
                            .filter((staff: any) => staff.id_staff !== id_staff && staff.id_staff !== id_staff1 && staff.id_staff !== id_staff2)
                            .map((staff: any, index: any) => (
                                <MenuItem key={index} value={staff.id_staff}>{staff.name_title_th + ' ' + staff.first_name_th + ' ' + staff.last_name_th}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Box>

            <Stack direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2} sx={{ mt: 2.5 }}>
                <Button color='success' variant="contained" onClick={() => { addStaff() }}>แก้ไข</Button>
                <Button variant="contained" onClick={() => { setOpenAddJust(false) }}>ยกเลิก</Button>
            </Stack>
            <Modal
                open={subOpen} // You need to set this to true to open the modal
                onClose={() => setSubOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        pt: 2,
                        px: 4,
                        pb: 3,
                    }}
                >
                    <h2>เพิ่มที่ปรึกษาภายนอก</h2>
                    <TextField
                        required
                        error={editProfileAlert}
                        id="id_name_title"
                        name="id_name_title"
                        label="คำนำหน้า"
                        helperText="กรุณาเลือกคำนำหน้า"
                        select
                        fullWidth
                        variant="standard"
                        value={selectedTitle} // ต้องมี value attribute
                        onChange={handleTitleChange}
                    >
                        {nametitle.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                {console.log(option.value)}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        sx={{ mt: 1 }}
                        label="ชื่อจริง (ไทย)"
                        fullWidth
                        name="first_name_th"
                        value={formData.first_name_th}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="นามสกุล (ไทย)"
                        fullWidth
                        name="last_name_th"
                        value={formData.last_name_th}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="ชื่อจริง (อังกฤษ)"
                        fullWidth
                        name="first_name_en"
                        value={formData.first_name_en}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="นามสกุล (อังกฤษ)"
                        fullWidth
                        name="last_name_en"
                        value={formData.last_name_en}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="เบอร์โทรศัพท์"
                        fullWidth
                        name="phone"
                        value={formData.phone}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <TextField
                        sx={{ mt: 1 }}
                        label="อีเมล"
                        fullWidth
                        name="email"
                        value={formData.email}
                        onChange={handleChangesub}
                        error={editProfileAlert}
                    />
                    <Stack direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2} sx={{ mt: 2.5 }}>
                        <Button color='success' variant="contained" onClick={() => { handleSave() }}>ยืนยัน</Button>
                        <Button variant="contained" onClick={() => { setOpenAddJust(false) }}>ยกเลิก</Button>
                    </Stack>
                </Box>
            </Modal>
        </React.Fragment >
    );
}
