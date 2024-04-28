
import { Route } from "@/routes/_app/testreport.$id.$selectReport";
import React from 'react';
import { Page, Text, View, Document, StyleSheet,PDFViewer, } from '@react-pdf/renderer';


// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
});

// Create Document Component
const MyDocument = () => (
    <PDFViewer style={styles.viewer}>
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
                <Text>Section #2</Text>
            </View>
        </Page>
    </Document>
    </PDFViewer>
);

export default MyDocument;