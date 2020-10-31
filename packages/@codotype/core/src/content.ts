/**
 * Content
 * Interface to encapsulate a shared standard of user-facing content used throughout a Plugin
 * @param label - A short, human-readable label
 * @param description - The short-form human-readable description
 * @param documentation - The long-form documentation in Markdown
 * @param icon - URL pointing the an icon
 */
export interface Content {
    label: string;
    description: string;
    documentation: string;
    icon: string;
}
