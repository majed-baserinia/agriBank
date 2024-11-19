import type { GlideOptions } from "$components/Carousel/options";

import { createContext } from "react";

export const OptionsContext = createContext<GlideOptions | null>(null);
