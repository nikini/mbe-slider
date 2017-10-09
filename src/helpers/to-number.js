export default (x) => {
    let final = Number(x);
    if (isNaN(final) || !isFinite(final)) {
        final = 0;
    }
    return final;
};
