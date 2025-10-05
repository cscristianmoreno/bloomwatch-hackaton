import type { Dispatch, SetStateAction } from "react"
import type { SiteTypeStruct } from "./sites.type";
import type { InfoTypestruct } from "./info.type";

export type SliderComponentTypeStruct = {
    site: SiteTypeStruct,
    setInfo: Dispatch<SetStateAction<InfoTypestruct>>,
    siteSelected: number
};