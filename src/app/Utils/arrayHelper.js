export const orderBy = (arr, keyPredicate, byDescending = false) => {
    const sorted = [...arr];
    sorted.sort((a, b) => byDescending
        ? keyPredicate(b) - keyPredicate(a)
        : keyPredicate(a) - keyPredicate(b)
    );
    return sorted;
};

export const partition = (arr, predicate) => {
    return arr.reduce((acc, elem, i) => {
        if (predicate(elem, i))
            acc[0].push(elem);
        else
            acc[1].push(elem);
        return acc;
    }, [[], []]);
};

export const sum = (arr, selector) => arr.reduce((acc, elem, i) => acc + selector(elem, i), 0);
