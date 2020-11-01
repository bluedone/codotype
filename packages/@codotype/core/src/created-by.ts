/**
 * CreatedBy
 * Used to differentiate between SchemaInput + AttributeInput + RelationInput primatives created by a User or by a Plugin
 * Along with `locked` property, determines whether or not a primative may be removed from ProjectInput.schemas in @codotype/ui
 */
export type CreatedBy = "user" | "plugin";
export enum CreatedByValues {
    user = "user",
    plugin = "plugin",
}
