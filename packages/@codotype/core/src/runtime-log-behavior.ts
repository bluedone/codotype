// // // //
/**
 * RuntimeLogBehavior
 * Designates different logging behaviors for a Codotype Runtime.
 * @variation normal - default logging behavior (prints everything except verbose logs)
 * @variation verbose - displays detailed play-by-play of ProjectBuild execution. Helpful when developing.
 * @variation suppress - supresses all logs
 */

export type RuntimeLogBehavior = "normal" | "verbose" | "suppress";
export enum RuntimeLogBehaviors {
    normal = "normal",
    verbose = "verbose",
    suppress = "suppress",
}
