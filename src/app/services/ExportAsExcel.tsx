import React from 'react';
import moment from "moment";

const ExcelJS = require('exceljs');

const ExportAsExcel = () => {

    const data = [
        {
            id: 1,
            firstname: "Ahmed",
            lastname: "Tomi",
            email: "ah@smthing.co.com"
        },
        {
            id: 2,
            firstname: "Raed",
            lastname: "Labes",
            email: "rl@smthing.co.com"
        },
        {
            id: 3,
            firstname: "Yezzi",
            lastname: "Min l3b",
            email: "ymin@cocococo.com"
        },
        {
            id: 4,
            firstname: "fbdsb",
            lastname: "Min wgwl3b",
            email: "ywgwrmin@cogwro.com"
        },
        {
            id: 5,
            firstname: "fbwfw",
            lastname: "Min gwgwgl3b",
            email: "ywgwrmin@cocococo.com"
        },
    ];
    const ExportExcel = () => {
        const workbook: any = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('My Sheet');
        sheet.properties.defaultRowHeight = 20;


        sheet.getRow(1).border = {
            top: {style: 'thin', color: {argb: 'bbbbbb'}},
            left: {style: 'thin', color: {argb: 'bbbbbb'}},
            bottom: {style: 'thin', color: {argb: 'bbbbbb'}},
            right: {style: 'thin', color: {argb: 'bbbbbb'}}
        };

        sheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {argb: 'eaeaea'},
        }

        sheet.columns = [
            {
                header: "ID", key: "id", width: 10
            },
            {
                header: "First Name", key: "firstname", width: 20
            },
            {
                header: "Last Name", key: "lastname", width: 20
            },
            {
                header: "Email", key: "email", width: 30
            },
        ]
        if (data && data.length > 0) {
            data?.map((item: any, index) => {
                sheet.addRow({
                    id: item?.id,
                    firstname: item?.firstname,
                    lastname: item?.lastname,
                    email: item?.email
                })
            })
        }

        const date = moment().format('DD_MMM_YYYY');
        workbook.xlsx.writeBuffer().then((data: any) => {
            const blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheet.sheet"});
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `${date}_download.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        })
    }


    return (
        <React.Fragment>
            <div className="menu-link px-3" onClick={ExportExcel}
                 data-kt-ecommerce-export="copy">
                Export as Excel
            </div>
        </React.Fragment>
    );
}

export default ExportAsExcel;