import { i18next } from "@htsc/ignite";
import EN_TRANSLATION from "./locals/en/translation.json";
import FA_TRANSLATION from "./locals/fa/translation.json";

void i18next.addResourceBundle("en-GB", "translation", EN_TRANSLATION);
void i18next.addResourceBundle("fa-IR", "translation", FA_TRANSLATION);

//makes sure all the keys of Fa and En are the same
FA_TRANSLATION satisfies typeof EN_TRANSLATION;
EN_TRANSLATION satisfies typeof FA_TRANSLATION;
