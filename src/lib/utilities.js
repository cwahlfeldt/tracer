const { round, abs, random } = Math;

export function roundCubeCoords(qq, rr, ss) {
    let q = round(qq);
    let r = round(rr);
    let s = round(ss);

    const qDiff = abs(q - qq);
    const rDiff = abs(r - rr);
    const sDiff = abs(s - ss);

    if (qDiff > rDiff && qDiff > sDiff) {
        q = -r - s;
    } else if (rDiff > sDiff) {
        r = -q - s;
    } else {
        s = -q - r;
    }

    if (q === -0) q = 0;
    if (r === -0) r = 0;
    if (s === -0) s = 0;

    return { q, r, s };
}

export function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

export function randNum(min, max) {
    return round(random() * (max - min) + min);
}

export function deepEqual(objA, objB) {
    const ok = Object.keys,
        typeOfObjA = typeof objA,
        typeOfObjB = typeof objB;
    return objA && objB && typeOfObjA === 'object' && typeOfObjA === typeOfObjB
        ? ok(objA).length === ok(objB).length &&
              ok(objA).every((key) => deepEqual(objA[key], objB[key]))
        : objA === objB;
}

export function throwError(msg) {
    console.error(msg);
    throw msg;
}

export function rafInterval(fn, delay, leading) {
    let start = Date.now();
    const idWrapper = {};
    const loop = () => {
        idWrapper.id = requestAnimationFrame(loop);
        const delta = Date.now() - start;
        if (delta >= delay) {
            fn();
            start = Date.now();
        }
    };

    idWrapper.id = requestAnimationFrame(loop);

    // First time, if leading, call before any delay
    if (leading) {
        fn();
    }

    // idWrapper is an object with mutable id property.
    return idWrapper;
}

export const pipe =
    (...fns) =>
    (x) =>
        fns.reduce((v, f) => f(v), x);
