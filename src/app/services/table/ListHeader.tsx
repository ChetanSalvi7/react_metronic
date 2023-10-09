import {SearchComponent} from './SearchComponent'
import {ListToolbar} from './ListToolbar'

const ListHeader = ({updateState, module, isMaster, parent,ExportReport}: any) => {

  return (
    <div className='card-header border-0 pt-6'>
      <SearchComponent updateState={updateState} />
      <div className='card-toolbar'>
        <ListToolbar module={module} isMaster={isMaster} parent={parent} ExportReport={ExportReport}/>
      </div>
    </div>
  )
}

export {ListHeader}
