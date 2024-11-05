import Xray from "x-ray"

const x = Xray()

function linkChain(url, stop, max) {
    x(url, "#mw-content-text p > a", {href: "@href"})((err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data.href);
        for (const str of stop) {
            if (data.href.toLowerCase() === str.toLowerCase()) {
                return;
            }
        }
        if (0 < max) {
            linkChain(data.href, [...stop, data.href], max - 1);
        }
    });
}

linkChain("https://en.wikipedia.org/wiki/Special:Random", ["https://en.wikipedia.org/wiki/Philosophy"], 40);