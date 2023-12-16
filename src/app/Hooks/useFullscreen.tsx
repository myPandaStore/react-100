import { useRef } from 'react'
const isClient = typeof window !== "undefined";
const defaultDocument = isClient ? window.document : void 0;
// web api supported full screen
const functionsMap = [
    [
        "requestFullscreen",
        "exitFullscreen",
        "fullscreenElement",
        "fullscreenEnabled",
        "fullscreenchange",
        "fullscreenerror"
    ],
    [
        "webkitRequestFullscreen",
        "webkitExitFullscreen",
        "webkitFullscreenElement",
        "webkitFullscreenEnabled",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
    ],
    [
        "webkitRequestFullScreen",
        "webkitCancelFullScreen",
        "webkitCurrentFullScreenElement",
        "webkitCancelFullScreen",
        "webkitfullscreenchange",
        "webkitfullscreenerror"
    ],
    [
        "mozRequestFullScreen",
        "mozCancelFullScreen",
        "mozFullScreenElement",
        "mozFullScreenEnabled",
        "mozfullscreenchange",
        "mozfullscreenerror"
    ],
    [
        "msRequestFullscreen",
        "msExitFullscreen",
        "msFullscreenElement",
        "msFullscreenEnabled",
        "MSFullscreenChange",
        "MSFullscreenError"
    ]
];

export default function useFullscreen(target: any, options: any = {}) {
    const { document = defaultDocument, autoExit = false } = options
    const targetRef = target || (document == null ? void 0 : document.querySelector("html"));
    const isFullscreen = useRef(false)
    let isSupported = false
    let map = functionsMap[0]
    if (!document) {
        isSupported = false
    } else {
        for (const m of functionsMap) {
            if (m[1] in document) {
                map = m
                isSupported = true
                break;
            }
        }
    }
    const [REQUEST, EXIT, ELEMENT, , EVENT] = map;

    async function exit() {
        if (!isSupported)
            return;
        if (document == null ? void 0 : document[ELEMENT])
            await document[EXIT]();
        isFullscreen.current = false;
    }
    async function enter() {
        if (!isSupported)
            return;
        await exit();
        // const target2 = unrefElement(targetRef);
        const target2 = targetRef.current;
        if (target2) {
            await target2[REQUEST]();
            isFullscreen.current = true;
        }
    }
    async function toggle() {
        if (isFullscreen.current)
            await exit();
        else
            await enter();
    }
    return {
        isSupported,
        isFullscreen,
        enter,
        exit,
        toggle
    }
}