export const loadState = (key) => {
    try {
        const serializedState = localStorage.getItem(key);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (err) {
        return undefined;
    }
};

export const saveState = (key, value) => {
    try {
        const serializedState = JSON.stringify(value);
        localStorage.setItem(key, serializedState);
    }
    catch (err) {
        // log it later
    }
};

export const clearState = () => {
    try {
        localStorage.clear();
    }
    catch (err) {
        // log it later
    }
};
