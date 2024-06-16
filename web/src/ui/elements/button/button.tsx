import type {FunctionalComponent} from "preact"
import cl from "../../cl.ts"
import type {HTMLAttributes} from "preact/compat"

// todo
interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, "size"> {
	color?: "primary" | "secondary" | "paper" | "danger" | "info" | "link"
	kind?: "normal" | "ghost" | "line"
	size?: "small" | "medium" | "large"
	pressed?: boolean
}

const Button: FunctionalComponent<ButtonProps> = ({
	children,
	color = "secondary",
	kind = "normal",
	size = "medium",
	...props
}) => {
	return (
		<button
			{...props}
			aria-pressed={"pressed" in props ? props.pressed : undefined}
			class={cl("button", size, kind, color, props.class, props.className)}>
			{children}
		</button>
	)
}
export default Button
