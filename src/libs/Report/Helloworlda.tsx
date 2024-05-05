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

import THSN from '@/assets/Kanit/Kanit-ExtraLight.ttf';
import THSN_B from '@/assets/Kanit/Kanit-Thin.ttf';
import logoKMUTNB from '../../assets/logoKMUTNB.png';
import Checkbox from '../../assets/checkbox.jpg';

Font.register({ family: 'Roboto', fonts: [{ src: THSN }, { src: THSN_B, fontWeight: 'bold' }] });
var nullline = 0;
// Create styles
const styles = StyleSheet.create({
    title: {
        fontFamily: 'Roboto'
    },
    page: {
        backgroundColor: "white",
        color: "black",
        fontFamily: 'Roboto',
        fontSize: 16,
    },
    header: {
        margin: 10,
        padding: 10,
        fontWeight: "bold",
        borderBottom: "1px solid #d3d3d3",
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
        alignItems: "center",
        justifyContent: "center",
    },
    section: {
        marginLeft: 15,
        marginRight: 15,
        paddingLeft: 20,
        paddingRight: 10,
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    breakable: { width: '100%', height: 400, backgroundColor: 'tomato' },
});

// Create Document Component
const MyDocument = () => (
    <PDFViewer style={styles.viewer}>
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Sectiasฟหกon #1 aaa ฟฟฟ</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
    </PDFViewer>
);

export default MyDocument;