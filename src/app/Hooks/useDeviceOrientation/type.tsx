export interface ConfigurableWindow {
    window?: Window;
}

export type OrientationType = number | null

export type UseDeviceOrientation = (options?: ConfigurableWindow) => {
    isSupported: boolean,
    isAbsolute: boolean,
    alpha: OrientationType,
    beta: OrientationType,
    gamma: OrientationType
}
