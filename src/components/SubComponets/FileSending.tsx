import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from '@/api/axios';
import { AccordionDetails } from '@mui/material';
import { Accordion, AccordionSummary, Card, Stack, Typography } from '@mui/material';
import { DeleteForeverOutlined, ZoomIn } from '@mui/icons-material';
import { orange, red, green } from '@mui/material/colors';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import { FileListDetail } from '../ui/filelistdetail';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function FileSending({ itemprojectinfo, id_project }: any) {
    const [testcat, setTestcat] = useState<any>(1);
    const handleChangetestcat = (event: any) => {
        setTestcat(event.target.value);
    };
    console.log(itemprojectinfo)
    const [file, setFile] = useState<any>(null);
    const [fileList, setFileList] = useState<any>(null);

    const [fileList2, setFileList2] = useState<any>(null);
    React.useEffect(() => {
        Fecthfile();
    }, [id_project]);


    console.log(fileList)

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        // Validate if the selected file is a PDF
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            // Clear the file selection if it's not a PDF
            setFile(null);
            alert('Please select a valid PDF file.');
        }
    };

    // Fecth /projectfilelist with id_project
    const Fecthfile = () => {
        axios.get('/user/projectfilelist', {
            params: {
                id_project: id_project
            }
        }).then((response) => {
            if (response.data.result.length === 0) {
                setFileList(null);
            } else {
                // เรียงลำดับใหม่ ตอนนี้ หน้าไปท้าย เป็น ท้ายไปหน้า response.data.result

                setFileList(response.data.result);

            }
        })
        axios.get('/user/projectfilelist2', {
            params: {
                id_project: id_project
            }
        }).then((response) => {
            if (response.data.result.length === 0) {
                setFileList2(null);
            } else {
                // เรียงลำดับใหม่ ตอนนี้ หน้าไปท้าย เป็น ท้ายไปหน้า response.data.result

                setFileList2(response.data.result);
            }
        })
    }

    const mapping = [
        {
            id: 0,
            past: "สร้างโครงงาน",
            now: "เริ่มต้นตั้งค่าโครงงาน",
            how: "เพิ่มที่ปรึกษา",
            next: "รอการยื่นสอบหัวข้อ",
        },
        {
            id: 2,
            past: "เริ่มต้นตั้งค่าโครงงาน",
            now: "รอการยื่นสอบหัวข้อ",
            how: "แนบ ทก.01 เพื่อยื่นสอบ",
            next: "ยื่นสอบหัวข้อ",
        },
        {
            id: 3,
            past: "รอการยื่นสอบหัวข้อ",
            now: "ยื่นสอบหัวข้อ",
            how: "นำใบยื่นสอบส่งห้องภาควิชา",
            next: "แต่งตั้งกรรมการ",
        },
        {
            id: 4,
            past: "ยื่นสอบหัวข้อ",
            now: "รอแต่งตั้งกรรมการ",
            how: "ภาควิชากำลังดำเนินการ",
            next: "แต่งตั้งกรรมการ",
        },
        {
            id: 5,
            past: "รอแต่งตั้งกรรมการ",
            now: "แต่งตั้งกรรมการแล้ว",
            how: "ภาควิชากำลังดำเนินการ",
            next: "จัดวันสอบหัวข้อ",
        },
        {
            id: 6,
            past: "แต่งตั้งกรรมการ",
            now: "จัดวันสอบหัวข้อแล้ว",
            how: "เข้าสอบตามเวลา",
            next: "ยื่นแก้ไข ทก.01",
        },
        {
            id: 27,
            past: "สอบหัวข้อแล้ว",
            now: "รอการยื่นแก้ไข ทก.01",
            how: "นำทก.01 แก้ไข นำส่งห้องภาควิชา",
            next: "ภาควิชาตรวจสอบ ทก.01",
        },
        {
            id: 28,
            past: "ยื่นแก้ไข ทก.01",
            now: "ภาควิชาตรวจสอบ ทก.01",
            how: "ภาควิชากำลังดำเนินการ",
            next: "ยื่นสอบ หกสิบ/ร้อย",
        },
        {
            id: 7,
            past: "ภาควิชาตรวจสอบ ทก.01",
            now: "เลือกสอบ หกสิบ/ร้อย",
            how: "",
            next: "ยื่นสอบ",
        },
        {
            id: 8,
            past: "เลือกสอบ หกสิบ/ร้อย",
            now: "ยื่นสอบ หกสิบ",
            how: "นำใบยื่นสอบส่งห้องภาควิชา",
            next: "ภาควิชาตรวจสอบเอกสาร",
        },
        {
            id: 9,
            past: "ภาควิชาตรวจสอบเอกสาร",
            now: "ยื่นสอบ หกสิบ",
            how: "ภาควิชากำลังดำเนินการ",
            next: "จัดวันสอบหกสิบ",
        },
        {
            id: 10,
            past: "ยื่นสอบ หกสิบ",
            now: "จัดวันสอบหกสิบแล้ว",
            how: "เข้าสอบตามเวลา",
            next: "สอบหกสิบผ่าน",
        },
        {
            id: 11,
            past: "จัดวันสอบหกสิบแล้ว",
            now: "สอบหกสิบผ่านแล้ว",
            how: "",
            next: "ยื่นสอบร้อย",
        },
        {
            id: 12,
            past: "สอบหกสิบผ่านแล้ว",
            now: "ยื่นสอบร้อย",
            how: "นำใบยื่นสอบส่งห้องภาควิชา",
            next: "ภาควิชาตรวจสอบยื่นสอบร้อย",
        },
        {
            id: 13,
            past: "ยื่นสอบร้อย",
            now: "ภาควิชาตรวจสอบยื่นสอบร้อย",
            how: "ภาควิชากำลังดำเนินการ",
            next: "จัดวันสอบร้อย",
        },
        {
            id: 14,
            past: "ภาควิชาตรวจสอบยื่นสอบร้อย",
            now: "จัดวันสอบร้อยแล้ว",
            how: "เข้าสอบตามเวลา",
            next: "สอบร้อยผ่านแล้ว",
        },
        {
            id: 15,
            past: "สอบร้อยผ่านแล้ว",
            now: "สอบร้อยผ่านแล้ว",
            how: "แก้เล่มภายใน 30 วัน",
            next: "โครงงานพิเศษเสร็จสิ้นสมบูรณ์",
        },
        {
            id: 17,
            past: "สอบร้อยผ่านแล้ว",
            now: "สอบร้อยผ่านแล้ว",
            how: "",
            next: "โครงงานพิเศษเสร็จสิ้นสมบูรณ์",
        }
    ]


    const handleFileUpload = () => {
        if ((itemprojectinfo.id_project_status_title == 7) && testcat == 1) {
            alert('โปรดระบุประเภทการยื่นสอบ')
        }
        else {
            if (confirm('ยื่นสอบหรือไม่?')) {
                if (file) {
                    const formData = new FormData();
                    formData.append('', file);
                    formData.append('id_project', id_project)
                    formData.append('id_project_status', itemprojectinfo.id_project_status)
                    formData.append('id_project_status_title', itemprojectinfo.id_project_status_title)
                    formData.append('testcat', testcat)


                    // Perform Axios POST request to /user/file/upload
                    axios.post('/user/upload/pdf', formData)
                        .then(response => {
                            // Handle success
                            console.log('File uploaded successfully:', response.data);
                            window.location.reload();
                        })
                        .catch(error => {
                            // Handle error
                            console.error('Error uploading file:', error);
                        });
                } else {
                    alert('Please select a valid PDF file before uploading.');
                }
            }
        }
    }

    const handleFileDownload = (id_file: any) => {
        axios.get('/resources/public/download/pdf', {
            params: {
                file: id_file
            },
            responseType: 'arraybuffer', // Specify arraybuffer responseType
        }).then((response) => {
            // Create a Blob from the array buffer
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Create a data URL from the Blob
            const dataUrl = URL.createObjectURL(blob);

            // Open the PDF file in a new window or tab
            window.open(dataUrl, '_blank');
        });
    };

    // สร้าง fn เปลี่ยน timestamp เป็นวันที่ เวลา "2024-01-20T18:13:05.951Z"
    const convertDate = (timestamp: any) => {
        const date = new Date(timestamp);
        const convertedDate = date.toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' });

        return convertedDate;
    }

    const handleFileDelete = (id_file: any) => {

        axios.post('/user/prove', {
            id_project_status_title: itemprojectinfo.id_project_status_title,
            id_project_file_paths: id_file,
            id_project_status: itemprojectinfo.id_project_status
        }).then((response) => {
            console.log(response.data)
            window.location.reload();
        });
    }


    return (
        <>
            {
                fileList2 != null
                    ?
                    <>
                        <Accordion sx={{ mt: 1, width: '100%' }} expanded >
                            <AccordionDetails>
                                {/* 
                                {
    "id_project_member": 127,
    "id_project": "681043",
    "id_student": 374,
    "project_title_th": "1111",
    "project_title_en": "1111",
    "case_study_title_th": "1111",
    "case_study_title_en": "1111",
    "build_timestamp": "2024-05-23T13:22:35.444Z",
    "id_semester": 8,
    "subject_code": "60223122",
    "id_project_status": 84,
    "id_project_status_title": 3,
    "status_timestamp": "13:22:36.48234+00",
    "project_status_name_title": "ยื่นสอบหัวข้อ",
    "semester": "1",
    "year": "2568"
} */}
                                {
                                    fileList != null
                                        ?
                                        <>
                                            {
                                                (itemprojectinfo.id_project_status_title == 2 || itemprojectinfo.id_project_status_title == 7 || itemprojectinfo.id_project_status_title == 11 || itemprojectinfo.id_project_status_title == 27) ?
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        <Stack sx={{ mt: 2 }} spacing={2} direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center"

                                                        >

                                                            <Typography variant="body2" color="text.secondary">
                                                                {file ? file.name :
                                                                    itemprojectinfo.id_project_status_title == 27 ? 'โปรดเลือกไฟล์ ทก.01 เพื่อตรวจสอบการแก้ไข ทก.01' :
                                                                        'โปรดเลือกไฟล์ ทก.01 เพื่อพิจารณาการยื่นสอบ'
                                                                }
                                                            </Typography>
                                                            <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
                                                                แนบ ทก.01
                                                                <VisuallyHiddenInput
                                                                    type="file"
                                                                    onChange={handleFileChange}
                                                                    accept=".pdf" // Allow only PDF files
                                                                />
                                                            </Button>

                                                            {
                                                                (itemprojectinfo.id_project_status_title == 7) ?
                                                                    <Box sx={{ minWidth: 200 }}>
                                                                        <FormControl fullWidth>
                                                                            <InputLabel id="demo-simple-select-label">ประเภทยื่นสอบ</InputLabel>
                                                                            <Select
                                                                                labelId="demo-simple-select-label"
                                                                                id="demo-simple-select"
                                                                                value={testcat}
                                                                                label="ประเภทยื่นสอบ"
                                                                                onChange={handleChangetestcat}
                                                                            >
                                                                                <MenuItem value={1}>โปรดระบุ</MenuItem>
                                                                                <MenuItem value={2}>ยื่นสอบหกสิบ</MenuItem>
                                                                                <MenuItem value={3}>ยื่นสอบร้อย</MenuItem>
                                                                            </Select>
                                                                        </FormControl>
                                                                    </Box>
                                                                    :
                                                                    null
                                                            }
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={handleFileUpload}
                                                                disabled={!file} // Disable the button if no file selected
                                                            >

                                                                {
                                                                    (itemprojectinfo.id_project_status_title == 27) ? 'ยื่นแก้ไข ทก.01' : 'ยื่นสอบ'
                                                                }
                                                            </Button>
                                                        </Stack>
                                                    </Typography>
                                                    : ''
                                            }
                                            <Accordion sx={{ mt: 1, width: '100%' }} expanded >
                                                <AccordionSummary
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>สถานะการยื่นสอบ</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        fileList.map((file: any, index: any) => (
                                                            <FileListDetail key={index} file={file} handleFileDownload={handleFileDownload} handleFileDelete={handleFileDelete} />
                                                        ))
                                                    }



                                                </AccordionDetails>
                                            </Accordion>
                                        </>
                                        :
                                        (itemprojectinfo.id_project_status_title == 2 || itemprojectinfo.id_project_status_title == 7 || itemprojectinfo.id_project_status_title == 11 || itemprojectinfo.id_project_status_title == 27) ?
                                            <Typography variant="h6" gutterBottom component="div">
                                                <Stack sx={{ mt: 2 }} spacing={2} direction="row"
                                                    justifyContent="space-around"
                                                    alignItems="center"

                                                >

                                                    <Typography variant="body2" color="text.secondary">
                                                        {file ? file.name :
                                                            itemprojectinfo.id_project_status_title == 27 ? 'โปรดเลือกไฟล์ ทก.01 เพื่อตรวจสอบการแก้ไข ทก.01' :
                                                                'โปรดเลือกไฟล์ ทก.01 เพื่อพิจารณาการยื่นสอบ'
                                                        }
                                                    </Typography>
                                                    <Button component="label" variant="contained" startIcon={<UploadFileIcon />}>
                                                        อัพโหลด ทก.01
                                                        <VisuallyHiddenInput
                                                            type="file"
                                                            onChange={handleFileChange}
                                                            accept=".pdf" // Allow only PDF files
                                                        />
                                                    </Button>
                                                    {
                                                        (itemprojectinfo.id_project_status_title == 7) ?
                                                            <Box sx={{ minWidth: 200 }}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel id="demo-simple-select-label">ประเภทยื่นสอบ</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={testcat}
                                                                        label="ประเภทยื่นสอบ"
                                                                        onChange={handleChangetestcat}
                                                                    >
                                                                        <MenuItem value={1}>โปรดระบุ</MenuItem>
                                                                        <MenuItem value={2}>ยื่นสอบหกสิบ</MenuItem>
                                                                        <MenuItem value={3}>ยื่นสอบร้อย</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                            :
                                                            null
                                                    }
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleFileUpload}
                                                        disabled={!file} // Disable the button if no file selected
                                                    >
                                                        {
                                                            (itemprojectinfo.id_project_status_title == 27) ? 'ยื่นแก้ไข ทก.01' : 'ยื่นสอบ'
                                                        }
                                                    </Button>
                                                </Stack>
                                            </Typography>
                                            : ''
                                }

                                <Typography sx={{ pt: 0.3, pl: 4, width: '10%', flexShrink: 0 }}><p className='pl-4 pb-2 text-base'>ไฟล์ ทก.01</p> </Typography>
                                {
                                    fileList2.map((file: any, index: any) => (
                                        file.staus_code == 21 || file.staus_code == 25 || file.staus_code == 24 || file.staus_code == 19 || file.staus_code == 18 ?
                                            <Accordion key={index} sx={{ mt: 1, width: '100%' }} >
                                                <AccordionSummary
                                                    expandIcon={<KeyboardArrowUpIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                >
                                                    <Typography sx={{ pt: 0.3, width: '10%', flexShrink: 0 }}>บันทึกเมื่อ</Typography>
                                                    <Typography sx={{ pt: 0.3, width: '30%', flexShrink: 0 }}>{convertDate(file.timestamp)}</Typography>
                                                    {
                                                        file.staus_code == 21 ?
                                                            <Typography sx={{ pt: 0.3, color: orange[600] }}>{file.project_status_name_title}</Typography>
                                                            :
                                                            file.staus_code == 19 || file.staus_code == 18 || file.staus_code == 24 ?
                                                                <Typography sx={{ pt: 0.3, color: red[600] }}>{file.project_status_name_title}</Typography>
                                                                :
                                                                file.staus_code == 25 ?
                                                                    file.comment !== ' ' ?
                                                                        <Typography sx={{ pt: 0.3, color: green[600] }}>{(file.comment === 'undefined') ? 'กำลังดำเนินการโดนเจ้าหน้าที่' : "ผ่านแบบมีเงื่อนไข"}</Typography> :
                                                                        <Typography sx={{ pt: 0.3, color: green[600] }}>{file.project_status_name_title}</Typography>
                                                                    :
                                                                    null
                                                    }
                                                </AccordionSummary>

                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                    spacing={2}
                                                    sx={{ ml: 4, mr: 4 }}
                                                >
                                                    <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>รายละเอียด</Typography>
                                                    {/* remove button */}
                                                    {
                                                        file.staus_code == 21 ?
                                                            <Button onClick={() => { handleFileDelete(file.id_project_file_path) }} color='error' variant="outlined" sx={{ pl: 3, color: red[600] }} startIcon={<DeleteForeverOutlined />}></Button>
                                                            :
                                                            null
                                                    }
                                                </Stack>
                                                <AccordionDetails>
                                                    <Card sx={{ p: 1 }}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Stack direction="row" spacing={0}>
                                                            <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>เวลา</Typography>
                                                            <Stack direction="column" spacing={0}>
                                                                <Typography sx={{ mt: 0.3, color: 'text.secondary' }}>{convertDate(file.timestamp)}</Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Card>
                                                    <Card sx={{ p: 1 }}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Stack direction="row" spacing={0}>
                                                            <Typography sx={{ mt: 2, width: '33%', flexShrink: 0 }}>ไฟล์</Typography>
                                                            <Stack direction="column" spacing={0}>
                                                                <Typography sx={{ pt: 1, mb: 1, color: 'text.secondary' }}><Button onClick={() => handleFileDownload(file.path)} component="label" variant="contained" startIcon={<ZoomIn />}>ดูไฟล์</Button></Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Card>
                                                    {

                                                        file.comment != null ?
                                                            <Card sx={{ p: 1 }}
                                                                aria-controls="panel1a-content"
                                                                id="panel1a-header"
                                                            >
                                                                <Stack direction="row" spacing={0}>
                                                                    <Typography sx={{ mt: 0.1, width: '33%', flexShrink: 0 }}>หมายเหตุ</Typography>
                                                                    <Stack direction="column" spacing={0}>
                                                                        <Typography sx={{ mt: 0.3, color: 'text.secondary' }}>{file.comment}</Typography>
                                                                    </Stack>
                                                                </Stack>
                                                            </Card> : ''
                                                    }

                                                </AccordionDetails>

                                            </Accordion>

                                            :
                                            null
                                    ))
                                }

                            </AccordionDetails>
                        </Accordion>
                    </>
                    :
                    ''
            }

        </>
    );
}
