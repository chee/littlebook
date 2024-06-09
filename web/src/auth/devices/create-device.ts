import getDefaultDeviceName from "./get-default-device-name.ts"
import * as Auth from "@localfirst/auth"

export default function createDevice(
	userId: string,
	deviceName = getDefaultDeviceName(),
) {
	return Auth.createDevice({
		deviceName,
		userId,
	})
}
