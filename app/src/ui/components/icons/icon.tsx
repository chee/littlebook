import {
	Icon as IconifyIcon,
	type IconifyIconProps,
	addAPIProvider,
} from "@iconify-icon/solid"

addAPIProvider("", {
	resources: [`${location.protocol}//${location.host}/`],
})

export default function Icon(
	props: Omit<IconifyIconProps, "icon"> & ({name: string} | {icon: string})
) {
	const icon = () => ("name" in props ? `solar:${props.name}` : props.icon)

	return <IconifyIcon noobserver {...props} icon={icon()} />
}
