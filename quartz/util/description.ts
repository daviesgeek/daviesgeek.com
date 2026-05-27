import { ValidLocale } from "../i18n"
import { i18n } from "../i18n"
import { QuartzPluginData } from "../plugins/vfile"
import { unescapeHTML } from "./escape"

export function getPageDescription(
  fileData: QuartzPluginData,
  locale: ValidLocale,
  includeFallback?: true,
): string
export function getPageDescription(
  fileData: QuartzPluginData,
  locale: ValidLocale,
  includeFallback: false,
): string | undefined
export function getPageDescription(
  fileData: QuartzPluginData,
  locale: ValidLocale,
  includeFallback = true,
): string | undefined {
  const description =
    fileData.frontmatter?.socialDescription ??
    fileData.frontmatter?.description ??
    unescapeHTML(fileData.description?.trim() ?? "")

  if (typeof description === "string" && description.trim() !== "") {
    return description
  }

  return includeFallback ? i18n(locale).propertyDefaults.description : undefined
}
