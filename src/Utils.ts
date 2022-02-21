export function clamp(number: number, min: number, max: number): number {
    return Math.max(min, Math.min(number, max));
}

export interface SimpleVector2 {
    x: number;
    y: number;
};

export interface SimpleVector3 {
    x: number;
    y: number;
    z: number;
};
