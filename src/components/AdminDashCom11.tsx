import React from "react";
import axios from "@/api/axios";
import { Accordion, Box, Grid, MenuItem, Modal, Select, TextField } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import { Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Card } from "@mui/material";
import { Button } from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Print } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";
import { orange } from "@mui/material/colors";
import { ZoomIn } from "@mui/icons-material";
import ProjectDetail from './SubComponets/ProjectDetail';
import { Check as CheckIcon } from "@mui/icons-material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { FormControl } from "@mui/material";
import { InputLabel } from "@mui/material";
import { NativeSelect } from "@mui/material";
import { Add } from "@mui/icons-material";
import ModalAddJust from "./ModalAddJust";
import { IconButton } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Calander from "./SubComponets/Calander";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    typography: {
        fontFamily: 'Kanit, sans-serif',
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    h1: 'h2',
                    h2: 'h2',
                    h3: 'h2',
                    h4: 'h2',
                    h5: 'h2',
                    h6: 'h2',
                    subtitle1: 'h2',
                    subtitle2: 'h2',
                    body1: 'span',
                    body2: 'span',
                },
            },
        },
    },
})

export default function AdminDash() {
    const [dialogstaff, setDialogstaff] = React.useState<any>(false);
    const [aaid_staff, setAaid_staff] = React.useState<any>('');
    const [openCalander, setOpenCalander] = React.useState<any>(false);
    const [lableexam1, setLableexam1] = React.useState<any>(0);
    const [lableexam2, setLableexam2] = React.useState<any>(0);
    const [lableexam3, setLableexam3] = React.useState<any>(0);
    const [projectProcessCount, setProjectProcessCount] = React.useState<any>(0);
    const [projectProcessWaitSchduleCount, setProjectProcessWaitSchduleCount] = React.useState<any>(0);
    const [projectProcessWaitSchdule60Count, setProjectProcessWaitSchdule60Count] = React.useState<any>(0);
    const [projectProcessWaitSchdule100Count, setProjectProcessWaitSchdule100Count] = React.useState<any>(0);
    const [projectProcessWaitRecordCount, setProjectProcessWaitRecordCount] = React.useState<any>(0);
    const [projectProcessWaitConfiremT01Count, setprojectProcessWaitConfiremT01Count] = React.useState<any>(0);
    const [projectProcessWaitRecord60Count, setProjectProcessWaitRecord60Count] = React.useState<any>(0);
    const [projectProcessWaitRecord100Count, setProjectProcessWaitRecord100Count] = React.useState<any>(0);
    const [projectProcessWaitRecordFinalCount, setProjectProcessWaitRecordFinalCount] = React.useState<any>(0);
    const listcount = () => {
        setLableexam1(0);
        setLableexam2(0);
        setLableexam3(0);
        setProjectProcessCount(0);
        setProjectProcessWaitSchduleCount(0);
        setProjectProcessWaitSchdule60Count(0);
        setProjectProcessWaitSchdule100Count(0);
        setProjectProcessWaitRecordCount(0);
        setprojectProcessWaitConfiremT01Count(0);
        setProjectProcessWaitRecord60Count(0);
        setProjectProcessWaitRecord100Count(0);
        setProjectProcessWaitRecordFinalCount(0);
        fileList.map((file: { id_project_status_title: number }) => {
            if (file.id_project_status_title == 3) {
                setLableexam1((prevLableexam1: any) => prevLableexam1 + 1);
            }
            if (file.id_project_status_title == 8) {
                setLableexam2((prevLableexam2: any) => prevLableexam2 + 1);
            }
            if (file.id_project_status_title == 12) {
                setLableexam3((prevLableexam3: any) => prevLableexam3 + 1);
            }
        }
        )
        projectProcess?.map(() => {
            setProjectProcessCount((prevProjectProcessCount: any) => prevProjectProcessCount + 1);
        }
        )
        projectProcessWaitSchdule?.map(() => {
            setProjectProcessWaitSchduleCount((prevProjectProcessWaitSchduleCount: any) => prevProjectProcessWaitSchduleCount + 1);
        }
        )
        projectProcessWaitSchdule60?.map(() => {
            setProjectProcessWaitSchdule60Count((prevProjectProcessWaitSchdule60Count: any) => prevProjectProcessWaitSchdule60Count + 1);
        }
        )
        projectProcessWaitSchdule100?.map(() => {
            setProjectProcessWaitSchdule100Count((prevProjectProcessWaitSchdule100Count: any) => prevProjectProcessWaitSchdule100Count + 1);
        }
        )
        projectProcessWaitRecord?.map(() => {
            setProjectProcessWaitRecordCount((prevProjectProcessWaitRecordCount: any) => prevProjectProcessWaitRecordCount + 1);
        })
        projectProcessWaitRecord60?.map(() => {
            setProjectProcessWaitRecord60Count((prevProjectProcessWaitRecord60Count: any) => prevProjectProcessWaitRecord60Count + 1);
        })
        projectProcessWaitRecord100?.map(() => {
            setProjectProcessWaitRecord100Count((prevProjectProcessWaitRecord100Count: any) => prevProjectProcessWaitRecord100Count + 1);
        })
        projectProcessWaitConfiremT01?.map(() => {
            setprojectProcessWaitConfiremT01Count((prevprojectProcessWaitConfiremT01Count: any) => prevprojectProcessWaitConfiremT01Count + 1);
        })
        projectProcessWaitRecordFinal.map(() => {
            console.log("hello")
            setProjectProcessWaitRecordFinalCount((prevProjectProcessWaitRecordFinalCount: any) => prevProjectProcessWaitRecordFinalCount + 1);
        })
    }


    const handleCloseDelStaff = () => {
        setDialogstaff(false);
    };

    const handleRemoveStaff = (id: any) => {
        setAaid_staff(id);
        setDialogstaff(true);
    }

    const confimdelStaff = () => {
        axios.delete('/user/projectstaff', {
            data: {
                id_project_staff: aaid_staff
            }
        })
            .then(res => {
                if (res.data.status === 200) {
                    window.alert("ลบข้อมูลสำเร็จ");
                    setDialogstaff(false);
                    setAct(act + 1);
                } else {
                    window.alert("ลบข้อมูลไม่สำเร็จ");
                }
            }
            )
            .catch(err => {
                console.log(err);
            });
    }


    const style = {
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
    };

    const [fileList, setFileList] = React.useState<any>([]);
    const [projectProcess, setProjectProcess] = React.useState<any>([]);
    const [projectProcessWaitSchdule, setProjectProcessWaitSchdule] = React.useState<any>([]);
    const [projectProcessWaitSchdule60, setProjectProcessWaitSchdule60] = React.useState<any>([]);
    const [projectProcessWaitSchdule100, setProjectProcessWaitSchdule100] = React.useState<any>([]);
    const [projectProcessWaitRecord, setProjetProcessWaitRecord] = React.useState<any>([]);
    const [projectProcessWaitConfiremT01, setProjectProcessWaitConfiremT01] = React.useState<any>([]);
    const [projectProcessWaitRecord60, setProjetProcessWaitRecord60] = React.useState<any>([]);
    const [projectProcessWaitRecord100, setProjetProcessWaitRecord100] = React.useState<any>([]);
    const [projectProcessWaitRecordFinal, setProjetProcessWaitRecordFinal] = React.useState<any>([]);
    const [expanded, setExpanded] = React.useState<any>(false);
    const [openCancel, setOpenCancel] = React.useState<any>(false);
    const [Canceldatafrom, setCanceldatafrom] = React.useState<any>([]);
    const [Cancelcomment, setCancelcomment] = React.useState<any>('');
    const [selectstatus_code, setSelectStatus_code] = React.useState<any>(21);
    const [openAddJust, setOpenAddJust] = React.useState<any>(false);
    const [projectcode, setProjectcode] = React.useState<any>('');
    const [staff, setStaff] = React.useState<any>([]);
    const [ajid, setAjid] = React.useState<any>('');
    const [act, setAct] = React.useState<any>(0);
    const [idprojectstatustitle, setIdprojectstatustitle] = React.useState<any>('');
    const [modalRecord, setmodalRecord] = React.useState<any>(false);
    const [modalRecord2, setmodalRecord2] = React.useState<any>(false);
    const [examrecord, setExamrecord] = React.useState<any>('');
    const [examrecordcomment, setExamrecordcomment] = React.useState<any>('');
    const [a1, setA1] = React.useState<any>('');
    const [a2, setA2] = React.useState<any>('');
    const [a3, setA3] = React.useState<any>('');
    const [a4, setA4] = React.useState<any>('');

    React.useEffect(() => {
        axios.get('/resources/admin/projectinfomation/staff',
            {
                params: {
                    id_project: ajid
                }
            }
        ).then(res => {
            setStaff(res.data.result);
        }).catch(err => {
            console.log(err);
        });
    }, [ajid, act]);

    const convertDate = (date: any) => {
        let d = new Date(date);
        return d.toLocaleString();
    }

    const [pdfUrl, setPdfUrl] = React.useState<any>('');


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
            if (window.innerWidth < 900) {
                setPdfUrl('');
                window.open(dataUrl);
            }
            else {
                setPdfUrl(dataUrl);
            }
        }).catch(err => {
            setPdfUrl('')
            console.log(err);
        }
        );
    };

    const cfrecordexam = () => {
        var x = 0;
        if (Number(idprojectstatustitle) === 6) {
            x = 1;
        }
        if (examrecord == 'ผ่าน') {
            handlereportConfirmUNC(a1, a4, a3, ' ')
        }
        else if (examrecord == 'ผ่านแบบมีเงื่อนไข') {
            handlereportConfirmUNC(a1, a4, a3, examrecordcomment)
        }
        else if (examrecord == 'ไม่ผ่าน') {
            handleCancelcommentUNC(a1, examrecordcomment, a3, a4)
        }
        else if (examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
            handleCancelcommentUNC(a1, examrecordcomment, a3, a4)
        }
        axios.post('/resources/admin/recordexam',
            {
                id_project: ajid,
                id_test_category: x,
                status_exam: examrecord,
                comment_exam: examrecordcomment
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }



    const Fetchreqreport = () => {
        axios.get('resources/admin/reqreport',
            {
                params: {
                    status_code: selectstatus_code
                }
            }
        ).then(res => {
            setPdfUrl('')
            console.log(res)
            setFileList(res.data.result);
            setExpanded(false);
        }).catch(err => {
            console.log(err);
        })
    }

    React.useEffect(() => {
        listcount();
    }, [fileList, projectProcess, projectProcessWaitSchdule, projectProcessWaitSchdule60, projectProcessWaitSchdule100, projectProcessWaitRecord, projectProcessWaitRecord60, projectProcessWaitRecord100, projectProcessWaitRecordFinal, projectProcessWaitConfiremT01])

    const FetchProjectProcess = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 4
            }
        })
            .then(response => {
                const projectProcessData = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessData.map((item: { id_project: any; }) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessData with fileLastUpdates
                        const combinedData = projectProcessData.map((item: any, index: any | number) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl('');
                // setProjectProcess(prevProjectProcess => [...prevProjectProcess, ...combinedData]);
                setProjectProcess(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitSchdule = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 5
            }
        })
            .then(response => {
                const projectProcessWaitSchduleData = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitSchduleData.map((item: { id_project: any; }) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitSchduleData with fileLastUpdates
                        const combinedData = projectProcessWaitSchduleData.map((item: any, index: any | number) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl('');
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjectProcessWaitSchdule(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const FetchProjectProcessWaitSchdule60 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 9
            }
        })
            .then(response => {
                const projectProcessWaitSchduleData60 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitSchduleData60.map((item: { id_project: any; }) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitSchduleData60 with fileLastUpdates
                        const combinedData = projectProcessWaitSchduleData60.map((item: any, index: any | number) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl('');
                setProjectProcessWaitSchdule60(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitSchdule100 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 13
            }
        })
            .then(response => {
                const projectProcessWaitSchduleData100 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitSchduleData100.map((item: { id_project: any; }) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        const combinedData = projectProcessWaitSchduleData100.map((item: any, index: any) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                setProjectProcessWaitSchdule100(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitRecordExtam = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 6
            }
        })
            .then(response => {
                const projectProcessWaitRecord = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecord.map((item: any) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitRecord with fileLastUpdates
                        const combinedData = projectProcessWaitRecord.map((item: any, index: any) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecord(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitRecordExtam60 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 10
            }
        })
            .then(response => {
                const projectProcessWaitRecord60 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecord60.map((item: any) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitRecord60 with fileLastUpdates
                        const combinedData = projectProcessWaitRecord60.map((item: any, index: any) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecord60(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };
    const FetchProjectProcessWaitRecordExtam100 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 14
            }
        })
            .then(response => {
                const projectProcessWaitRecord100 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecord100.map((item: any) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitRecord100 with fileLastUpdates
                        const combinedData = projectProcessWaitRecord100.map((item: any, index: any) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecord100(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitRecordExtamFinal = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 15
            }
        })
            .then(response => {
                const projectProcessWaitRecordFinal = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitRecordFinal.map((item: any) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitRecordFinal with fileLastUpdates
                        const combinedData = projectProcessWaitRecordFinal.map((item: any, index: any) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjetProcessWaitRecordFinal(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const FetchProjectProcessWaitConfiremT01 = () => {
        axios.get('resources/admin/projectadminprocess', {
            params: {
                project_process: 28
            }
        })
            .then(response => {
                const projectProcessWaitConfiremT01 = response.data.result.rows;

                // Use Promise.all to handle multiple asynchronous calls
                const fileLastUpdatePromises = projectProcessWaitConfiremT01.map((item: any) => {
                    return axios.get('resources/admin/projectfilelast', {
                        params: {
                            id_project: item.id_project
                        }
                    })
                        .then(res => res.data.result[0])
                        .catch(err => {
                            console.log(err);
                            return null;
                        });
                });

                // Wait for all promises to resolve
                return Promise.all(fileLastUpdatePromises)
                    .then(fileLastUpdates => {
                        // Combine projectProcessWaitRecord100 with fileLastUpdates
                        const combinedData = projectProcessWaitConfiremT01.map((item: any, index: any) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
                // setProjectProcessWaitSchdule(prevProjectProcessWaitSchdule => [...prevProjectProcessWaitSchdule, ...combinedData]);
                setProjectProcessWaitConfiremT01(combinedData);
                setExpanded(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const Viewpdf = (id: any) => {
        handleFileDownload(id);
    }


    const handleChange = (panel: any) => {
        setExpanded(panel);
    }

    React.useEffect(() => {
        Fetchreqreport();
        FetchProjectProcess();
        FetchProjectProcessWaitSchdule();
        FetchProjectProcessWaitSchdule60();
        FetchProjectProcessWaitSchdule100();
        FetchProjectProcessWaitConfiremT01();
        FetchProjectProcessWaitRecordExtam();
        FetchProjectProcessWaitRecordExtam60();
        FetchProjectProcessWaitRecordExtam100();
        FetchProjectProcessWaitRecordExtamFinal();
    }, [selectstatus_code])

    const handlereportCancel = (id_project_file_paths: any, id_project_status_title: any, id_project_status: any) => {
        setCanceldatafrom({
            id_project_file_paths: id_project_file_paths,
            id_project_status_title: id_project_status_title,
            id_project_status: id_project_status
        })
        setOpenCancel(true)
    }

    const handleCancelcomment = () => {
        console.log(Canceldatafrom.id_project_file_paths, Cancelcomment, Canceldatafrom.id_project_status_title, Canceldatafrom.id_project_status);
        if (examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
            axios.post('resources/admin/reqreport/provere',
                {
                    id_project_file_paths: Canceldatafrom.id_project_file_paths,
                    comment: Cancelcomment,
                    id_project_status: Canceldatafrom.id_project_status,
                    id_project_status_title: Canceldatafrom.id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
        else {
            axios.post('resources/admin/reqreport/prove',
                {
                    id_project_file_paths: Canceldatafrom.id_project_file_paths,
                    comment: Cancelcomment,
                    id_project_status: Canceldatafrom.id_project_status,
                    id_project_status_title: Canceldatafrom.id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
    }
    const handlereportConfirm = (id_project_file_paths: any, comment: any, id_project_status_title: any, id_project_status: any) => {
        console.log(id_project_file_paths, comment, id_project_status_title, id_project_status);
        if (confirm("ยืนยันการดำเนินการ")) {
            axios.post('resources/admin/reqreport/approve',
                {
                    id_project_file_paths: id_project_file_paths,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        } else {
            null
        }
    }
    const handleCancelcommentUNC = (id_project_file_paths: any, comment: any, id_project_status_title: any, id_project_status: any) => {
        if (examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
            axios.post('resources/admin/reqreport/provere',
                {
                    id_project_file_paths: id_project_file_paths,
                    comment: comment,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
        else {

            axios.post('resources/admin/reqreport/prove',
                {
                    id_project_file_paths: id_project_file_paths,
                    comment: comment,
                    id_project_status: id_project_status,
                    id_project_status_title: id_project_status_title,
                    id_project: ajid
                }
            ).then((response) => {
                console.log(response);
                window.location.reload();
            });
        }
    }
    const handlereportConfirmUNC = (id_project_file_paths: any, id_project_status_title: any, id_project_status: any, cm: any) => {
        axios.post('resources/admin/reqreport/approve',
            {
                id_project_file_paths: id_project_file_paths,
                id_project_status: id_project_status_title,
                id_project_status_title: id_project_status,
                id_project: ajid,
                comment: cm
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    const openDoc = (id: any, selectReport: any) => {
        window.open(`/testreport/${id}/${selectReport}`);
    }

    const openDocWidget = (id: any, selectReport: any) => {
        if (window.innerWidth < 900) {
            setPdfUrl(null)
            window.open(`/testreport/${id}/${selectReport}`);
        }
        else {
            setPdfUrl(`/testreport/${id}/${selectReport}`);
        }
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container spacing={2}>
                    <Grid sx={{ height: '100vh', overflowY: 'scroll' }} item xs={12} md={12} lg={6}>
                        <AccordionSummary expandIcon={<KeyboardArrowUpIcon />} aria-controls="panel1a-content" id="panel1a-header">
                            <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบร้อย</Typography>
                            {
                                projectProcessWaitRecord100Count > 0 ?
                                    <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecord100Count} โครงงานรอทำรายการ</Typography>
                                    :
                                    <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                            }
                        </AccordionSummary>
                        <Stack direction="row" justifyContent="space-between" alignItems="left" spacing={2} sx={{ borderTop: 1, ml: 2, pt: 2 }}>

                            <Typography sx={{ pt: 0.3, width: '37%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>รหัสโครงงาน</Typography>

                            <Typography sx={{ pt: 0.3, width: '70%', fontSize: 20, fontWeight: "bold", flexShrink: 0 }}>ชื่อโครงงาน</Typography>
                        </Stack>
                        {projectProcessWaitRecord100.map((file: any, index: any) => (
                            <Accordion expanded={expanded === `${file.fileLastUpdate.id_project_file_path}`} onChange={() => { handleChange(`${file.fileLastUpdate.id_project_file_path}`), openDocWidget(file.id_project, 101) }} key={index} sx={{ backgroundColor: "#DCFCE7", mt: 1, width: '100%' }} >
                                <AccordionSummary
                                    expandIcon={<KeyboardArrowUpIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>{file.id_project}</Typography>
                                    <Stack direction="column"
                                        justifyContent="space-between"
                                    >
                                        <Typography sx={{ pt: 0.3 }}>{file.project_title_th}</Typography>
                                        <Typography sx={{ pt: 0.3 }}>{file.id_project_status_title == 6 ? 'สอบหัวข้อ' : ''}</Typography>
                                    </Stack>
                                </AccordionSummary>

                                <Stack direction="row"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    spacing={2} sx={{ mb: 2, mr: 2 }}>
                                    <Button onClick={() => { openDoc(file.id_project, 101) }} sx={{ mt: 0, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Print />}>พิมพ์ใบประเมินการสอบ</Button>
                                </Stack>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                    sx={{ ml: 4, mr: 4 }}
                                >
                                </Stack>
                                <ProjectDetail del={false} act={act} id={file.id_project} />

                                {/* <Button onClick={() => { setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setProjectcode(file.id_project), setOpenCalander(true) }} sx={{ mt: 2.5, mb: 1, ml: 2 }} variant='contained' color='primary' startIcon={<Add />}>บันทึกผลการสอบ</Button> */}
                                {
                                    <AccordionDetails >
                                        <Stack direction="row"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            spacing={2} sx={{ mt: 2.5 }}>
                                            <Button
                                                onClick={() => { setA1(file.fileLastUpdate.id_project_file_path), setA2("สำเร็จ"), setA3(file.id_project_status_title), setA4(file.id_project_status), setIdprojectstatustitle(file.id_project_status_title), setAjid(file.id_project), setmodalRecord(true) }} variant='contained' color='success' startIcon={<CheckIcon />}>บันทึกผลการสอบ</Button>
                                        </Stack>

                                    </AccordionDetails>
                                }
                            </Accordion>
                        ))}
                    </Grid>
                    {
                        pdfUrl != null ?
                            window.innerWidth > 600 ?
                                <Grid item xs={12} md={12} lg={6}>
                                    <iframe
                                        src={pdfUrl}
                                        title="file"
                                        style={{ width: '100%', height: '100vh', border: 'none' }}
                                    />
                                </Grid>
                                :
                                null
                            :
                            null
                    }
                </Grid>
                <Modal open={openCancel} onClose={() => { setOpenCancel(false) }}>
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">บันทึกผลการสอบ</h2>
                        <FormControl fullWidth>
                            <InputLabel id="exam-record-select-label">ผลการสอบ</InputLabel>
                            <Select
                                labelId="exam-record-select-label"
                                id="exam-record-select"
                                value={examrecord}
                                onChange={(e) => { setExamrecord(e.target.value) }}
                                label="ผลการสอบ"
                            >
                                <MenuItem value="ผ่าน">ผ่าน</MenuItem>
                                <MenuItem value="ผ่านแบบมีเงื่อนไข">ผ่านแบบมีเงื่อนไข</MenuItem>
                                <MenuItem value="ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา">ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา</MenuItem>
                                <MenuItem value="ไม่ผ่าน">ไม่ผ่าน</MenuItem>
                            </Select>
                        </FormControl>
                        <Box component="form" noValidate onSubmit={handleCancelcomment} sx={{ mt: 1 }}>
                            {
                                (examrecord === 'ไม่ผ่าน' || examrecord === 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') &&
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="comment"
                                    label="หมายเหตุ"
                                    name="comment"
                                    autoFocus
                                    value={examrecordcomment}
                                    onChange={(e) => { setExamrecordcomment(e.target.value) }}
                                />
                            }

                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2} sx={{ mt: 2.5 }}>
                                <Button
                                    onClick={() => {
                                        if (examrecord !== '') {
                                            if (examrecord === 'ไม่ผ่าน' || examrecord === 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') {
                                                if (examrecordcomment !== '') {
                                                    if (confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')) {
                                                        cfrecordexam();
                                                    }
                                                } else {
                                                    window.alert('กรุณากรอกหมายเหตุ');
                                                }
                                            } else {
                                                if (confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')) {
                                                    cfrecordexam();
                                                }
                                            }
                                        } else {
                                            window.alert('กรุณาเลือกผลการสอบ');
                                        }
                                    }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ยืนยัน
                                </Button>
                                <Button onClick={() => { setmodalRecord(false) }} variant='contained' color='error'>ยกเลิก</Button>
                            </Stack>
                        </Box>
                    </Box>

                </Modal>
                <Modal
                    open={openAddJust}
                    onClose={() => setOpenAddJust(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ ...style, width: 450 }}>
                        <ModalAddJust act={act} setAct={setAct} setOpenAddJust={setOpenAddJust} projectcode={projectcode} />
                        <Card sx={{ p: 1 }}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Stack direction="row" spacing={0}>
                                <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>ประธาน</Typography>
                                <Stack direction="column" spacing={0}>
                                    {
                                        staff.map((data: any) => (
                                            data.staff.map((data2: any, index2: any) => (
                                                (data2.id_project === ajid && data2.id_project_staff_position === 2) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
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
                                <Typography sx={{ mt: 0.3, width: '33%', flexShrink: 0 }}>กรรมการ </Typography>
                                <Stack direction="column" spacing={0}>
                                    {
                                        staff.map((data: any) => (
                                            data.staff.map((data2: any, index2: any) => (
                                                (data2.id_project === ajid && data2.id_project_staff_position === 3) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                    : ''
                                            ))
                                        ))
                                    }
                                    {
                                        staff.map((data: any) => (
                                            data.os_staff.map((data2: any, index2: any) => (
                                                (data2.id_project === ajid && data2.id_project_staff_position === 3) ?
                                                    <Typography sx={{ pt: 0.3, color: 'text.secondary' }} key={index2}>{data2.name_title_th + ' ' + data2.first_name_th + ' ' + data2.last_name_th}<IconButton onClick={() => { handleRemoveStaff(data2.id_project_staff) }} sx={{ pb: 1.2 }} aria-label="delete"><DeleteIcon color="error" fontSize="small" /></IconButton></Typography>
                                                    : ''
                                            ))
                                        ))
                                    }
                                </Stack>
                            </Stack>
                        </Card>
                    </Box>
                </Modal>

                <Modal open={openCalander} onClose={() => { setOpenCalander(false) }}>
                    <Box sx={{ ...style, width: '900px' }}>
                        <Calander idprojectstatustitle={idprojectstatustitle} setOpenCalander={setOpenCalander} ajid={ajid} />
                    </Box>
                </Modal>

                <Dialog
                    open={dialogstaff}
                    onClose={handleCloseDelStaff}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Remove"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            ยืนยันต้องการลบข้อมูลนี้หรือไม่
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDelStaff}>ยกเลิก</Button>
                        <Button onClick={confimdelStaff} autoFocus>
                            ยืนยัน
                        </Button>
                    </DialogActions>
                </Dialog>
                <Modal open={modalRecord} onClose={() => { setmodalRecord(false) }}>
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">บันทึกผลการสอบ</h2>
                        <FormControl fullWidth>
                            <InputLabel id="exam-record-select-label">ผลการสอบ</InputLabel>
                            <Select
                                labelId="exam-record-select-label"
                                id="exam-record-select"
                                value={examrecord}
                                onChange={(e) => { setExamrecord(e.target.value) }}
                                label="ผลการสอบ"
                            >
                                <MenuItem value="ผ่าน">ผ่าน</MenuItem>
                                <MenuItem value="ผ่านแบบมีเงื่อนไข">ผ่านแบบมีเงื่อนไข</MenuItem>
                                <MenuItem value="ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา">ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา</MenuItem>
                                <MenuItem value="ไม่ผ่าน">ไม่ผ่าน</MenuItem>
                            </Select>
                        </FormControl>
                        <Box component="form" noValidate onSubmit={handleCancelcomment} sx={{ mt: 1 }}>

                            {
                                (examrecord === 'ผ่านแบบมีเงื่อนไข' || examrecord === 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา') &&
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="comment"
                                    label="หมายเหตุ"
                                    name="comment"
                                    autoFocus
                                    value={examrecordcomment}
                                    onChange={(e) => { setExamrecordcomment(e.target.value) }}
                                />
                            }
                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2} sx={{ mt: 2.5 }}><Button
                                    onClick={() => {
                                        examrecord != ''
                                            ?
                                            examrecord == 'ไม่ผ่าน' || examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา'
                                                ?
                                                examrecordcomment != ''
                                                    ?
                                                    confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                        ?
                                                        cfrecordexam()
                                                        :
                                                        null
                                                    :
                                                    window.alert('กรุณากรอกหมายเหตุ')
                                                :
                                                confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                    ?
                                                    cfrecordexam()
                                                    :
                                                    null
                                            :
                                            window.alert('กรุณาเลือกผลการสอบ')
                                    }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ยืนยัน
                                </Button>
                                <Button onClick={() => { setmodalRecord(false) }} variant='contained' color='error'>ยกเลิก</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Modal>
                <Modal open={modalRecord2} onClose={() => { setmodalRecord(false) }}>
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 id="parent-modal-title">บันทึกผลการตรวจ ทก.01</h2>
                        <RadioGroup
                            onChange={(e) => { setExamrecord(e.target.value) }}
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="ผ่าน" control={<Radio />} label="ผ่าน" />
                            <FormControlLabel value="ผ่านแบบมีเงื่อนไข" control={<Radio />} label="ผ่านแบบมีเงื่อนไข" />
                            <FormControlLabel value="ไม่ผ่านยื่นใหม่ภายในช่วงเวลา" control={<Radio />} label="ไม่ผ่านยื่นส่งใหม่" />
                            <FormControlLabel value="ไม่ผ่าน" control={<Radio />} label="ไม่ผ่าน" />
                        </RadioGroup>
                        <Box component="form" noValidate onSubmit={handleCancelcomment} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="comment"
                                label="หมายเหตุ"
                                name="comment"
                                autoFocus
                                value={examrecordcomment}
                                onChange={(e) => { setExamrecordcomment(e.target.value) }}
                            />

                            <Stack direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                spacing={2} sx={{ mt: 2.5 }}><Button
                                    onClick={() => {
                                        examrecord != ''
                                            ?
                                            examrecord == 'ไม่ผ่าน' || examrecord == 'ไม่ผ่านยื่นสอบใหม่ภายในช่วงเวลา'
                                                ?
                                                examrecordcomment != ''
                                                    ?
                                                    confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                        ?
                                                        cfrecordexam()
                                                        :
                                                        null
                                                    :
                                                    window.alert('กรุณากรอกหมายเหตุ')
                                                :
                                                confirm('ยืนยันต้องการบันทึกข้อมูลนี้หรือไม่')
                                                    ?
                                                    cfrecordexam()
                                                    :
                                                    null
                                            :
                                            window.alert('กรุณาเลือกผลการสอบ')
                                    }}
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    ยืนยัน
                                </Button>
                                <Button onClick={() => { setmodalRecord(false) }} variant='contained' color='error'>ยกเลิก</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Modal>
            </ThemeProvider >
        </>
    )
}