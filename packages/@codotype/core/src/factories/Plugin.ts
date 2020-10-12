import { GeneratorMeta, ConfigurationGroup } from "..";
import {
    ExperienceRecommendation,
    SchemaEditorConfiguration,
    GeneratorCreator,
} from "../generator";
import { SchemaEditorBuilder } from "./SchemaEditor";
import { Project } from "../project";

interface PluginBuilderParams {
    id: string;
    label: string;
    description: string;
    project_path: string;
    version?: string;
    codotypeVersion?: string;
    icon?: string;
    homepage?: string;
    techTags?: string[];
    typeTags?: string[];
    documentation?: string;
    experience?: ExperienceRecommendation;
    configurationGroups?: ConfigurationGroup[];
    schemaEditorConfiguration?: SchemaEditorConfiguration;
    createdBy?: GeneratorCreator;
    exampleProjects?: Project[];
}

export class PluginBuilder implements GeneratorMeta {
    id: string;
    label: string;
    description: string;
    project_path: string;
    version: string = "0.0.1";
    codotypeVersion: string = "0.0.0";
    icon: string = "";
    homepage: string = "";
    techTags: string[] = [];
    typeTags: string[] = [];
    documentation: string = "";
    experience: ExperienceRecommendation = ExperienceRecommendation.BEGINNER;
    configurationGroups: ConfigurationGroup[] = [];
    schemaEditorConfiguration: SchemaEditorConfiguration = new SchemaEditorBuilder(
        {
            supportedDatatypes: [],
            supportedRelations: [],
        },
    );
    createdBy: GeneratorCreator = {
        name: "",
        contact: {},
    };
    exampleProjects: Project[] = [];

    constructor(params: PluginBuilderParams) {
        this.id = params.id;
        this.label = params.label;
        this.description = params.description;
        this.project_path = params.project_path;

        this.version = params.version || this.version;
        this.codotypeVersion = params.codotypeVersion || this.codotypeVersion;
        this.icon = params.icon || this.icon;
        this.homepage = params.homepage || this.homepage;
        this.techTags = params.techTags || this.techTags;
        this.typeTags = params.typeTags || this.typeTags;
        this.documentation = params.documentation || this.documentation;
        this.experience = params.experience || this.experience;
        this.configurationGroups =
            params.configurationGroups || this.configurationGroups;
        this.schemaEditorConfiguration =
            params.schemaEditorConfiguration || this.schemaEditorConfiguration;
        this.createdBy = params.createdBy || this.createdBy;
        this.exampleProjects = params.exampleProjects || this.exampleProjects;
    }
}
