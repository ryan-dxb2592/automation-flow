import { LaunchBrowserTask } from "./launch-browser";
import { PageToHtmlTask } from "./page-to-html";
import { ExtractTextFromElementTask } from "./extract-text-from-element";

export const TaskRegistry = {
  LAUNCH_BROWSER: LaunchBrowserTask,
  PAGE_TO_HTML: PageToHtmlTask,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractTextFromElementTask,
};
