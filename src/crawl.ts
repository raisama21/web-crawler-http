import { JSDOM } from "jsdom";

export async function crawlPage(currentURL: string) {
    console.log(`actively crawling ${currentURL}`);

    try {
        const response = await fetch(currentURL);
        if (response.status > 399) {
            console.log(
                `error in fetch with status code: ${response.status} on page: ${currentURL}`
            );
            return;
        }

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("text/html")) {
            console.log(
                `non html response, content type: ${contentType} on page: ${currentURL}`
            );
            return;
        }

        const data = await response.text();

        console.log(data);
    } catch (error: any) {
        console.log(`error in fetch, ${error.message}, on page ${currentURL}`);
    }
}

export function getURLsFromHTML(htmlBody: string, baseURL: string): string[] {
    const urls: string[] = [];
    const dom = new JSDOM(htmlBody);

    const linkElements =
        dom.window.document.querySelectorAll<HTMLAnchorElement>("a");

    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === "/") {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (error: any) {
                console.log(`error with relative url ${error.message}`);
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            } catch (error: any) {
                console.log(`error with absolute url ${error.message}`);
            }
        }
    }

    return urls;
}

export function normalizeURL(urlString: string): string {
    const urlObj = new URL(urlString);

    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

    if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
        return hostPath.slice(0, -1);
    }

    return hostPath;
}
