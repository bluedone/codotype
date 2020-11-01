import {
    PluginMetadata,
    SchemaEditorConfiguration,
    ExperienceRecommendation,
    ExperienceRecommendations,
    PluginAuthor,
    ConfigurationGroup,
} from "..";
import { SchemaEditorBuilder } from "./SchemaEditor";
import { ProjectInput } from "../project";
import { Content } from "../content";

// // // //

interface PluginBuilderParams {
    id: string;
    content: {
        label: string;
        description: string;
        documentation: string;
        icon: string;
    };
    project_path: string;
    version?: string;
    codotypeVersion?: string;
    homepage?: string;
    techTags?: string[];
    typeTags?: string[];
    experience?: ExperienceRecommendation;
    configurationGroups?: ConfigurationGroup[];
    schemaEditorConfiguration?: SchemaEditorConfiguration;
    createdBy?: PluginAuthor;
    exampleProjects?: ProjectInput[];
}

export class PluginBuilder implements PluginMetadata {
    id: string;
    content: Content = {
        label: "",
        description: "",
        documentation: "",
        icon: "",
    };
    project_path: string;
    version: string = "0.0.1";
    codotypeVersion: string = "0.0.0";
    homepage: string = "";
    techTags: string[] = [];
    typeTags: string[] = [];
    documentation: string = "";
    experience: ExperienceRecommendation = ExperienceRecommendations.beginner;
    configurationGroups: ConfigurationGroup[] = [];
    schemaEditorConfiguration: SchemaEditorConfiguration = new SchemaEditorBuilder(
        {
            supportedDatatypes: [],
            supportedRelations: [],
        },
    );
    createdBy: PluginAuthor = {
        name: "",
        contact: {},
    };
    exampleProjects: ProjectInput[] = [];

    constructor(params: PluginBuilderParams) {
        this.id = params.id;
        this.project_path = params.project_path;

        // Sets this.content
        this.content = {
            label: params.content.label,
            description: params.content.description || this.content.description,
            documentation:
                params.content.documentation || this.content.documentation,
            icon: params.content.icon || this.content.icon,
        };

        this.version = params.version || this.version;
        this.codotypeVersion = params.codotypeVersion || this.codotypeVersion;
        this.homepage = params.homepage || this.homepage;
        this.techTags = params.techTags || this.techTags;
        this.typeTags = params.typeTags || this.typeTags;
        this.experience = params.experience || this.experience;
        this.configurationGroups =
            params.configurationGroups || this.configurationGroups;
        this.schemaEditorConfiguration =
            params.schemaEditorConfiguration || this.schemaEditorConfiguration;
        this.createdBy = params.createdBy || this.createdBy;
        this.exampleProjects = params.exampleProjects || this.exampleProjects;
    }
}
