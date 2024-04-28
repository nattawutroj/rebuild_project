import React from "react";
import axios from "@/api/axios";
import { AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "@tanstack/react-router";


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
    const navigate = useNavigate();
    const [dialogstaff, setDialogstaff] = React.useState(false);
    const [aaid_staff, setAaid_staff] = React.useState('');
    const [openCalander, setOpenCalander] = React.useState(false);
    const [lableexam1, setLableexam1] = React.useState(0);
    const [lableexam2, setLableexam2] = React.useState(0);
    const [lableexam3, setLableexam3] = React.useState(0);
    const [projectProcessCount, setProjectProcessCount] = React.useState(0);
    const [projectProcessWaitSchduleCount, setProjectProcessWaitSchduleCount] = React.useState(0);
    const [projectProcessWaitSchdule60Count, setProjectProcessWaitSchdule60Count] = React.useState(0);
    const [projectProcessWaitSchdule100Count, setProjectProcessWaitSchdule100Count] = React.useState(0);
    const [projectProcessWaitRecordCount, setProjectProcessWaitRecordCount] = React.useState(0);
    const [projectProcessWaitConfiremT01Count, setprojectProcessWaitConfiremT01Count] = React.useState(0);
    const [projectProcessWaitRecord60Count, setProjectProcessWaitRecord60Count] = React.useState(0);
    const [projectProcessWaitRecord100Count, setProjectProcessWaitRecord100Count] = React.useState(0);
    const [projectProcessWaitRecordFinalCount, setProjectProcessWaitRecordFinalCount] = React.useState(0);
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
        fileList.map((file) => {
            if (file.id_project_status_title == 3) {
                setLableexam1((prevLableexam1) => prevLableexam1 + 1);
            }
            if (file.id_project_status_title == 8) {
                setLableexam2((prevLableexam2) => prevLableexam2 + 1);
            }
            if (file.id_project_status_title == 12) {
                setLableexam3((prevLableexam3) => prevLableexam3 + 1);
            }
        }
        )
        projectProcess?.map((file) => {
            setProjectProcessCount((prevProjectProcessCount) => prevProjectProcessCount + 1);
        }
        )
        projectProcessWaitSchdule?.map((file) => {
            setProjectProcessWaitSchduleCount((prevProjectProcessWaitSchduleCount) => prevProjectProcessWaitSchduleCount + 1);
        }
        )
        projectProcessWaitSchdule60?.map((file) => {
            setProjectProcessWaitSchdule60Count((prevProjectProcessWaitSchdule60Count) => prevProjectProcessWaitSchdule60Count + 1);
        }
        )
        projectProcessWaitSchdule100?.map((file) => {
            setProjectProcessWaitSchdule100Count((prevProjectProcessWaitSchdule100Count) => prevProjectProcessWaitSchdule100Count + 1);
        }
        )
        projectProcessWaitRecord?.map((file) => {
            setProjectProcessWaitRecordCount((prevProjectProcessWaitRecordCount) => prevProjectProcessWaitRecordCount + 1);
        })
        projectProcessWaitRecord60?.map((file) => {
            setProjectProcessWaitRecord60Count((prevProjectProcessWaitRecord60Count) => prevProjectProcessWaitRecord60Count + 1);
        })
        projectProcessWaitRecord100?.map((file) => {
            setProjectProcessWaitRecord100Count((prevProjectProcessWaitRecord100Count) => prevProjectProcessWaitRecord100Count + 1);
        })
        projectProcessWaitConfiremT01?.map((file) => {
            setprojectProcessWaitConfiremT01Count((prevprojectProcessWaitConfiremT01Count) => prevprojectProcessWaitConfiremT01Count + 1);
        })
        projectProcessWaitRecordFinal.map((file) => {
            console.log("hello")
            setProjectProcessWaitRecordFinalCount((prevProjectProcessWaitRecordFinalCount) => prevProjectProcessWaitRecordFinalCount + 1);
        })
    }


    const handleCloseDelStaff = () => {
        setDialogstaff(false);
    };

    const handleRemoveStaff = (id) => {
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

    const [fileList, setFileList] = React.useState([]);
    const [projectProcess, setProjectProcess] = React.useState([]);
    const [projectProcessWaitSchdule, setProjectProcessWaitSchdule] = React.useState([]);
    const [projectProcessWaitSchdule60, setProjectProcessWaitSchdule60] = React.useState([]);
    const [projectProcessWaitSchdule100, setProjectProcessWaitSchdule100] = React.useState([]);
    const [projectProcessWaitRecord, setProjetProcessWaitRecord] = React.useState([]);
    const [projectProcessWaitConfiremT01, setProjectProcessWaitConfiremT01] = React.useState([]);
    const [projectProcessWaitRecord60, setProjetProcessWaitRecord60] = React.useState([]);
    const [projectProcessWaitRecord100, setProjetProcessWaitRecord100] = React.useState([]);
    const [projectProcessWaitRecordFinal, setProjetProcessWaitRecordFinal] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);
    const [Canceldatafrom, setCanceldatafrom] = React.useState([]);
    const [Cancelcomment, setCancelcomment] = React.useState('');
    const [selectstatus_code, setSelectStatus_code] = React.useState(21);
    const [openAddJust, setOpenAddJust] = React.useState(false);
    const [projectcode, setProjectcode] = React.useState('');
    const [staff, setStaff] = React.useState([]);
    const [ajid, setAjid] = React.useState('');
    const [act, setAct] = React.useState(0);
    const [idprojectstatustitle, setIdprojectstatustitle] = React.useState('');
    const [modalRecord, setmodalRecord] = React.useState(false);
    const [modalRecord2, setmodalRecord2] = React.useState(false);
    const [examrecord, setExamrecord] = React.useState('');
    const [examrecordcomment, setExamrecordcomment] = React.useState('');
    const [a1, setA1] = React.useState('');
    const [a2, setA2] = React.useState('');
    const [a3, setA3] = React.useState('');
    const [a4, setA4] = React.useState('');

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

    const convertDate = (date) => {
        let d = new Date(date);
        return d.toLocaleString();
    }

    const [pdfUrl, setPdfUrl] = React.useState('');


    const handleFileDownload = (id_file) => {
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
                setPdfUrl(null)
                window.open(dataUrl);
            }
            else {
                setPdfUrl(dataUrl);
            }
        }).catch(err => {
            setPdfUrl(null)
            console.log(err);
        }
        );
    };

    const cfrecordexam = () => {
        var x = 0;
        if (idprojectstatustitle == 6) {
            x = 1;
        }
        if (examrecord == 'ผ่าน') {
            handlereportConfirmUNC(a1, a2, a3, a4)
        }

        else if (examrecord == 'ผ่านแบบมีเงื่อนไข') {
            handlereportConfirmUNC(a1, examrecord, a3, a4)
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
            setPdfUrl(null)
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
                const fileLastUpdatePromises = projectProcessData.map(item => {
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
                        const combinedData = projectProcessData.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
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
                const fileLastUpdatePromises = projectProcessWaitSchduleData.map(item => {
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
                        const combinedData = projectProcessWaitSchduleData.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
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
                const fileLastUpdatePromises = projectProcessWaitSchduleData60.map(item => {
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
                        const combinedData = projectProcessWaitSchduleData60.map((item, index) => ({
                            ...item,
                            fileLastUpdate: fileLastUpdates[index]
                        }));
                        return combinedData;
                    });
            })
            .then(combinedData => {
                setPdfUrl(null);
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
                const fileLastUpdatePromises = projectProcessWaitSchduleData100.map(item => {
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
                        const combinedData = projectProcessWaitSchduleData100.map((item, index) => ({
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
                const fileLastUpdatePromises = projectProcessWaitRecord.map(item => {
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
                        const combinedData = projectProcessWaitRecord.map((item, index) => ({
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
                const fileLastUpdatePromises = projectProcessWaitRecord60.map(item => {
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
                        const combinedData = projectProcessWaitRecord60.map((item, index) => ({
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
                const fileLastUpdatePromises = projectProcessWaitRecord100.map(item => {
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
                        const combinedData = projectProcessWaitRecord100.map((item, index) => ({
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
                const fileLastUpdatePromises = projectProcessWaitRecordFinal.map(item => {
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
                        const combinedData = projectProcessWaitRecordFinal.map((item, index) => ({
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
                const fileLastUpdatePromises = projectProcessWaitConfiremT01.map(item => {
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
                        const combinedData = projectProcessWaitConfiremT01.map((item, index) => ({
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

    const Viewpdf = (id) => {
        handleFileDownload(id);
    }


    const handleChange = (panel) => {
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

    const handlereportCancel = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
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
    const handlereportConfirm = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
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
    const handleCancelcommentUNC = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
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
    const handlereportConfirmUNC = (id_project_file_paths, comment, id_project_status_title, id_project_status) => {
        axios.post('resources/admin/reqreport/approve',
            {
                id_project_file_paths: id_project_file_paths,
                id_project_status: id_project_status,
                id_project_status_title: id_project_status_title,
                id_project: ajid
            }
        ).then((response) => {
            console.log(response);
            window.location.reload();
        });
    }

    const openDoc = (id, selectReport) => {
        window.open(`/testreport/${id}/${selectReport}`);
    }

    const openDocWidget = (id, selectReport) => {
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
                <AccordionSummary sx={{}} aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_title_reports'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นสอบหัวข้อ</Typography>
                    {
                        lableexam1 > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[800] }}>มี {lableexam1} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_title_candidate'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>แต่งตั้งกรรมการ</Typography>
                    {
                        projectProcessCount > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessCount} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_title_room'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>จัดตารางสอบหัวข้อ</Typography>
                    {
                        projectProcessWaitSchduleCount > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitSchduleCount} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_title_record'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบหัวข้อ</Typography>
                    {
                        projectProcessWaitRecordCount > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecordCount} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/doc_approve'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นยันการแก้ไข ทก.01</Typography>
                    {
                        projectProcessWaitConfiremT01Count > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitConfiremT01Count} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_six_reports",'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นสอบหกสิบ</Typography>
                    {
                        lableexam2 > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {lableexam2} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_six_room'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>จัดตารางสอบหกสิบ</Typography>
                    {
                        projectProcessWaitSchdule60Count > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitSchdule60Count} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_six_record'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบหกสิบ</Typography>
                    {
                        projectProcessWaitRecord60Count > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecord60Count} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_hundred_reports'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ยื่นสอบร้อย</Typography>
                    {
                        lableexam3 > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {lableexam3} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_hundred_room'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ตารางสอบร้อย</Typography>
                    {
                        projectProcessWaitSchdule100Count > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitSchdule100Count} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/test_hundred_record'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>บันทึกผลการสอบร้อย</Typography>
                    {
                        projectProcessWaitRecord100Count > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecord100Count} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
                <AccordionSummary aria-controls="panel1a-content" id="panel1a-header" onClick={() => navigate({to: '/dissertation_complete'})}>
                    <Typography sx={{ pt: 0.3, width: '40%', flexShrink: 0 }}>ส่งปริญญานิพนธ์ฉบับสมบูรณ์ และ CD</Typography>
                    {
                        projectProcessWaitRecordFinalCount > 0 ?
                            <Typography sx={{ pt: 0.3, color: green[600] }}>มี {projectProcessWaitRecordFinalCount} โครงงานรอทำรายการ</Typography>
                            :
                            <Typography sx={{ pt: 0.3 }}>ไม่มีรายการ</Typography>
                    }
                </AccordionSummary>
            </ThemeProvider >
        </>
    )
}