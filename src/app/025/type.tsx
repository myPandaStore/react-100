import type { Vector } from '../utils/vector'

export type Line = [number, number, number]
export type LineSegment = { line: Line; left: Vector; right: Vector }