import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

interface URLPart {
	collectionId: string
	recoreId: string
	filename: string
	thumb?: string
}

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const getFileUrl = ({
	collectionId,
	recoreId,
	filename,
	thumb = '0x0'
}: URLPart) =>
	`${PUBLIC_POCKETBASE_URL}/api/files/${collectionId}/${recoreId}/${filename}?thumb=${thumb}`
