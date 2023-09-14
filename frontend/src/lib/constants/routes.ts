import bell from '@iconify/icons-tabler/bell'
import home from '@iconify/icons-tabler/home'
import infoCircle from '@iconify/icons-tabler/info-circle'
import mail from '@iconify/icons-tabler/mail'
import search from '@iconify/icons-tabler/search'
import settings from '@iconify/icons-tabler/settings'
import user from '@iconify/icons-tabler/user'
import userGroup from '@iconify/icons-tabler/users-group'
import type { IconifyIcon } from '@iconify/svelte'

export const routes = [
	{
		label: 'Home',
		route: '/',
		icon: home
	},
	{
		label: 'Explore',
		route: '/explore',
		icon: search
	},
	{
		label: 'Communities',
		route: '/c',
		icon: userGroup
	},
	{
		label: 'Chat',
		route: '/chat',
		icon: mail
	},
	{
		label: 'Notification',
		route: '/noti',
		icon: bell
	},
	{
		label: 'Profile',
		route: '/profile',
		icon: user
	},
	{
		label: 'Settings',
		route: '/setting',
		icon: settings
	},
	{
		label: 'Info',
		route: '/info',
		icon: infoCircle
	}
] satisfies {
	label: string
	route: string
	icon: IconifyIcon
}[]
