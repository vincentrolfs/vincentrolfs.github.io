/** @internal */
export function createSourceMapGenerator(
  host: EmitHost,
  file: string,
  sourceRoot: string,
  sourcesDirectoryPath: string,
  generatorOptions: SourceMapGeneratorOptions
): SourceMapGenerator {
  /* eslint-disable no-var */
  var { enter, exit } = generatorOptions.extendedDiagnostics
    ? performance.createTimer("Source Map", "beforeSourcemap", "afterSourcemap")
    : performance.nullTimer;

  // Current source map file and its index in the sources list
  var rawSources: string[] = [];
  var sources: string[] = [];
  var sourceToSourceIndexMap = new Map<string, number>();
  var sourcesContent: (string | null)[] | undefined; // eslint-disable-line no-restricted-syntax

  var names: string[] = [];
  var nameToNameIndexMap: Map<string, number> | undefined;
  var mappingCharCodes: number[] = [];
  var mappings = "";

  // Last recorded and encoded mappings
  var lastGeneratedLine = 0;
  var lastGeneratedCharacter = 0;
  var lastSourceIndex = 0;
  var lastSourceLine = 0;
  var lastSourceCharacter = 0;
  var lastNameIndex = 0;
  var hasLast = false;

  // ... etc
}
