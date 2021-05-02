import { ProjectInput } from "../project";
import { makeUniqueId } from "./makeUniqueId";

// // // //

/**
 * transformJsonProjectInput
 * CHORE - add tests
 * @param jsonProject - Codotype Project parsed from codotype-project.json
 */
export function transformJsonProjectInput(jsonProject: any): ProjectInput {
    // Defines the project instance
    // FEATURE - use Primitives.ProjectInput
    const projectInstance: ProjectInput = {
        id: String(jsonProject.id),
        identifiers: {
            title: String(jsonProject.identifiers.title),
            snake: String(jsonProject.identifiers.snake),
            camel: String(jsonProject.identifiers.camel),
            pascal: String(jsonProject.identifiers.pascal),
            kebab: String(jsonProject.identifiers.kebab),
        },
        relations: jsonProject.relations,
        pluginID: String(jsonProject.generatorId),
        pluginVersion: String(jsonProject.generatorVersion),
        configuration: jsonProject.configuration || {},
        schemas: jsonProject.schemas,
    };

    // Returns the Project instance
    return projectInstance;
}
