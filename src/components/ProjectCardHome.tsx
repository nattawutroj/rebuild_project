import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button, Card, Stack } from '@mui/material';
import { Edit, Home } from '@mui/icons-material';
import axios from '@/api/axios';
import FileSending from './SubComponets/FileSending';
import { Print } from '@mui/icons-material';

export default function ProjectCard({ projectinfo, setEditMode }: any) {
    const [member, setMember] = React.useState<any>([]);
    const [staff, setStaff] = React.useState<any>([]);

    let adviserContent: null | any = null;
    let countStd = 0;
    const fetchData = async () => {
        const result = await Promise.all(projectinfo.map((item: any) => search(item)));
        const flattenedResult: any = result.flat();
        setMember(flattenedResult);
    };

    const fetchStaff = async () => {
        await Promise.all(projectinfo.map((item: any) => searchStaff(item)));
    };
    React.useEffect(() => {
        fetchData();
        fetchStaff();
    }, [projectinfo]);

    const openDoc = (id: any, selectReport: any) => {
        window.open(`/testreport/${id}/${selectReport}`);
    }

    const search = async (item: any) => {
        try {
            const response = await axios.post('/user/checkjoin', {
                id_project: item.id_project
            });

            return response.data.status === 200 ? response.data.result : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    };
    const searchStaff = async (item: any) => {
        try {
            const response = await axios.post('/user/projectstafflist', {
                id_project: item.id_project
            });
            console.log(response.data.result)
            setStaff(response.data.result)
            return response.data.status === 200 ? response.data.result : [];
        } catch (error) {
            console.log(error);
            return [];
        }
    }
    return (
        <React.Fragment>
            {console.log(staff)}
            {projectinfo.map((item: any, index: any) => (
                <div className="card" key={index}>
                    <Accordion key={index} sx={{ mt: 1 }} defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Home sx={{ mr: 1 }} /><Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{'   ' + item.id_project}</Typography>
                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_status_name_title}</Typography>
                        </AccordionSummary>
                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={0} sx={{ mt: 1, mb: 1, mr: 2 }}>
                            {/* <Button onClick={() => { setEditMode(1) }} variant='outlined' color='primary' startIcon={<Edit sx={{ ml: 1.4 }} />}></Button> */}
                        </Stack>
                        <AccordionDetails>
                            <Card sx={{ p: 1 }}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack direction="row" spacing={0}>
                                    <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                                    <Stack direction="column" spacing={0}>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_title_th}</Typography>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.project_title_en}</Typography>
                                    </Stack>
                                </Stack>
                            </Card>
                            <Card sx={{ p: 1 }}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack direction="row" spacing={0}>
                                    <Typography sx={{ mt: 1, width: '33%', flexShrink: 0 }}>กรณีศึกษา</Typography>
                                    <Stack direction="column" spacing={0}>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.case_study_title_th}</Typography>
                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }}>{item.case_study_title_en}</Typography>
                                    </Stack>
                                </Stack>
                            </Card>
                            <Card sx={{ p: 1 }}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Stack direction="row" spacing={0}>
                                    <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ผู้จัดทำโครงงาน</Typography>
                                    <Stack direction="column" spacing={0}>
                                        {
                                            (member as {
                                                student_code: string;
                                                first_name_th: string;
                                                last_name_th: string; id_project: string
                                            }[]).map((data, index) => (
                                                (data.id_project === item.id_project) ?
                                                    (
                                                        countStd++,
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index}>{data.student_code + ' ' + data.first_name_th + ' ' + data.last_name_th}</Typography>
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
                                    <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ที่ปรึกษา</Typography>
                                    <Stack direction="column" spacing={0}>
                                        {
                                            staff.map((data: any, index: any) => {
                                                // Use a variable to conditionally render the "ไม่มีที่ปรึกษา" message

                                                data.staff.map((data2: any, index2: any) => {

                                                    if (data2.id_project === item.id_project && data2.id_project_staff_position === 1) {
                                                        adviserContent = (
                                                            <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>
                                                                {data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}
                                                            </Typography>
                                                        );
                                                    }
                                                });

                                                // Render the content for each staff member
                                                return (
                                                    <div key={index}>
                                                        {adviserContent ? adviserContent : <Typography sx={{ color: 'red' }} key={index}>ไม่มีที่ปรึกษา</Typography>}
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
                                    <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ที่ปรึกษาร่วม </Typography>
                                    <Stack direction="column" spacing={0}>
                                        {
                                            staff.map((data: any) => (
                                                data.staff.map((data2: any, index2: any) => (
                                                    (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                                        : ''
                                                ))
                                            ))
                                        }
                                        {
                                            staff.map((data: any) => (
                                                data.os_staff.map((data2: any, index2: any) => (
                                                    (data2.id_project === item.id_project && data2.id_project_staff_position === 4) ?
                                                        <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}</Typography>
                                                        : ''
                                                ))
                                            ))
                                        }
                                    </Stack>
                                </Stack>
                            </Card>
                            {
                                item.id_project_status_title === 3 || item.id_project_status_title === 8 || item.id_project_status_title === 12 ?
                                    <Stack direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center"
                                        spacing={2} sx={{ mt: 2.5, mr: 2 }}>
                                        <Typography variant="body1" color="text.secondary">
                                            โปรดพิมพ์เอกสารและนำส่งที่ห้องภาควิชา
                                        </Typography>
                                        {
                                            item.id_project_status_title === 3 ?
                                                <Button onClick={() => { openDoc(item.id_project, 0) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>ใบพิมพ์ยื่นสอบ</Button>
                                                : ''
                                        }
                                        {
                                            item.id_project_status_title === 8 ?
                                                <Button onClick={() => { openDoc(item.id_project, 10) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>ใบพิมพ์ยื่นสอบ</Button>
                                                : ''
                                        }
                                        {
                                            item.id_project_status_title === 12 ?
                                                <Button onClick={() => { openDoc(item.id_project, 100) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>ใบพิมพ์ยื่นสอบ</Button>
                                                : ''
                                        }
                                    </Stack>
                                    : ''
                            }
                        </AccordionDetails>
                        <FileSending itemprojectinfo={item} id_project={item.id_project} />
                    </Accordion>
                </div>
            ))}
        </React.Fragment>
    )
}