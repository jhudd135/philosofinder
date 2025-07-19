import Xray from "x-ray"

const x = Xray()

function lastPathComponent(url: string) {
    return url.substring(url.lastIndexOf("/") + 1).toLowerCase().replace(/_/g, " ")
}

function linkChain(url, stop, max, target: string, count) {
    x(url, {href: "#mw-content-text p > a@href", title: "span.mw-page-title-main"})((err, data: {href: string, title: string}) => {
        if (err) {
            console.log(err);
            return;
        }
        if (!data.href) {
            console.log("bad data (bad url?)");
            console.log(data);
            return;
        }
        console.log(count, url, data.title);
        if (url.toLowerCase() === target.toLowerCase() || lastPathComponent(target) === data.title.toLowerCase()) {
            console.log("target found!")
            return;
        }
        for (const str of stop) {
            if (data.href.toLowerCase() === str.toLowerCase()) {
                console.log("repeat link found!");
                return;
            }
        }
        if (0 < max) {
            linkChain(data.href, [...stop, data.href], max - 1, target, count + 1);
        } else {
            console.log("maximum iterations reached!");
        }
    });
}



const args = process.argv.slice(2);


let start = "https://en.wikipedia.org/wiki/Special:Random"
if (0 < args.length && args[0] !== "random") {
    start = args[0];
}

let n = 50;
if (1 < args.length) {
    n = parseInt(args[1]);
}

let target = "https://en.wikipedia.org/wiki/Philosophy"
if (2 < args.length) {
    target = args[2];
}

console.log("start url:", start);
console.log("max iterations:", n);
console.log("target url:", target);
console.log("target lpc:", lastPathComponent(target));
linkChain(start, [], n, target, 0);