/**
 * ResponseType
 * Different response types from `POST /api/generate'
 */
export type ResponseType = "S3_DOWNLOAD" | "LOCAL_PATH";
export enum ResponseTypes {
    s3 = "S3_DOWNLOAD",
    local = "LOCAL_PATH",
}
