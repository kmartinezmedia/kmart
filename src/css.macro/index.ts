import { createMacro } from "babel-plugin-macros";
export type MacroHandler = Parameters<typeof createMacro>[0];

const css: MacroHandler = ({ references }) => {
  references.default.forEach(referencePath => {
    const args = referencePath.parentPath.get('arguments');
    if (Array.isArray(args)) {
      const [firstArgumentPath] = args;
      if (firstArgumentPath.node.type === 'StringLiteral') {
        console.log(firstArgumentPath)
      }
    }
  });
}

export default createMacro(css) as (
  value: TemplateStringsArray
) => string;
