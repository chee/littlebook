import Menu from "../../elements/menu/menu.tsx"

export const fileMenuOptions = {
	rename: "rename",
	delete: "delete",
} as const

export default function FileMenu(props: {
	select(option: keyof typeof fileMenuOptions): void
}) {
	return <Menu options={fileMenuOptions} select={props.select} />
}
