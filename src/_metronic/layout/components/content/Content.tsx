import {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import clsx from 'clsx'
import {useLayout} from '../../core'
import {DrawerComponent} from '../../../assets/ts/components'
import {WithChildren} from '../../../helpers'
import {Loader} from "../../../../app/services/Loader";
import {shallowEqual, useSelector} from "react-redux";
import {RootState} from "../../../../setup";

const Content = ({children}: WithChildren) => {
    const {config, classes} = useLayout()
    const location = useLocation();
    const {actionsLoading}: any = useSelector<RootState>(
        (state) => ({
            actionsLoading: state.common.actionsLoading,
        }),
        shallowEqual,
    )
    useEffect(() => {
        DrawerComponent.hideAll()
    }, [location])

    const appContentContainer = config.app?.content?.container
    return (
        <div
            id='kt_app_content'
            className={clsx(
                'app-content flex-column-fluid',
                classes.content.join(' '),
                config?.app?.content?.class
            )}
        >
            {/*Common Loader for api async await*/}
            {actionsLoading && <Loader/>}
            {appContentContainer ? (
                <div
                    id='kt_app_content_container'
                    className={clsx('app-container container-fluid')}
                >
                    {children}
                </div>
            ) : (
                <>{children}</>
            )}
        </div>
    )
}

export {Content}
