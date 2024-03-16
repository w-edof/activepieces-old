import { Type } from '@sinclair/typebox'
import { TriggerPayload } from '../../engine'
import { StepOutput } from './step-output'

export const MAX_LOG_SIZE = 2048 * 1024

export enum ExecutionType {
    BEGIN = 'BEGIN',
    RESUME = 'RESUME',
}

export type ExecutionState = {
    steps: Record<string, StepOutput>
}

export const ExecutionState = {
    steps: Type.Record(Type.String(), Type.Unknown()),
}

export type ExecutioOutputFile = {
    executionState: ExecutionState
}

export type ResumePayload = TriggerPayload
