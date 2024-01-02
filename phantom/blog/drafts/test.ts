// See also https://github.com/microsoft/TypeScript/issues/55330

// Watch out!
// Until its next assignment, the type of target is `undefined`, not `string | undefined`!
// See https://www.typescriptlang.org/docs/handbook/2/narrowing.html#assignments
// Type annotation limits **what values can be assigned to it**
// It does not make the variable that type!
let target: string | undefined = undefined;

// This shows that target is indeed `undefined`
target satisfies undefined;

// The assignment here is ignored, because it happens in a callback
// See https://github.com/microsoft/TypeScript/issues/9998
["val"].forEach((val) => (target = val));

// proof that it's type is undefined
target satisfies undefined;

if (!target) {
  // TypeScript thinks that this will always happen
  throw new Error();
}

// Since target was `undefined` before, it is now `never`
target satisfies never;
