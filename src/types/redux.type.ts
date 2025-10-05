import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { store } from "../redux/store/redux.store";

export type RootState = ReturnType<typeof store.getState>; 

export type MutationResultTypeStruct = {
    requestId?: undefined;
    status: QueryStatus.uninitialized;
    data?: undefined;
    error?: undefined;
    endpointName?: string;
    startedTimeStamp?: undefined;
    fulfilledTimeStamp?: undefined;
};