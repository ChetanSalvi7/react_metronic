import {ListViewProvider} from './core/ListViewProvider'
import {
    QueryRequestProvider,
    useQueryRequest
} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {KTCard} from '../../../../_metronic/helpers'
import React from 'react'
import {ListHeader} from '../../../services/table/ListHeader'
import {GroupsTable} from "./table/GroupsTable";

const GroupsList = () => {
    const {updateState} = useQueryRequest()
    return (
        <>
            <KTCard>
                <ListHeader updateState={updateState} module='groups' ExportReport={true}/>
                <GroupsTable/>
            </KTCard>
        </>
    )
}

const GroupsListWrapper = () => (
    <QueryRequestProvider>
        <QueryResponseProvider>
            <ListViewProvider>
                <GroupsList/>
            </ListViewProvider>
        </QueryResponseProvider>
    </QueryRequestProvider>
)

export {GroupsListWrapper}
