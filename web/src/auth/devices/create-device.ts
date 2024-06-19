import * as Auth from "@localfirst/auth"
import getDefaultDeviceName from "./get-default-device-name.ts"

export default function createDevice(
	userId: string,
	deviceName = getDefaultDeviceName(),
) {
	return Auth.createDevice({
		deviceName,
		userId,
	})
}
