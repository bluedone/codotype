import * as React from "react";
import { testState } from "@codotype/types";
import { AppNavbar } from "@codotype/ui";
import { WebRuntime } from "@codotype/ui";
import { RuntimeProvider } from "@codotype/ui";
import { ProjectEditor } from "@codotype/ui/dist/src/components/project_editor/component";
const { dummyGeneratorMeta } = testState;

// // // //

export default () => {
  return (
    <div>
      <AppNavbar />
      <div className="mt-4 pt-4">
        <WebRuntime generator={dummyGeneratorMeta}>
          {({ generator, project, setProject, clearProject }) => (
            <RuntimeProvider>
              {({ generateCode }) => (
                <React.Fragment>
                  <ProjectEditor
                    generator={dummyGeneratorMeta}
                    project={project}
                    onClickGenerate={() => {
                      console.log("onClickGenerate");
                      generateCode({
                        project,
                        generator
                      });
                    }}
                    onResetProject={clearProject}
                    onChange={updatedProject => {
                      console.log("onClickGenerate");
                      setProject(updatedProject);
                    }}
                  />
                </React.Fragment>
              )}
            </RuntimeProvider>
          )}
        </WebRuntime>
      </div>
    </div>
  );
};
