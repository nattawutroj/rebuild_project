import * as React from "react";
import NavBarItem from "./NavBarItem";

import { Menubar } from "@/components/ui/menubar";

const navigationItems = [
  {
    name: "หน้าแรก",
    path: "/dashboard",
  },
  {
    name: "จัดการสอบ",
    subItems: [
      {
        label: "สอบหัวข้อ",
        subItems: [
          {
            label: "รับเรื่องยื่นสอบ",
            to: "/test_title_reports",
          },
          {
            label: "แต่งตั้งกรรมการ",
            to: "/test_title_candidate",
          },
          {
            label: "จัดตารางสอบ",
            to: "/test_title_room",
          },
          {
            label: "บันทึกผลการสอบ",
            to: "/test_title_record",
          },
        ],
      }, {
        label: "แก้ไข ทก.01",
        to: "/doc_approve",
      },
      {
        label: "สอบหกสิบ",
        subItems: [
          {
            label: "รับเรื่องยื่นสอบ",
            to: "/test_six_reports",
          },
          {
            label: "จัดตารางสอบ",
            to: "/test_six_room",
          },
          {
            label: "บันทึกผลการสอบ",
            to: "/test_six_record",
          },
        ],
      },
      {
        label: "สอบร้อย",
        subItems: [
          {
            label: "รับเรื่องยื่นสอบ",
            to: "/test_hundred_reports",
          },
          {
            label: "จัดตารางสอบ",
            to: "/test_hundred_room",
          },
          {
            label: "บันทึกผลการสอบ",
            to: "/test_hundred_record",
          },
        ],
      },
      {
        label: "ปริญญานิพนธ์ฉบับสมบูรณ์ และ CD",
        to: "/dissertation_complete",
      },
      {
        label: "โครงงานทั้งหมด",
        to: "/all",
      },
    ],
  },
  {
    name: "จัดการผู้ใช้",
    subItems: [
      {
        label: "เจ้าหน้าที่/อาจารย์",
        subItems: [
          {
            label: "เพิ่มรายบุคคล",
            to: "/teacher",
          }
        ],
      },
      {
        label: "นักศึกษา",
        subItems: [
          {
            label: "เพิ่มรายบุคคล",
            to: "/student",
          },
          {
            label: "เพิ่มกลุ่มนักศึกษา",
            to: "/student_grops",
          },
        ],
      },
    ],
  },
  {
    name: "ออกรายงาน",
  },
  {
    name: "ตั้งค่าระบบ",
    subItems: [
      {
        label: "หลักสูตร",
        to: "/courses",
      },
      {
        label: "วิชา",
        to: "/subjects",
      },
      {
        label: "คำนำหน้า",
        to: "/name_title",
      },
      {
        label: "ข่าวสาร",
        to: "/news",
      },
      {
        label: "เปลี่ยนหัวหน้าภาควิชา",
        to: "/captains",
      },
      {
        label: "เปลี่ยนภาคการศึกษา",
        to: "/semester",
      },
      {
        label: "ห้องสอบ",
        to: "/room",
      },
    ],
  },
];

const NavBar: React.FC = () => {
  return (
    <Menubar className="border-none">
      {navigationItems.map((item:any) => (
        <NavBarItem key={item.name} {...item} />
      ))}
    </Menubar>
  );
};

export default NavBar;
