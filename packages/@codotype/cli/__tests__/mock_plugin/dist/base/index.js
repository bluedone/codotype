"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function(resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
const Generator = {
    name: "Codotype Generator Starter - Base",
    write({ runtime }) {
        return __awaiter(this, void 0, void 0, function*() {
            // Copies server base code
            yield runtime.copyDir({ src: "", dest: "" });

            // Writes LICENSE + package.json
            yield runtime.renderTemplate({
                src: "README.md",
                dest: "README.md",
                data: {},
            });
        });
    },
};
module.exports = Generator;
//# sourceMappingURL=index.js.map
