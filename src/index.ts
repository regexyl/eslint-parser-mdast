import { ParserServices } from '@typescript-eslint/parser';
import { ScopeManager } from '@typescript-eslint/scope-manager';
import { AST_NODE_TYPES, ParserOptions, TSESTree } from '@typescript-eslint/types';
import { visitorKeys } from '@typescript-eslint/typescript-estree';
import { fromMarkdown } from 'mdast-util-from-markdown';

// TODO: Waiting on PR - https://github.com/typescript-eslint/typescript-eslint/pull/4729
interface ParseForESLintResult {
  ast: TSESTree.Program & {
    range?: [number, number];
    tokens?: TSESTree.Token[];
    comments?: TSESTree.Comment[];
  };
  services?: ParserServices;
  visitorKeys?: typeof visitorKeys;
  scopeManager?: ScopeManager;
}

declare function parseForESLint(code: string, options?: ParserOptions | null): ParseForESLintResult;

const mdastParser: { parseForESLint: typeof parseForESLint } = {
  parseForESLint: (code, options) => {
    const filePath = options?.filePath;
    if (filePath && !filePath.endsWith('.md')) {
      throw new Error(
        `The markdown parser is not able to parse files that do not have .md extensions. The applied file is ${filePath}.`,
      );
    } else if (!filePath) {
      throw new Error(`The filePath property in \`options\` is ${filePath}.`);
    }

    return {
      ast: {
        type: AST_NODE_TYPES.Program,
        body: [],
        sourceType: 'script',
        loc: { start: { line: 1, column: 0 }, end: { line: 1, column: 0 } },
        range: [0, 0],
        markdown: fromMarkdown(code),
      },
    };
  },
};

export default mdastParser;
