import {FC} from 'react'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

type Props = {
  description?: string
}
export const DescriptionCell: FC<Props> = ({description}) => {
  return <>
    {
      description ? <OverlayTrigger placement="top" overlay={<Tooltip>{description}</Tooltip>}>
        <i className="fa fa-paragraph" />
      </OverlayTrigger> : '-'
    }
  </>
}