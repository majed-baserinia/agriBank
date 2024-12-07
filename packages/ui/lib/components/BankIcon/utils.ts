import type { HookProps } from "$lib/components/BankIcon/types";
import i18next from "i18next";
import { useEffect, useState } from "react";

export async function getBankIcon({ cardNumber }: HookProps) {
	switch (cardNumber) {
		case "636214":
			return {
				icon: (await import("$assets/icons/Banks/Color/Ayandeh.svg")).default,
				name: i18next.t("base:Ayandeh")
			};
		case "627381":
			return {
				icon: (await import("$assets/icons/Banks/Color/Ansar.svg")).default,
				name: i18next.t("base:Ansar")
			};
		case "505785":
			return {
				icon: (await import("$assets/icons/Banks/Color/Iran Zamin.svg")).default,
				name: i18next.t("base:IranZamin")
			};
		case "622106":
		case "627884":
		case "639194":
			return {
				icon: (await import("$assets/icons/Banks/Color/Parsian.svg")).default,
				name: i18next.t("base:Parsian")
			};
		case "502229":
		case "639347":
			return {
				icon: (await import("$assets/icons/Banks/Color/Pasargad.svg")).default,
				name: i18next.t("base:Pasargad")
			};
		case "627760":
			return {
				icon: (await import("$assets/icons/Banks/Color/Post.svg")).default,
				name: i18next.t("base:Post")
			};
		case "585983":
		case "627353":
			return {
				icon: (await import("$assets/icons/Banks/Color/Tejarat.svg")).default,
				name: i18next.t("base:Tejarat")
			};
		case "502908":
			return {
				icon: (await import("$assets/icons/Banks/Color/Tosee.svg")).default,
				name: i18next.t("base:Tosee")
			};
		case "504172":
			return {
				icon: (await import("$assets/icons/Banks/Color/Resalat.svg")).default,
				name: i18next.t("base:Resalat")
			};
		case "207177":
		case "627648":
			return {
				icon: (await import("$assets/icons/Banks/Color/Tosee Saderat.svg")).default,
				name: i18next.t("base:ToseeSaderat")
			};
		case "636949":
			return {
				icon: (await import("$assets/icons/Banks/Color/Hekmat.svg")).default,
				name: i18next.t("base:Hekmat")
			};
		case "585947":
			return {
				icon: (await import("$assets/icons/Banks/Color/Khavar Mianeh.svg")).default,
				name: i18next.t("base:KhavarMianeh")
			};
		case "627412":
			return {
				icon: (await import("$assets/icons/Banks/Color/Eghtesad Novin.svg")).default,
				name: i18next.t("base:EghtesadNovin")
			};
		case "502938":
			return {
				icon: (await import("$assets/icons/Banks/Color/Dey.svg")).default,
				name: i18next.t("base:Dey")
			};
		case "589463":
			return {
				icon: (await import("$assets/icons/Banks/Color/Refah.svg")).default,
				name: i18next.t("base:Refah")
			};
		case "621986":
			return {
				icon: (await import("$assets/icons/Banks/Color/Saman.svg")).default,
				name: i18next.t("base:Saman")
			};
		case "589210":
			return {
				icon: (await import("$assets/icons/Banks/Color/Sepah.svg")).default,
				name: i18next.t("base:Sepah")
			};
		case "639607":
			return {
				icon: (await import("$assets/icons/Banks/Color/Sarmayeh.svg")).default,
				name: i18next.t("base:Sarmayeh")
			};
		case "639346":
			return {
				icon: (await import("$assets/icons/Banks/Color/Sina.svg")).default,
				name: i18next.t("base:Sina")
			};
		case "504706":
		case "502806":
			return {
				icon: (await import("$assets/icons/Banks/Color/Shahr.svg")).default,
				name: i18next.t("base:Shahr")
			};
		case "603769":
			return {
				icon: (await import("$assets/icons/Banks/Color/Saderat.svg")).default,
				name: i18next.t("base:Saderat")
			};
		case "627961":
			return {
				icon: (await import("$assets/icons/Banks/Color/Sanat Madan.svg")).default,
				name: i18next.t("base:SanatMadan")
			};
		case "627488":
		case "502910":
			return {
				icon: (await import("$assets/icons/Banks/Color/Karafarin.svg")).default,
				name: i18next.t("base:KarAfarin")
			};
		case "639217":
		case "603770":
			return {
				icon: (await import("$assets/icons/Banks/Color/Keshavarzi.svg")).default,
				name: i18next.t("base:Keshavarzi")
			};
		case "505416":
			return {
				icon: (await import("$assets/icons/Banks/Color/Gardeshgari.svg")).default,
				name: i18next.t("base:Gardeshgari")
			};
		case "636795":
			return {
				icon: (await import("$assets/icons/Banks/Color/Bank Markazi.svg")).default,
				name: i18next.t("base:BankMarkazi")
			};
		case "628023":
			return {
				icon: (await import("$assets/icons/Banks/Color/Maskan.svg")).default,
				name: i18next.t("base:Maskan")
			};
		case "991975":
		case "610433":
			return {
				icon: (await import("$assets/icons/Banks/Color/Mellat.svg")).default,
				name: i18next.t("base:Mellat")
			};
		case "603799":
			return {
				icon: (await import("$assets/icons/Banks/Color/Melli.svg")).default,
				name: i18next.t("base:Melli")
			};
		case "606373":
			return {
				icon: (await import("$assets/icons/Banks/Color/Mehr Iran.svg")).default,
				name: i18next.t("base:MehrIran")
			};
		case "639370":
			return {
				icon: (await import("$assets/icons/Banks/Color/Mehr Eghtesad.svg")).default,
				name: i18next.t("base:MehrEghtesad")
			};
		case "505801":
			return {
				icon: (await import("$assets/icons/Banks/Color/Kosar.svg")).default,
				name: i18next.t("base:Kosar")
			};
		case "507677":
			return {
				icon: (await import("$assets/icons/Banks/Color/Noor.svg")).default,
				name: i18next.t("base:Noor")
			};
		default:
			return null;
	}
}

export function useBankIcon({ cardNumber }: HookProps) {
	const [icon, setIcon] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function inner() {
			setIcon((await getBankIcon({ cardNumber }))?.icon);
		}
		void inner();
	}, [cardNumber]);
	return icon;
}
