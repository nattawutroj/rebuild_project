import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Font,
    Image,
} from "@react-pdf/renderer";

import THSN from '@/assets/Sarabun/Sarabun-Regular.ttf';
import THSN_B from '@/assets/Sarabun/Sarabun-Bold.ttf';
import logoKMUTNB from '../../assets/logoKMUTNB.png';
import axios from '@/api/axios';
import Checkbox from '../../assets/checkbox.jpg';

function dateThai(date: any) {
    const d = new Date(date);
    const months = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear() + 543}`;
}

Font.register({ family: 'Sarabun', fonts: [{ src: THSN }, { src: THSN_B, fontWeight: 'bold' }] });
var nullline = 0;
// Create styles
const styles = StyleSheet.create({
    title: {
        fontFamily: 'Sarabun'
    },
    page: {
        backgroundColor: "white",
        color: "black",
        fontFamily: 'Sarabun',
        fontSize: 11,
    },
    header: {
        paddingTop: 5,
        paddingBottom: 5,
        border: "1px solid #000000",
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    section: {
        paddingLeft: 9,
        paddingRight: 9,
    },
    border: {
        margin: 10,
        padding: 1,
        height: '98%',
        border: "1px solid #000000",
    },
    borderIN: {
        padding: 1,
        marginTop: 1,
        height: '98%',
        border: "1px solid #000000",
    },

    borderTable: {
        border: "1px solid #000000",
    },
    bb: {
        borderBottom: "1px solid #000000",
    },
    bt: {
        borderTop: "1px solid #000000",
    },
    bl: {
        height: '100%',
        borderLeft: "1px solid #000000",
    },
    br: {

        height: '100%',
        borderRight: "1px solid #000000",
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    forntSmall: {
        fontSize: 7,
    },
    breakable: { width: '100%', height: 400, backgroundColor: 'tomato' },
});

// Create Document Component
// function BasicDocument({ projectinfo, member, staff, boss, selectReport }) {

function BasicDocument() {
    const [docgenlist, setDocgenlist] = React.useState<any>([]);

    async function schedule() {
        const response = await axios.get('/resources/public/schedule', {});
        return response.data.data;
    }

    async function docprojectinfomation(id: any) {
        const response = await axios.get('/resources/public/projectinfomation', {
            params: {
                id_project: id
            }
        });
        return response.data.result;
    }


    async function docmember(id: any) {
        const response = await axios.get('/resources/public/projectinfomation/student', {
            params: {
                id_project: id
            }
        });
        return response.data.result.rows;
    }

    async function docstaff(id: any) {
        const response = await axios.get('/resources/public/projectinfomation/staff', {
            params: {
                id_project: id
            }
        });
        return response.data.result[0];
    }

    const [isLoading, setIsLoading] = React.useState<any>(true);

    const datacleandatetoday = (data: any) => {
        var currentdate = new Date();
        var cleandate: any = [];
        data.forEach((element: any) => {
            var date = new Date(element.date);
            date.setDate(date.getDate() + 1);

            if (date >= currentdate) {
                cleandate.push(element);
            }
        });
        return cleandate;
    }

    const feedid_project = async () => {
        try {
            const datatem = await schedule();
            console.log(datatem);
            var data = datacleandatetoday(datatem);
            console.log(data);


            await Promise.all(
                data.map(async (item: any) => {
                    console.log('Fetching data for project:', item.id_project);
                    const [projectinfo, member, staff] = await Promise.all([
                        docprojectinfomation(item.id_project),
                        docmember(item.id_project),
                        docstaff(item.id_project),
                    ]);

                    item.projectinfo = projectinfo[0];
                    item.member = member;
                    item.staff = staff;
                    console.log('Data fetched for project:', item.id_project);
                })
            );

            console.log('Data fetching completed');
            setDocgenlist((prevDocgenlist: any) => {
                // Using the state updater function to get the latest state value
                const updatedDocgenlist = [...prevDocgenlist, ...data];
                if (updatedDocgenlist.length > 0) {
                    setIsLoading(false);
                }
                return updatedDocgenlist;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            console.log('Finally');
            console.log(docgenlist); // Log the latest state value
        }
    };

    React.useEffect(() => {
        feedid_project();
    }, []);



    if (isLoading) {
        return (
            <div>
                <h1>Loading</h1>
            </div>
        );
    }

    return (

        <PDFViewer style={styles.viewer}>
            <Document>
                {/*render a single page*/}
                <Page orientation="landscape" size="A4" style={styles.page}>

                    <View style={styles.section} fixed>
                        <Header />
                    </View>
                    <View style={styles.section}>
                        <Information docgenlist={docgenlist} />
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "flex-start",
                        paddingBottom: 10,
                        paddingLeft: 10,
                    }} fixed>
                        <Text render={({ pageNumber, totalPages }) => (
                            `หน้า ${pageNumber} จาก ${totalPages}`
                        )} fixed />
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
export default BasicDocument;

function Header() {
    return (
        <>
            <View style={[styles.row, { marginTop: 10 }]}>
                <View style={{ width: '5%' }}>
                </View>
                <View style={{ width: '10%' }}>
                    <Image src={logoKMUTNB} />
                </View>

                <View style={{ width: '5%' }}>
                </View>
                <View style={{ width: '70%', marginTop: 15 }}>
                    <Text style={styles.title}>รายงานสถานะโครงงานพิเศษ (ปริญญานิพนธ์)</Text>
                    <Text>ภาควิชาเทคโนโลยีสารสนเทศ คณะเทคโนโลยีและการจัดการอุตสาหกรรม</Text>
                    <Text>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ วิทยาเขตปราจีนบุรี</Text>
                </View>
                <View style={{ width: '10%' }}>
                </View>
            </View>
        </>
    )
}

function Information({ docgenlist }: any) {
    var count = 0;
    return (
        <>
            {
                console.log(docgenlist)
            }
            <View style={[styles.row, { marginTop: 10 }, styles.bb, styles.bt]} fixed>
                <Text style={[styles.bl, { width: '10%', textAlign: 'center', fontWeight: 'bold', }]}>รหัสโครงงาน</Text>
                <Text style={[styles.bl, { width: '20%', textAlign: 'center', fontWeight: 'bold', }]}>ชื่อโครงงาน/กรณีศึกษา</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ผู้จัดทำโครงงาน</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ที่ปรึกษา/ที่ปรึกษาร่วม</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ประธาน/กรรมการ</Text>
                <Text style={[styles.bl, { width: '15%', textAlign: 'center', fontWeight: 'bold', }]}>ห้องสอบ/ประเภทการสอบ</Text>
                <Text style={[styles.bl, styles.br, { width: '10%', textAlign: 'center', fontWeight: 'bold', }]}>หมายเหตุ</Text>
            </View>
            {
                console.log(docgenlist)
            }
            {
                docgenlist?.map((item: any, index: any) => {
                    return (
                        <>
                            {
                                console.log(count)
                            }{
                                count >= 25 ? <View break>{count = 0}</View> : null
                            }
                            <View style={[styles.row, styles.bb]} key={index}>
                                <View style={[styles.column, styles.bl, { width: '10%', textAlign: 'left', fontWeight: 'light', }]}>
                                    <Text style={[{ textAlign: 'center', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{item.id_project}</Text>
                                </View>
                                <View style={[styles.column, styles.bl, { width: '20%', textAlign: 'left', fontWeight: 'light', }]}>
                                    <Text style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{item.projectinfo.project_title_th}</Text>
                                    <Text style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{item.projectinfo.case_study_title_th}</Text>
                                </View>
                                <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                    {
                                        item.member.map((member: any, index: any) => {
                                            return (
                                                <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{member.name_title_th}{member.first_name_th} {member.last_name_th}</Text>
                                            )
                                        }
                                        )
                                    }
                                </View>
                                <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                    {
                                        item.staff.staff.map((staff: any, index: any) => {
                                            return (
                                                <>
                                                    {
                                                        count++
                                                    }
                                                    {
                                                        staff.project_staff_position_title === "ปรึกษา" ?
                                                            <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                            : null
                                                    }
                                                </>
                                            )
                                        }
                                        )
                                    }
                                    {
                                        item.staff.staff.map((staff: any, index: any) => {
                                            return (
                                                <>
                                                    {
                                                        count++
                                                    }
                                                    {
                                                        staff.project_staff_position_title === "ปรึกษาร่วม" ?
                                                            <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                            : null
                                                    }
                                                </>
                                            )
                                        }
                                        )
                                    }
                                    {
                                        item.staff.os_staff.map((staff: any, index: any) => {
                                            return (
                                                <>
                                                    {
                                                        count++
                                                    }
                                                    {
                                                        staff.project_staff_position_title === "ปรึกษาร่วม" ?
                                                            <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                            : null
                                                    }
                                                </>
                                            )
                                        }
                                        )
                                    }
                                </View>
                                <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                    {
                                        item.staff.staff.map((staff: any, index: any) => {
                                            return (
                                                <>
                                                    {
                                                        staff.project_staff_position_title === "ประธาน" ?
                                                            <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                            : null
                                                    }
                                                </>
                                            )
                                        }
                                        )
                                    }
                                    {
                                        item.staff.staff.map((staff: any, index: any) => {
                                            return (
                                                <>
                                                    {
                                                        staff.project_staff_position_title === "กรรมการ" ?
                                                            <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{staff.name_title_th}{staff.first_name_th} {staff.last_name_th}</Text>
                                                            : null
                                                    }
                                                </>
                                            )
                                        }
                                        )
                                    }
                                </View>
                                <View style={[styles.column, styles.bl, { width: '15%', textAlign: 'left', fontWeight: 'light', }]}>
                                    <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>
                                        {
                                            item.slot === 0 ? '09.00-10.00' :
                                                item.slot === 1 ? '10.00-11.00' :
                                                    item.slot === 2 ? '11.00-12.00' :
                                                        item.slot === 3 ? '12.00-13.00' :
                                                            item.slot === 4 ? '13.00-14.00' :
                                                                item.slot === 5 ? '14.00-15.00' :
                                                                    item.slot === 6 ? '15.00-16.00' :
                                                                        item.slot === 7 ? '16.00-17.00' :
                                                                            item.slot === 8 ? '17.00-18.00' :
                                                                                item.slot === 9 ? '18.00-19.00' :
                                                                                    ''
                                        }
                                        &nbsp;&nbsp;ห้อง&nbsp;{item.room_title}
                                    </Text>
                                    <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{dateThai(item.date)}</Text>
                                    <Text key={index} style={[{ textAlign: 'left', fontWeight: 'light', padding: '2', fontSize: '9' }]}>{item.test_category_title}</Text>
                                </View>
                                <Text style={[styles.bl, styles.br, { width: '10%', textAlign: 'center', fontWeight: 'light', }]}></Text>
                            </View >
                        </>
                    )
                }
                )
            }
        </>
    )
}
