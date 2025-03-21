export enum TaskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
  // NAVIGATE_TO_URL = "NAVIGATE_TO_URL",
  // CLICK_ELEMENT = "CLICK_ELEMENT",
  // INPUT_TEXT = "INPUT_TEXT",
  // CHECK_ELEMENT_VISIBLE = "CHECK_ELEMENT_VISIBLE",
  // CHECK_ELEMENT_NOT_VISIBLE = "CHECK_ELEMENT_NOT_VISIBLE",
}

export enum TaskParamType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
}

export interface TaskParam {
  name: string;
  type: TaskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
