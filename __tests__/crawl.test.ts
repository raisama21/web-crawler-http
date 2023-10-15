import { normalizeURL } from "../src/crawl.ts";
import { test, expect } from "@jest/globals";

test("normalizeURL strip protocal", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const output = "blog.boot.dev/path";
    expect(actual).toEqual(output);
});

test("normalizeURL strip trailing slash", () => {
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const output = "blog.boot.dev/path";
    expect(actual).toEqual(output);
});

test("normalizeURL capitalize", () => {
    const input = "https://BLOG.boot.dev/path/";
    const actual = normalizeURL(input);
    const output = "blog.boot.dev/path";
    expect(actual).toEqual(output);
});

test("normalizeURL strip http", () => {
    const input = "http://blog.boot.dev/path/";
    const actual = normalizeURL(input);
    const output = "blog.boot.dev/path";
    expect(actual).toEqual(output);
});
