import type { Value } from "react-multi-date-picker";

import { InputAdapter } from "$components/InputAdapter";
import { useEffect, useRef, useState } from "react";
import { default as persian, default as persian_ca } from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import { useTranslation } from "react-i18next";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import "react-multi-date-picker/styles/backgrounds/bg-brown.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/backgrounds/bg-gray.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/layouts/prime.css";

import "./styles.css";

import { modifiedPersianFa } from "./modified-persian-locals";
import type { Props } from "./types";

export function DatePickerAdapter({ label, helperText, onChange, error, defaultValue, sx }: Props) {
	const { t, i18n } = useTranslation("base");

	const [value, setValue] = useState<Value>();
	const datepicker = useRef(null);

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleInputChange = (val: string) => {
		const digits = val.replace(/\D/g, "").slice(0, 8);

		let formatted = "";
		for (let i = 0; i < digits.length; i++) {
			formatted += digits[i];
			if (i === 3 || i === 5) formatted += "/";
		}

		setValue(formatted);
		onChange?.(formatted);
	};

	const handleDatePickerChange = (date: Value) => {
		const val =
			i18n.language === "fa-IR"
				? new DateObject(date! as string).convert(persian, persian_en).format()
				: new DateObject(date! as string).format();
		handleSyncValue(val);
	};

	const handleSyncValue = (val: string) => {
		setValue(val);
		onChange?.(val);
	};

	return (
		<InputAdapter
			defaultValue={value as string}
			endIcon={
				<DatePicker
					calendar={i18n.language === "fa-IR" ? persian_ca : undefined}
					className="primary rmdp-mobile"
					format={"YYYY/MM/DD"}
					inputMode="numeric"
					locale={i18n.language === "fa-IR" ? modifiedPersianFa : undefined}
					monthYearSeparator=" "
					onChange={(value) => handleDatePickerChange(value)}
					ref={datepicker}
					render={<Icon />}
					value={value}
				/>
			}
			error={error}
			helperText={helperText}
			label={label ?? t("date")}
			onChange={handleInputChange}
			type="text"
			maxLength={10}
			sx={sx}
		/>
	);
}
