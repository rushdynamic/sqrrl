import { ProxyState } from "./types";

const getProxyHandler = (changed: ProxyState.Changed) => {
    return {
        get(target: any, key: any) {
            if (typeof target[key] === "object" && target[key] !== null) {
                return new Proxy(target[key], getProxyHandler(changed));
            } else {
                return target[key];
            }
        },
        set(target: any, prop: string, value: any) {
            if (target[prop] !== value) {
                changed.status = true;
            }
            target[prop] = value;
            return true;
        }
    };
};

const getProxyWithStatus: ProxyState.GetProxyWithStatus = (state) => {
    let changed: ProxyState.Changed = { status: false };
    return {
        proxyState: new Proxy(state as object, getProxyHandler(changed)),
        changed: changed
    };
};

export default getProxyWithStatus;
