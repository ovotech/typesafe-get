import { get } from "../src";

describe("typesafe-get", () => {
  it("allows you to get a set top-level property", () => {
    const result = get({ result: "correct" }, "result");
    expect(result).toEqual("correct");
  });

  it("correctly infers the type of a queried property", () => {
    const result = get({ result: { value: "neat" } }, "result");
    expect(result!.value).toEqual("neat");
  });

  it("lets you look up possibly undefined properties", () => {
    const input: { a?: string } = {};
    expect(get(input, "a")).toEqual(undefined);
  });

  it("lets you look up properties on a possibly undefined object", () => {
    type test1 = { a: string } | undefined;
    const input: test1 = undefined;
    expect(get(input as test1, "a")).toEqual(undefined);
  });

  it("lets you look up nested properties", () => {
    const input = { a: { b: 1 } };
    expect(get(input, "a", "b")).toEqual(1);
  });

  it("lets you look up nested properties that may be undefined", () => {
    const input: { a?: { b: number } } = {};
    const result = get(input, "a", "b");
    expect(result).toEqual(undefined);
  });

  it("lets you look up nested properties that may be undefined on a possibly undefined object", () => {
    type test2 = { a: { b: number } } | undefined;
    const input: test2 = undefined;
    const result = get(input as test2, "a", "b");
    expect(result).toEqual(undefined);
  });

  it("correctly infers the type of a nested possibly-null property", () => {
    const input: { a?: { b: { c: number } } } = { a: { b: { c: 5 } } };
    const result = get(input, "a", "b");
    expect(result!.c).toEqual(5);
  });

  it("returns null if the final property is null", () => {
    const input: { a: number | null } = { a: null };
    const result = get(input, "a");
    expect(result).toEqual(null);
  });

  it("returns undefined if following a path through a null", () => {
    const input: { a: { b: number } | null } = { a: null };
    const result = get(input, "a", "b");
    expect(result).toEqual(undefined);
  });

  it("allows doubly nested lookup through undefined properties", () => {
    const input: {
      a?: { b?: { c?: number } };
    } = {};

    const result = get(input, "a", "b", "c");

    expect(result).toEqual(undefined);
  });

  it("allows quadruply nested lookup through undefined properties on a possibly undefined object", () => {
    type test5 = { a?: { b?: { c?: number } } } | undefined;
    const input: test5 = undefined;

    const result = get(input as test5, "a", "b", "c");

    expect(result).toEqual(undefined);
  });

  it("allows doubly nested lookup through defined properties", () => {
    const input = {
      a: { b: { c: 123 } }
    };

    const result = get(input, "a", "b", "c");

    expect(result).toEqual(123);
  });

  it("allows triply nested lookup through undefined properties", () => {
    const input: {
      a?: { b?: { c?: { d?: string } } };
    } = {};

    const result = get(input, "a", "b", "c", "d");

    expect(result).toEqual(undefined);
  });

  it("allows triply nested lookup through defined properties", () => {
    const input = {
      a: { b: { c: { d: "hello" } } }
    };

    const result = get(input, "a", "b", "c", "d");

    expect(result).toEqual("hello");
  });

  it("allows quadruply nested lookup through undefined properties", () => {
    const input: {
      a?: { b?: { c?: { d?: { e?: {} } } } };
    } = {};

    const result = get(input, "a", "b", "c", "d", "e");

    expect(result).toEqual(undefined);
  });

  it("allows quadruply nested lookup through undefined properties on a possibly undefined object", () => {
    type test3 =
      | {
          a?: { b?: { c?: { d?: { e?: {} } } } };
        }
      | undefined;
    const input: test3 = undefined;

    const result = get(input as test3, "a", "b", "c", "d", "e");

    expect(result).toEqual(undefined);
  });

  it("allows quadruply nested lookup through defined properties", () => {
    const input = {
      a: { b: { c: { d: { e: {} } } } }
    };

    const result = get(input, "a", "b", "c", "d", "e");

    expect(result).toEqual({});
  });
});
