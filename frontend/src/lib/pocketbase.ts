import { PUBLIC_POCKETBASE_URL } from '$env/static/public'
import Porketbase from 'pocketbase'

export const createPocketbaseInstance = () => new Porketbase(PUBLIC_POCKETBASE_URL)

export const pocketbase = createPocketbaseInstance()
