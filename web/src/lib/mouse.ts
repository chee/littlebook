import {createMousePosition} from "@solid-primitives/mouse"
import {createSingletonRoot} from "@solid-primitives/rootless"
export default createSingletonRoot(() => createMousePosition())
