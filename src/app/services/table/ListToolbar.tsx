import {KTSVG} from '../../../_metronic/helpers'
import {Link} from 'react-router-dom'
import {CheckAccess} from '../Functional'
import React from 'react'
import ExportAsCsv from "../ExportAsCSV";
import ExportAsExcel from "../ExportAsExcel";

const ListToolbar = ({module, isMaster, parent, ExportReport=false}: any) => {
    const headers = [
        {label: "First Name", key: "firstname"},
        {label: "Last Name", key: "lastname"},
        {label: "Email", key: "email"}
    ];

    const data = [
        {firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com"},
        {firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com"},
        {firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com"}
    ];
    return (
        <>
            {CheckAccess(`${module}.create`) ?
                <div className='d-flex justify-content-end gap-2'
                     data-kt-user-table-toolbar='base'>
                    {isMaster ?
                        <Link to={`/${parent}/${module}/create`} type='button'
                              className='btn btn-primary '>
                            <KTSVG path='/media/icons/duotune/arrows/arr075.svg'
                                   className='svg-icon-2'/>
                            New Record
                        </Link>
                        : <Link to={`/${module}/create`} type='button'
                                className='btn btn-primary d-flex align-items-center'>
                            <KTSVG path='/media/icons/duotune/arrows/arr075.svg'
                                   className='svg-icon-2'/>
                            New Record
                        </Link>
                    }
                    {ExportReport &&
                        <button
                            type='button'
                            className='btn btn-color-primary btn-light-primary'
                            data-kt-menu-trigger='click'
                            data-kt-menu-placement='bottom-end'
                            data-kt-menu-flip='top-end'
                        ><i className="ki-duotone ki-exit-up fs-2"><span
                            className="path1"></span><span
                            className="path2"></span></i>Export Report
                        </button>
                    }
                    <div
                        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold fs-7 w-200px py-4'
                        data-kt-menu='true'>
                        <div className="menu-item px-3">
                            <ExportAsExcel/>
                        </div>
                        <div className="menu-item px-3">
                            <ExportAsCsv data={data} headers={headers}/>
                        </div>

                    </div>
                </div> : null}
        </>
    )
}

export {ListToolbar}
