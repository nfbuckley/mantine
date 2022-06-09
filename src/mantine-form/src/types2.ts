export type FormErrors = Record<string, React.ReactNode>;

export interface ReorderPayload {
  from: number;
  to: number;
}

type Rule<Value, Values> = (value: Value, values: Values) => React.ReactNode;

type FormRule<Value, Values> = Value extends Record<string, unknown>
  ? FormRulesRecord<Value> | Rule<Value, Values>
  : Value extends Array<infer ListValue>
  ? { [Key in keyof ListValue]: Rule<ListValue[Key], Values> } | Rule<Value, Values>
  : Rule<Value, Values>;

export type FormRulesRecord<Values> = Partial<{
  [Key in keyof Values]: FormRule<Values[Key], Values>;
}> &
  Record<string, (value: unknown, values: Values) => React.ReactNode>;

export type FormValidateInput<Values> = FormRulesRecord<Values> | ((values: Values) => FormErrors);

// type TestValues = {
//   a: number;
//   b: { c: string }[];
//   d: {
//     e: {
//       f: string[];
//     };
//   };
// };
// export const rules: FormRulesRecord<TestValues> = {
//   a: (value, values) => null,
//   'a.b': (value, values) => null,
//   b: {
//     c: (value, values) => null,
//   },
//   // b: (value, values) => null,
//   d: {
//     e: (value, values) => null,
//   },
// };
