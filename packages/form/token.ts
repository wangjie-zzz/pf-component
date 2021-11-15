// eslint-disable-next-line prettier/prettier
import type { InjectionKey } from 'vue'
import type { Emitter } from 'mitt'
import type {
  FieldErrorList,
} from 'async-validator'

export declare type ComponentSize = "large" | "medium" | "small" | "mini";
export declare type Nullable<T> = T | null;

export interface ElFormContext {
  registerLabelWidth(width: number, oldWidth: number): void
  deregisterLabelWidth(width: number): void
  autoLabelWidth: string | undefined
  formMitt: Emitter
  emit: (evt: string, ...args: any[]) => void
  model?: Record<string, unknown>
  rules?: Record<string, unknown>
  labelPosition?: string
  labelWidth?: string
  inline?: boolean
  inlineMessage?: boolean
  size?: string
  showMessage?: boolean
  statusIcon?: boolean
  disabled?: boolean
  hideRequiredAsterisk?: boolean
}

export interface ValidateFieldCallback {
  (message?: string, invalidFields?: FieldErrorList): void
}

export interface ElFormItemContext {
  prop?: string
  formItemMitt: Emitter
  size: ComponentSize
  validateState: string
  validate(trigger?: string, callback?: ValidateFieldCallback): void
  updateComputedLabelWidth(width: number): void
  addValidateEvents(): void
  removeValidateEvents(): void
  resetField(): void
  clearValidate(): void
}

// TODO: change it to symbol
export const elFormKey: InjectionKey<ElFormContext> = 'elForm' as any

export const elFormItemKey: InjectionKey<ElFormItemContext> = 'elFormItem' as any

export const elFormEvents = {
  addField: 'el.form.addField',
  removeField: 'el.form.removeField',
} as const
