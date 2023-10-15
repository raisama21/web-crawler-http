import { normalizeURL, getURLsFromHTML } from "../src/crawl.ts";
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

test("getURLsFromHTML absolute", () => {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
        <body>
            <a href="/path/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `;
    const baseURL = "http://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = ["http://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute and relative path", () => {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">
                Boot.dev blog
            </a>
            <a href="/path2/">
                Boot.dev blog
            </a>
        </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = [
        "https://blog.boot.dev/path1/",
        "https://blog.boot.dev/path2/",
    ];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
    const htmlBody = `
    <!DOCTYPE html>
    <html>
        <body>
            <a href="invalid">
                Invalid URL
            </a>
        </body>
    </html>
    `;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected: string[] = [];
    expect(actual).toEqual(expected);
});
