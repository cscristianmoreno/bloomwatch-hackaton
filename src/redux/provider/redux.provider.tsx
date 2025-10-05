
import { Provider } from "react-redux";
import { store } from "../store/redux.store";
import type { FC, ReactElement, ReactNode } from "react";

const ReduxProvider: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }): ReactElement => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;