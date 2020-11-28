// // // //
/**
 * RuntimeLogLevel
 * Designates different levels of logging for a CodotypeRuntime.
 * @variation info - displays runtime status (always prints)
 * @variation warning - displays runtime warnings (always prints)
 * @variation error - displays errors (always prints)
 * @variation verbose - displays detailed play-by-play of ProjectBuild execution. Helpful when developing.
 * @variation suppress - supresses all logs
 */

export type RuntimeLogLevel =
    | "info"
    | "warning"
    | "error"
    | "verbose"
    | "suppress";
export enum RuntimeLogLevels {
    info = "info",
    warning = "warning",
    error = "error",
    verbose = "verbose",
    suppress = "suppress",
}
