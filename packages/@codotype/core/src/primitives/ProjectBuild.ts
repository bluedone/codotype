import { ProjectBuild } from "../runtime";
import { ProjectInput } from "../project";

// // // //

interface ProjectBuildParams {
    id?: string;
    projectInput: ProjectInput;
}

export class ProjectBuildBuilder implements ProjectBuild {
    id: string = "";
    projectInput: ProjectInput;
    startTime: string = new Date(Date.now()).toUTCString();
    endTime: string = "";
    constructor(params: ProjectBuildParams) {
        this.id = params.id || this.id;
        this.projectInput = params.projectInput;
        this.startTime = this.startTime;
        this.endTime = this.endTime;
    }
}
