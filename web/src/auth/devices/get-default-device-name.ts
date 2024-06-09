import {UAParser} from "ua-parser-js"

export default function getDefaultDeviceName() {
	const {browser, os, device} = UAParser(navigator.userAgent)
	return `${browser.name} on ${device.model ?? os.name}`
}
