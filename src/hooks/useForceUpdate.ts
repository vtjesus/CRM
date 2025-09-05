import { useReducer } from "react";

export function useForceUpdate() {
    const [, dispatch] = useReducer((runCount) => runCount + 1, 1);
    return dispatch;
}
