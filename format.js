const formatConstants = {
    start: [
        "",
        "Mi",
        "Bi",
        "Tr",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No"
    ],
    
    ones: [
        "",
        "Un",
        "Du",
        "Tr",
        "Qa",
        "Qi",
        "Sx",
        "Sp",
        "Oc",
        "No"
    ],
    
    tens: [
        "",
        "De",
        "Vi",
        "Tg",
        "Qd",
        "Qq",
        "Sg",
        "St",
        "Og",
        "Ng"
    ],

    hundreds: [
        "",
        "Ce"
    ]
};

function formatNumber(x) {
    const isNeg = x < 0;
    if (isNeg) x = Math.abs(x);

    if (x < 1e6) return x.toLocaleString("en-us");
    if (x > Number.MAX_VALUE) return "∞";

    const illIdx = Math.floor(Math.floor(Math.log10(x)) / 3) - 1;
    const str = `${isNeg ? "-" : ""}${(x / 10 ** (illIdx * 3 + 3)).toFixed(3)}`;

    if (illIdx < 10) return str + formatConstants.start[illIdx];

    return str + formatConstants.ones[illIdx % 10] + formatConstants.tens[Math.floor(illIdx / 10) % 10] + formatConstants.hundreds[Math.floor(illIdx / 100)];
}