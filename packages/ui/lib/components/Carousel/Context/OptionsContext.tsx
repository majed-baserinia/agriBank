import { createContext } from "react";
import type { GlideOptions } from "$components/Carousel/options";

export const OptionsContext = createContext<GlideOptions | null>(null);
export default OptionsContext;
