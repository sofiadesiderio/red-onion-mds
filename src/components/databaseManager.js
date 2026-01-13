/* global globalThis */
const getUser = () => {
    const existingUser = sessionStorage.getItem('userId');
    if (existingUser) {
        return existingUser;
    } else {
        const newUser = 'user-' + Date.now();
        sessionStorage.setItem('userId', newUser);
        return newUser;
    }
};

const getDataKey = () => {
    const userId = getUser();
    return `emaJohn/carts/${userId}`;
};

const getDatabaseCart = () => {
    const dataKey = getDataKey();
    const data = localStorage.getItem(dataKey) || '{}';
    return JSON.parse(data);
};

const addToDatabaseCart = (key, count) => {
    const currentCart = getDatabaseCart();
    currentCart[key] = count;
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
};

const removeFromDatabaseCart = (key) => {
    const currentCart = getDatabaseCart();
    delete currentCart[key];
    localStorage.setItem(getDataKey(), JSON.stringify(currentCart));
};

const processOrder = (cart) => {
    localStorage.removeItem(getDataKey());
};

const clearCart = () => {
    localStorage.removeItem(getDataKey());
};

export {
    addToDatabaseCart,
    getDatabaseCart,
    removeFromDatabaseCart,
    processOrder,
    clearCart,
};

const localStorage =
    globalThis.localStorage ||
    (() => {
        let store = {};
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            clear() {
                store = {};
            },
        };
    })();

const sessionStorage =
    globalThis.sessionStorage ||
    (() => {
        let store = {};
        return {
            getItem(key) {
                return store[key];
            },
            setItem(key, value) {
                store[key] = value.toString();
            },
            clear() {
                store = {};
            },
        };
    })();
