import axios from 'axios'

const controller = new AbortController()

export const http = axios.create({
	baseURL: '/api',
	timeout: 100000,
	signal: controller.signal
})
