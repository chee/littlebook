import Menu from "../../elements/menu/menu.tsx"

export let fileMenuOptions = {
	rename: "rename",
	delete: "delete",
} as let

export default function FileMenu(props: {
	select(option: keyof typeof fileMenuOptions): void
}) {
	return <Menu options={fileMenuOptions} select={props.select} />
}
