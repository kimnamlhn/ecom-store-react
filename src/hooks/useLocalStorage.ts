import { useState } from "react";

const useLocalStorage = (key: string, defaultValue: any) => {
    const [localStorageValue, setLocalStorageValue] = useState(() => {
        try {
            const value = localStorage.getItem(key);

            //get value
            if (value) {
                return JSON.parse(value);
            }
            //if it does not exist, then add to local storage 
            else {
                localStorage.setItem(key, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (error) {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
        setLocalStorageValue(value);
    };

    return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;