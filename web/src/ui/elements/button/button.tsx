import cl from "clsx"
import "./button.scss"
import type {ParentComponent} from "solid-js"
// todo
interface ButtonProps extends Record<string, any> {
	color?: "primary" | "secondary" | "paper" | "danger" | "info" | "link"
	kind?: "normal" | "ghost" | "line"
	size?: "small" | "medium" | "large"
	pressed?: boolean
	class?: string
	type?: "submit" | "button"
}

const Button: ParentComponent<ButtonProps> = props => {
	return (
		<button
			{...props}
			type={props.type || "button"}
			aria-pressed={"pressed" in props ? props.pressed : undefined}
			class={cl(
				"button",
				props.size,
				props.kind,
				props.color,
				props.class,
				props.className,
			)}>
			{props.children}
		</button>
	)
}
export default Button
