/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {

    return (
        <>
            <SidebarMenuItem
                to='/dashboard'
                icon='element-11'
                title={'Dashboard'}
                fontIcon='bi-app-indicator'
            />
            <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder'
                             fontIcon='bi-layers'/>
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span
                        className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
                </div>
            </div>
            <SidebarMenuItemWithSub
                to='/crafted/pages'
                title='Pages'
                fontIcon='bi-archive'
                icon='element-plus'
            >
                <SidebarMenuItemWithSub to='/crafted/pages/profile'
                                        title='Profile' hasBullet={true}>
                    <SidebarMenuItem to='/crafted/pages/profile/overview'
                                     title='Overview' hasBullet={true}/>
                    <SidebarMenuItem to='/crafted/pages/profile/projects'
                                     title='Projects' hasBullet={true}/>
                    <SidebarMenuItem
                        to='/crafted/pages/profile/campaigns'
                        title='Campaigns'
                        hasBullet={true}
                    />
                    <SidebarMenuItem
                        to='/crafted/pages/profile/documents'
                        title='Documents'
                        hasBullet={true}
                    />
                    <SidebarMenuItem
                        to='/crafted/pages/profile/connections'
                        title='Connections'
                        hasBullet={true}
                    />
                </SidebarMenuItemWithSub>

                <SidebarMenuItemWithSub to='/crafted/pages/wizards'
                                        title='Wizards' hasBullet={true}>
                    <SidebarMenuItem
                        to='/crafted/pages/wizards/horizontal'
                        title='Horizontal'
                        hasBullet={true}
                    />
                    <SidebarMenuItem to='/crafted/pages/wizards/vertical'
                                     title='Vertical' hasBullet={true}/>
                </SidebarMenuItemWithSub>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/crafted/accounts'
                title='Accounts'
                icon='profile-circle'
                fontIcon='bi-person'
            >
                <SidebarMenuItem to='/crafted/account/overview' title='Overview'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/crafted/account/settings' title='Settings'
                                 hasBullet={true}/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub to='/error' title='Errors'
                                    fontIcon='bi-sticky' icon='cross-circle'>
                <SidebarMenuItem to='/error/404' title='Error 404'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/error/500' title='Error 500'
                                 hasBullet={true}/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/crafted/widgets'
                title='Widgets'
                icon='element-7'
                fontIcon='bi-layers'
            >
                <SidebarMenuItem to='/crafted/widgets/lists' title='Lists'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/crafted/widgets/statistics'
                                 title='Statistics' hasBullet={true}/>
                <SidebarMenuItem to='/crafted/widgets/charts' title='Charts'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/crafted/widgets/tables' title='Tables'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds'
                                 hasBullet={true}/>
            </SidebarMenuItemWithSub>
            <div className='menu-item'>
                <div className='menu-content pt-8 pb-2'>
                    <span
                        className='menu-section text-muted text-uppercase fs-8 ls-1'>ADMINISTRATIVE SETTINGS</span>
                </div>
            </div>
            <SidebarMenuItemWithSub
                to='/apps/chat'
                title='Chat'
                fontIcon='bi-chat-left'
                icon='message-text-2'
            >
                <SidebarMenuItem to='/apps/chat/private-chat'
                                 title='Private Chat' hasBullet={true}/>
                <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart'
                                 hasBullet={true}/>
                <SidebarMenuItem to='/apps/chat/drawer-chat'
                                 title='Drawer Chart' hasBullet={true}/>
            </SidebarMenuItemWithSub>
            <SidebarMenuItemWithSub
                to='/groups'
                title='Role Management'
                fontIcon='bi-layers'
                icon='abstract-28'
            >
                <SidebarMenuItem to='users/' hasBullet={true}
                                 title='User Managment'
                />
                <SidebarMenuItem to='groups/' hasBullet={true}
                                 title='User Groups Managment'/>
            </SidebarMenuItemWithSub>

        </>
    )
}

export {SidebarMenuMain}
