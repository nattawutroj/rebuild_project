import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./table";
import { Card } from "./card";
import { format } from 'date-fns';


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

export const FileListDetail = (file: any) => {
    return (
        <Card>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium w-20">{file.file.id_roll == 79 ? <p> </p> : <p>สถานะ</p>}</TableCell>
                        <TableCell>{file.file.id_roll == 79 ? <p className="w-36"> </p> : <p className="w-36">{mapping.map((item) => item.id == file.file.id_roll ? item.now : ' ')}</p>}</TableCell>
                        <TableCell>{file.file.id_roll == 79 ? <p className="text-red-600 w-36">{file.file.status}</p> : <p className="text-green-500 w-36">{file.file.status}</p>}</TableCell>
                        <TableCell className="text-right">บันทึกเมื่อ</TableCell>
                        <TableCell><p className="">{format(file.file.time, 'dd/MM/yyyy HH:mm')}</p></TableCell>
                    </TableRow>
                </TableBody>
            </Table>{
                file.file.id_roll == 79 && file.file.more !== " " ?
                    <Table>
                        <TableBody>

                            <TableRow>
                                <TableCell className="">{file.file.id_roll !== 79 ? <p className="w-20"> </p> : <p className=" flex">ความเห็นเพิ่มเติม&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <p className="text-red-600"> {"  " + file.file.more}</p></p>}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> : null
            }
        </Card>
    )
};