import { Stack } from '@mui/material';
import * as React from 'react';
import { AccordionDetails } from '@mui/material';
import { Card } from '@mui/material';
import { Typography } from '@mui/material';
import axios from '@/api/axios';
import { ButtonUI } from '../ui/button';


export default function ProjectDetail({ act, id, del }: any) {
    const [item, setItem] = React.useState<any>([]);
    const [staff, setStaff] = React.useState<any>([]);
    const [member, setMember] = React.useState<any>([]);
    let adviserContent: any = null;
    let countStd = 0;



    const projectinfomation = () => {
        axios.get('/resources/admin/projectinfomation',
            {
                params: {
                    id_project: id
                }
            }
        ).then(res => {
            setItem(res.data.result[0]);
        }).catch(err => {
            console.log(err);
        })

        axios.get('/resources/admin/projectinfomation/staff',
            {
                params: {
                    id_project: id
                }
            }
        ).then(res => {
            setStaff(res.data.result);
        }).catch(err => {
            console.log(err);
        })

        axios.get('/resources/admin/projectinfomation/student',
            {
                params: {
                    id_project: id
                }
            }
        ).then(res => {
            setMember(res.data.result.rows);
        }
        ).catch(err => {
            console.log(err);
        }
        )

    }

    const delProject = async (item: any, itemids: any) => {
        if (window.confirm('คุณต้องการนำนักศึกษาออกจากโครงงานหรือไม่? \n หากต้องการ กรุณากดปุ่ม OK หากไม่ต้องการ กรุณากดปุ่ม Cancel \n ** หากไม่มีนักศึกษาในโครงงาน โครงงานจะถูกลบออกจากระบบ **')) {
            if (window.confirm('******** ย้ำอีกครั้ง ********\nคุณต้องการนำนักศึกษาออกจากโครงงานหรือไม่? \n หากต้องการ กรุณากดปุ่ม OK หากไม่ต้องการ กรุณากดปุ่ม Cancel \n ** หากไม่มีนักศึกษาในโครงงาน โครงงานจะถูกลบออกจากระบบ **')) {
                try {
                    await axios.delete('/user/joinatadmin', {
                        data: {
                            params: {
                                id_project: item,
                                id_student: itemids
                            }
                        }
                    });
                    window.location.reload();
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    React.useEffect(() => {
        projectinfomation();
    }
        , [act])

    return (
        <React.Fragment>
            <AccordionDetails sx={{ fontFamily: "kanit" }}  >
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 1, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>ชื่อโครงงาน</Typography>
                        <Stack direction="column" spacing={0}>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }}>{item.project_title_th}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }}>{item.project_title_en}</Typography>
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 1, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>กรณีศึกษา</Typography>
                        <Stack direction="column" spacing={0}>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }}>{item.case_study_title_th}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }}>{item.case_study_title_en}</Typography>
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>ผู้จัดทำโครงงาน</Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                member?.map((data: any, index: any) => (
                                    (data.id_project === item.id_project) ? (
                                        countStd++,
                                        <Typography key={index} sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} >
                                            {data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}  <b>&nbsp;&nbsp;&nbsp;โทร</b> {data.phone}
                                            {
                                                del && <ButtonUI className='ml-4 w-auyo h-8 bg-red-600' onClick={() => delProject(data.id_project, data.id_student)}>นำออกจากโครงงาน</ButtonUI>
                                            }
                                        </Typography>
                                    )
                                        : ''
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>ประธาน </Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data: any) => (
                                    data.staff.map((data2: any, index2: any) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 2) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                            {
                                staff.map((data: any) => (
                                    data.os_staff.map((data2: any, index2: any) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 2) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>กรรมการ </Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data: any) => (
                                    data.staff.map((data2: any, index2: any) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 3) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                            {
                                staff.map((data: any) => (
                                    data.os_staff.map((data2: any, index2: any) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 3) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>ที่ปรึกษา</Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data: any, index: any) => {
                                    // Use a variable to conditionally render the "ไม่มีที่ปรึกษา" message

                                    data.staff.map((data2: any, index2: any) => {

                                        if (data2.id_project === item.id_project && data2.id_project_staff_position === 1) {
                                            adviserContent = (
                                                <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>
                                                    {data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}
                                                </Typography>
                                            );
                                        }
                                    });

                                    // Render the content for each staff member
                                    return (
                                        <div key={index}>
                                            {adviserContent ? adviserContent : <Typography sx={{ color: 'red', fontFamily: "kanit" }} key={index}>ไม่มีที่ปรึกษา</Typography>}
                                        </div>
                                    );
                                })
                            }

                        </Stack>
                    </Stack>
                </Card>
                <Card sx={{ p: 1 }}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Stack direction="row" spacing={0}>
                        <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0, fontFamily: "kanit" }}>ที่ปรึกษาร่วม </Typography>
                        <Stack direction="column" spacing={0}>
                            {
                                staff.map((data: any) => (
                                    data.staff.map((data2: any, index2: any) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                            {
                                staff.map((data: any) => (
                                    data.os_staff.map((data2: any, index2: any) => (
                                        (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                            <Typography sx={{ pt: 0.3, color: 'text.secondary', fontFamily: "kanit" }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                            : ''
                                    ))
                                ))
                            }
                        </Stack>
                    </Stack>
                </Card>
            </AccordionDetails>
        </React.Fragment>
    )
}