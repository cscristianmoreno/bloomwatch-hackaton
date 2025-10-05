import type { Dispatch, SetStateAction } from "react";
import type { SiteTypeStruct } from "./sites.type";
import type { InfoTypestruct } from "./info.type";

export type PopupTypeStruct = {
    site: SiteTypeStruct,
    index: number, 
    setInfo: Dispatch<SetStateAction<InfoTypestruct>>
};