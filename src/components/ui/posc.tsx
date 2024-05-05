import React from 'react';
import dayjs from 'dayjs';
import { ProfileContext } from "@/StudentDash";
import { Dot, Bus, Home, School } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from '@/api/axios';
interface Props {
    projectinfo: any;
}

interface SubProps {
    className?: string | null;
    text?: string;
}

interface Mapping {
    id: number;
    past: string;
    now: string;
    how: string;
    next: string;
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

export const Posc: React.FC<Props> = ({
    projectinfo
}) => {
    console.log(projectinfo);
    const [step, setStep] = React.useState<Mapping>({ id: 0, past: "", now: "", how: "", next: "" });
    const [reseveroom, setReseveroom] = React.useState<any>([]);

    const SChecker = () => {
        axios.get('/resources/public/room/schedule', {
            params: {
                id_project: projectinfo[0].id_project,
                id_project_status_title: projectinfo[0].id_project_status_title > 5 && projectinfo[0].id_project_status_title < 7 ? 5 : projectinfo[0].id_project_status_title > 9 && projectinfo[0].id_project_status_title < 11 ? 9 : projectinfo[0].id_project_status_title > 13 && projectinfo[0].id_project_status_title < 15 ? 13 : 0
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
    const [hiddentext, setHiddentext] = React.useState<any>(false);
    React.useEffect(() => {
        mapping.map((item) => {
            projectinfo[0].id_project_status_title === item.id && setStep(item);
        })
        if (projectinfo[0].id_project_status_title > 5 && projectinfo[0].id_project_status_title < 7 || projectinfo[0].id_project_status_title > 9 && projectinfo[0].id_project_status_title < 11 || projectinfo[0].id_project_status_title > 13 && projectinfo[0].id_project_status_title < 15) {
            SChecker();
            setHiddentext(true);
        }
    }, [projectinfo])

    React.useEffect(() => {
        if(reseveroom.length === 0) return;
        setx(reseveroom[0].slot == 0 ? "09:00 - 10:00" : reseveroom[0].slot == 1 ? "10:00 - 11:00" : reseveroom[0].slot == 2 ? "11:00 - 12:00" : reseveroom[0].slot == 3 ? "12:00 - 13:00" : reseveroom[0].slot == 4 ? "13:00 - 14:00" : reseveroom[0].slot == 5 ? "14:00 - 15:00" : reseveroom[0].slot == 6 ? "15:00 - 16:00" : reseveroom[0].slot == 7 ? "16:00 - 17:00" : reseveroom[0].slot == 8 ? "17:00 - 18:00" : reseveroom[0].slot == 9 ? "18:00 - 19:00" : '');
        sety(dayjs(reseveroom[0].date).locale('th').add(543, 'year').format('DD MMMM YYYY'));
        setz(reseveroom[0].room_title);
    }, [reseveroom])
    const Container = cn('grid grid-cols-5 gap-2 justify-between justify-items-center mb-10');
    const Container17 = cn('grid grid-cols-3 gap-2 justify-between justify-items-center mb-10');
    const Animation1 = cn('animate-bounce animate-infinite animate-duration-1000 animate-delay-1000 animate-ease-linear animate-normal animate-fill-both');
    const [x, setx] = React.useState<any>([]);
    const [y, sety] = React.useState<any>([]);
    const [z, setz] = React.useState<any>([]);
    return (
        <>
            <div className={projectinfo[0].id_project_status_title !== 17 ? Container : Container17}>
                {projectinfo[0].id_project_status_title !== 17 ? <Past text={step.past} /> : null}
                {projectinfo[0].id_project_status_title !== 17 ? <DotCol2 className='text-green-600 animate-pulse animate-infinite animate-duration-[800ms] animate-delay-200 animate-ease-linear animate-normal animate-fill-both' /> : null}
                <Now text={step.now} className={projectinfo[0].id_project_status_title === 17 ? null : Animation1} />
                <DotCol2 text={step.how} className="text-slate-400 animate-pulse animate-infinite animate-duration-[800ms] animate-delay-200 animate-ease-linear animate-normal animate-fill-both" />
                <Future className={projectinfo[0].id_project_status_title !== 17 ? null : Animation1} text={step.next} />
            </div>
            
            {hiddentext && <ConsultantsDetailLastCall text={y + " เวลา " + x + " ห้อง " + z} /> }
        </>
    )
}

const DotCol2: React.FC<SubProps> = ({ className, text }) => {
    const dotStyle = cn('flex flex-col justify-center items-center', className);
    return (
        <div className={dotStyle}>
            <div className='flex flex-row justify-center'>
                <Dot size={50} /><Dot size={50} /><Dot size={50} /><Dot size={50} /></div>
            <div className='flex flex-row justify-center'>{text}</div>
        </div>
    )
}

const Past: React.FC<SubProps> = ({ text }) => {
    return (
        <>
            <div className='flex flex-col items-center'>
                <Home size={50} />
                <div className='flex flex-row justify-center'>{text}</div>
            </div>
        </>
    )

}

const Now: React.FC<SubProps> = ({ className, text }) => {
    const Container = cn('flex flex-col items-center');
    const Icon = cn('flex flex-col', className);
    const Text = cn('flex flex-row justify-center');
    return (
        <>
            <div className={Container}>
                <Bus className={Icon} size={50} />
                <div className={Text}>{text}</div>
            </div>
        </>
    )
}

const Future: React.FC<SubProps> = ({ text, className }) => {
    return (
        <>
            <div className='flex flex-col items-center'>
                <School className={cn(className)} size={50} />
                <div className='flex flex-row justify-center'>{text}</div>
            </div>
        </>
    )
}


import { Badge } from "@/components/ui/badge";
import { set } from 'lodash';

interface ConsultantsDetailLastCallProps {
    text?: string;
    className?: string;
}

const ConsultantsDetailLastCall: React.FC<ConsultantsDetailLastCallProps> = ({
    text,
    className,
}) => {
    const containerClass = cn(
        "self-stretch px-2.5 mb-4 py-0.5 bg-sky-50 rounded-md justify-start items-start gap-2.5 inline-flex",
        className,
    );
    const badgeClass = cn(
        "text-slate-900 text-xs font-normal tracking-tight",
        className,
    );
    return (
        <div className={containerClass}>
            <Badge className={badgeClass} variant="secondary">
                <p className='font-kanit text-xl'> วันที่เวลา / ห้องสอบ : {text} </p>
            </Badge>
        </div>
    );
};
export default ConsultantsDetailLastCall;
