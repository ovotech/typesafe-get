import get = require('./index');
import { expect } from 'chai';

describe("typesafe-get", () => {
    it("allows you to get a set top-level property", () => {
        let result = get({ result: 'correct' }, 'result');
        expect(result).to.equal('correct');
    });

    it("correctly infers the type of a queried property", () => {
        let result = get({ result: { value: 'neat' } }, 'result');
        expect(result.value).to.equal('neat');
    });

    it("lets you look up possibly undefined properties", () => {
        const input: { a?: string } = { };
        expect(get(input, 'a')).to.equal(undefined);
    });

    it("lets you look up nested properties", () => {
        const input = { a: { b: 1 } };
        expect(get(input, 'a', 'b')).to.equal(1);
    });

    it("lets you look up nested properties that may be undefined", () => {
        const input: { a?: { b: number } } = { };
        let result = get(input, 'a', 'b');
        expect(result).to.equal(undefined);
    });

    it("correctly infers the type of a nested possibly-null property", () => {
        const input: { a?: { b: { c: number } } } = { a: { b: { c: 5 } } };
        let result = get(input, 'a', 'b');
        expect(result!.c).to.equal(5);
    });

    it("returns null if the final property is null", () => {
        const input: { a: number | null } = { a: null };
        let result = get(input, 'a');
        expect(result).to.equal(null);
    });

    it("returns undefined if following a path through a null", () => {
        const input: { a: { b: number } | null } = { a: null };
        let result = get(input, 'a', 'b');
        expect(result).to.equal(undefined);
    });
});