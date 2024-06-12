import type {FunctionalComponent} from "preact"
import cl from "../cl.ts"
import type {HTMLAttributes} from "preact/compat"

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
	primary?: boolean
	ghost?: boolean
	link?: boolean
	outline?: boolean
	p?: number
	m?: number
}

const Button: FunctionalComponent<ButtonProps> = ({
	children,
	primary,
	ghost,
	link,
	outline,
	p,
	m,
	...props
}) => {
	return (
		<button
			{...props}
			class={cl(
				`p-${p || 2}`,
				props.class,
				props.className,
				"hover:ring-1 shadow-sm rounded",
				{
					"ring-1 hover:ring-2": outline,
					"ring-yes-400 dark:ring-yes-800": outline && primary,
					"bg-yes-400 hover:bg-yes-500 dark:bg-yes-800 dark:hover:bg-yes-900":
						primary,
				},
			)}>
			{children}
		</button>
	)
}
export default Button
