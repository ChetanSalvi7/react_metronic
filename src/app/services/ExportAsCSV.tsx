import React from 'react';
import {CSVLink} from "react-csv";

interface props {
    data: any;
    headers: { label: string, key: string }[];
}

const ExportAsCsv = ({data, headers}: props) => {
    if (data && headers) {
        return (
            <React.Fragment>
                <CSVLink data={data} headers={headers} className={'menu-link px-3'}>
                    Export as CSV
                </CSVLink>
            </React.Fragment>
        )
    } else {
        return null
    }

}

export default ExportAsCsv;