import { jsx } from "preact/jsx-runtime";
import "../../../web/src/types";
import * as coders from "../../../../web/src/contents/types/coders";
import { Counter } from "@automerge/automerge";
import { useCallback, useEffect, useMemo, useState } from "preact/hooks";
import { Suspense, lazy } from "preact/compat";
import "./excalidraw.css";
import { throttle } from "throttle-debounce";
const type = "com.excalidraw.json";
function toAutomergeList(array) {
  return array;
}
const base = {
  type: "excalidraw",
  version: 2,
  source: "https://littlebook.app",
  elements: toAutomergeList([]),
  appState: {},
  files: {}
};
const jsonCoder = coders.json();
const coder = {
  encode(string) {
    return jsonCoder.encode(string);
  },
  decode(bytes) {
    if (bytes.length == 0) {
      return base;
    }
    return jsonCoder.decode(bytes);
  }
};
const sumVersion = (v, e) => v + e.version.valueOf();
function excalidrawToAutomerge(element) {
  return {
    ...structuredClone(element),
    customData: element.customData || null,
    version: new Counter(element.version)
  };
}
function automergeToExcalidraw(element) {
  return {
    ...element,
    customData: element.customData || null,
    version: element.version.valueOf()
  };
}
export const ExcalidrawView = ({
  content,
  changeContent
}) => {
  const Excalidraw = useMemo(
    () => lazy(() => import("@excalidraw/excalidraw").then((mod) => mod.Excalidraw)),
    []
  );
  const [excalidrawAPI, setExcalidrawAPI] = useState();
  const initialElements = useMemo(
    () => content.value.elements.map(automergeToExcalidraw),
    []
  );
  useEffect(() => {
    const elements = excalidrawAPI?.getSceneElements();
    const contentVersion = content.value.elements.reduce(sumVersion, 0) || 0;
    const excaliVersion = elements?.reduce(sumVersion, 0) || 0;
    if (contentVersion > excaliVersion) {
      const state = excalidrawAPI?.getAppState();
      if (state?.editingElement || state?.draggingElement || state?.isResizing || state?.isRotating) {
        return;
      }
      excalidrawAPI?.updateScene({
        elements: content.value.elements.map(automergeToExcalidraw)
      });
    }
  }, [content.value]);
  const onchange = useCallback(
    throttle(50, (elements, appState, files) => {
      changeContent((content2) => {
        const contentVersion = content2.value.elements.reduce(sumVersion, 0) || 0;
        const excaliVersion = elements.reduce(sumVersion, 0) || 0;
        if (excaliVersion > contentVersion) {
          content2.value.elements = elements.map(
            excalidrawToAutomerge
          );
        }
      });
    }),
    []
  );
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(LoadingScene, {}), children: /* @__PURE__ */ jsx(
    Excalidraw,
    {
      excalidrawAPI: (api) => setExcalidrawAPI(api),
      initialData: {
        ...content.value,
        elements: initialElements
      },
      handleKeyboardGlobally: false,
      onChange: onchange
    }
  ) });
};
export function activate(lb) {
  lb.coders.register(type, coder);
  lb.views.content.register([type], ExcalidrawView);
  lb.contentTypes.register({
    name: type,
    conformsTo: [
      "public.json",
      "public.text"
    ],
    fileNameExtension: ".excalidraw",
    mimeType: "application/json"
  });
  lb.contentTypes.associate(type, [".excalidraw"]);
  lb.contentTypes.setDisplayName(type, "Excalidraw drawing");
}
export function deactivate(lb) {
  lb.coders.remove(type, coder);
  lb.views.content.remove(ExcalidrawView);
}
function LoadingScene() {
  return /* @__PURE__ */ jsx("div", { class: "excalidraw-loading", children: "loading scene" });
}
