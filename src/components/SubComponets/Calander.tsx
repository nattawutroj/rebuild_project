import React from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, CardContent, Stack, Typography } from '@mui/material';
import axios from "@/api/axios";
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled('div')(({ theme, isSelected, isHovered }: any) => ({
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: isSelected
        ? theme.palette.primary.main
        : isHovered
            ? theme.palette.primary[theme.palette.mode]
            : 'transparent',
    color: isSelected ? theme.palette.primary.contrastText : 'inherit',
    cursor: 'pointer',
}));

const CustomSlot = styled('div')(({ theme, isSelected, isHovered }: any) => ({
    border: '1px solid #ccc',
    padding: '8px',
    borderRadius: '4px',
    backgroundColor: isSelected
        ? theme.palette.primary.main
        : isHovered
            ? theme.palette.primary[theme.palette.mode]
            : 'transparent',
    color: isSelected ? theme.palette.primary.contrastText : 'inherit',
    cursor: 'pointer',
}));

const isInSameWeek = (dayA: any, dayB: any) => {
    if (dayB == null) {
        return false;
    }
    return dayA.isSame(dayB, 'week');
};

const generateSlots = () => {
    const slots = [];
    let currentTime = dayjs().set('hour', 9).set('minute', 0);

    for (let i = 0; i < 10; i++) {
        const slot = {
            start: currentTime.format('HH:mm'),
            end: currentTime.add(60, 'minute').format('HH:mm'),
        };
        slots.push(slot);
        currentTime = currentTime.add(60, 'minute');
    }

    return slots;
};


export default function WeekPicker({ ajid, idprojectstatustitle, setOpenCalander }: any) {
    const [value, setValue] = React.useState<any>(dayjs());
    const [idroom, setIdroom] = React.useState<any>(-1);
    const [room, setRoom] = React.useState<any>([]);
    const [slotall, setSlotAll] = React.useState<any>(null);
    const [isLoaded, setIsLoaded] = React.useState<any>(false);
    const [reseveroom, setReseveroom] = React.useState<any>(null);


    const fetchRoom = () => {
        axios.get('/resources/admin/room')
            .then(res => {
                console.log("1")
                setRoom(res.data.result)
            })
            .catch(err => {

                console.log("2")
                console.log(err);
            });
    }

    // const startOfWeek = value.startOf('week');
    // const endOfWeek = value.endOf('week');
    const startOfWeek = value;
    const endOfWeek = value;

    const handleDayClick = (day: any) => {
        console.log(`Clicked on ${day.format('DD/MM/YYYY')}`);
        // Add your logic for handling day clicks here
    };

    const SChecker = () => {
        console.log(ajid)
        console.log(idprojectstatustitle)
        axios.get('/resources/admin/room/schedule', {
            params: {
                id_project: ajid,
                id_project_status_title: idprojectstatustitle
            }
        })
            .then(res => {
                console.log(res);
                setReseveroom(res.data.result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    React.useEffect(() => {
        fetchRoom();
        SChecker();
    }, []);


    return (
        <>
            <h1>จองห้องสอบ</h1>
            {
                reseveroom && reseveroom.length > 0 ?
                    <>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                โครงงานนี้จองห้องสอบเรียบร้อยแล้ว
                            </Typography>
                            <Typography sx={{ mt: 1 }} variant="body1" component="div">
                                เวลาที่จอง: {dayjs(reseveroom[0].date).format('DD/MM/YYYY')} {reseveroom[0].slot == 0 ? "09:00 - 10:00" : reseveroom[0].slot == 1 ? "10:00 - 11:00" : reseveroom[0].slot == 2 ? "11:00 - 12:00" : reseveroom[0].slot == 3 ? "12:00 - 13:00" : reseveroom[0].slot == 4 ? "13:00 - 14:00" : reseveroom[0].slot == 5 ? "14:00 - 15:00" : reseveroom[0].slot == 6 ? "15:00 - 16:00" : reseveroom[0].slot == 7 ? "16:00 - 17:00" : reseveroom[0].slot == 8 ? "17:00 - 18:00" : reseveroom[0].slot == 9 ? "18:00 - 19:00" : ''}
                            </Typography>
                            <Typography sx={{ mt: 1 }} variant="body1" component="div">
                                {console.log(reseveroom[0])}
                                {console.log(room)}
                                ห้องที่จอง: {reseveroom[0].room_title}
                            </Typography>
                            <Stack spacing={2} direction="row" sx={{ mt: 5 }}>
                                <Button
                                    sx={{ mt: 3, mb: 1 }}
                                    fullWidth
                                    onClick={() => {
                                        setOpenCalander(false)
                                    }}
                                    variant="contained"
                                    color="primary"
                                >
                                    ยืนยัน
                                </Button>
                                <Button
                                    sx={{ mt: 3, mb: 1 }}
                                    fullWidth
                                    onClick={() => {
                                        console.log(reseveroom[0].id_schedule);
                                        confirm('คุณต้องการยกเลิกการจองหรือไม่') == true ?
                                            axios.delete('/resources/admin/room/schedule', {
                                                params: {
                                                    id_schedule: reseveroom[0].id_schedule
                                                }
                                            })
                                                .then(res => {
                                                    console.log(res);
                                                    SChecker();
                                                })
                                                .catch(err => {
                                                    console.log(err);
                                                })
                                            : null;
                                    }}
                                    variant="contained"
                                    color="error"
                                >
                                    ยกเลิกการจอง
                                </Button>
                            </Stack>
                        </CardContent>
                    </>
                    : <>
                        <Stack spacing={2} direction="row">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    showDaysOutsideCurrentMonth
                                    displayWeekNumber
                                // Remove the onDayClick prop
                                // renderDay={(day, _, dayState) => (
                                //     <CustomPickersDay
                                //         isSelected={dayState.isSelected}
                                //         isHovered={dayState.isHovered}
                                //         onClick={() => handleDayClick(day)}
                                //     >
                                //         {day.format('DD/MM')}
                                // </CustomPickersDay>
                                // )}
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">เลือกห้องสอบ</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={idroom}
                                        label="Age"
                                        onChange={(e) => setIdroom(e.target.value)}
                                    >
                                        <MenuItem value={-1}>เลือก</MenuItem>
                                        {
                                            room?.map((item: any, index: any) => {
                                                return <MenuItem key={index} value={item.id_room}>{item.room_title}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </LocalizationProvider>

                            {/* ปุ้้มดึงข้อมูล */}
                            <Button
                                sx={{ mr: 1, ml: 1, width: '30%' }}
                                onClick={() => {
                                    setSlotAll(null);
                                    setIsLoaded(true);
                                    axios.get('/resources/admin/room/handle', {
                                        params: {
                                            id_project: ajid,
                                            id_room: idroom,
                                            start: startOfWeek.format('YYYY-MM-DD'),
                                            end: endOfWeek.format('YYYY-MM-DD'),
                                        }
                                    })
                                        .then(res => {
                                            const slotsByDate = res.data.data.reduce((accumulator: any, item: any) => {
                                                const { date, slot, id_room, condition, day } = item;

                                                if (accumulator[date]) {
                                                    accumulator[date].push({ slot, id_room, condition, day });
                                                } else {
                                                    accumulator[date] = [{ slot, id_room, condition, day }];
                                                }

                                                return accumulator;
                                            }, {});

                                            const slotsArray = Object.entries(slotsByDate).map(([date, slots]) => ({ date, slots }));

                                            setSlotAll(slotsArray);
                                            console.log(slotsArray);

                                        })
                                        .catch(err => {
                                            console.log(err);
                                        });
                                }}
                                variant="contained"
                                color="primary"
                                disabled={idroom === -1}
                            >
                                ดึงข้อมูล
                            </Button>
                        </Stack>
                        <div>
                            <p className='font-kanit text-base'>เริ่ม: {startOfWeek.format('DD/MM/YYYY')} - สิ้นสุด: {endOfWeek.format('DD/MM/YYYY')}</p>
                        </div>
                        {slotall ?
                            <div>
                                <table border={0}>
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            {generateSlots().map((slot, index) => (
                                                <th key={index}>{`${slot.start} - ${slot.end}`}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            slotall?.map((item: any, index: any) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{dayjs(item.date).format('DD/MM')}</td>
                                                        {
                                                            item.slots.map((slot: any, index: any) => {
                                                                return (
                                                                    <td key={index}>
                                                                        <TooltipProvider>
                                                                            <Tooltip>
                                                                                <TooltipTrigger asChild>
                                                                                    <Button sx={((slot.condition.roomslot == 0 && slot.condition.teacherslot == 0)) ? { m: 0.5, p: 3 } : { m: 0.5, p: 3, bgcolor: 'text.secondary' }} variant="contained" color="primary" size="small" onClick={() => {
                                                                                        (!(slot.condition.roomslot == 0 && slot.condition.teacherslot == 0)) ? (alert('ไม่สามารถจองได้'))
                                                                                            :
                                                                                            confirm('คุณต้องการจองหรือไม่') == true ?
                                                                                                axios.post('/resources/admin/room/schedule', {
                                                                                                    id_room: idroom,
                                                                                                    date: item.date,
                                                                                                    slot: slot.slot,
                                                                                                    id_project: ajid,
                                                                                                    id_test_catagory: idprojectstatustitle
                                                                                                })
                                                                                                    .then(() => {
                                                                                                        SChecker();
                                                                                                    })
                                                                                                    .catch(err => {
                                                                                                        console.log(err);
                                                                                                    })
                                                                                                : null;
                                                                                    }
                                                                                    }
                                                                                    >
                                                                                        จอง
                                                                                    </Button>
                                                                                </TooltipTrigger>
                                                                                <TooltipContent>
                                                                                    {
                                                                                        slot.condition.roomslot !== 0 ?
                                                                                            slot.condition.roomslot[0].id_test_category == 1 ? <p className='font-kanit text-base'>สอบหัวข้อ</p> :
                                                                                                slot.condition.roomslot[0].id_test_category == 2 ? <p className='font-kanit text-base'>สอบหกสิบ</p> :
                                                                                                    slot.condition.roomslot[0].id_test_category == 3 ? <p className='font-kanit text-base'>สอบร้อย</p> :
                                                                                                        null : null
                                                                                    }
                                                                                    {/* <p className='flex font-kanit text-base'>สถานะห้อง: {slot.condition.roomslot == 0 ? <p className=' text-green-500'>&nbsp;ว่าง</p> : <p className=' text-red-500'>&nbsp;ไม่ว่าง</p>}</p> */}
                                                                                    {/* <p className='flex font-kanit text-base'>สถานะอาจารย์: {slot.condition.teacherslot == 0 ? slot.condition.roomslot == 0 ? <p className=' text-green-500'>&nbsp;อาจารย์ทุกท่านว่างในช่วงเวลานี้</p> : <p className=' text-orange-400'>&nbsp;ตรวจสอบเพิ่มเติม</p> : <p className=' text-red-500'>&nbsp;มีอาจารย์บางท่านติดสอบในช่วงเวลานี้</p>}</p> */}
                                                                                    {
                                                                                        slot.condition.roomslot == 0 && slot.condition.teacherslot == 0 ?
                                                                                            <p className='font-kanit text-base text-green-500'>สามารถจองได้</p>
                                                                                            :
                                                                                            <p className='font-kanit text-base text-red-500'>ไม่สามารถจองได้</p>

                                                                                    }
                                                                                </TooltipContent>
                                                                            </Tooltip>
                                                                        </TooltipProvider>
                                                                    </td>
                                                                );
                                                            })
                                                        }
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>


                                </table>
                            </div >
                            :
                            <div>
                                {isLoaded ? <LinearProgress /> : null}
                            </div>
                        }
                    </>
            }
        </>
    );
}
