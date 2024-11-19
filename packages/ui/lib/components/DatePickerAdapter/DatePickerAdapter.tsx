import type { Value } from "react-multi-date-picker";

import { InputAdapter } from "$components/InputAdapter";
import { useEffect, useRef, useState } from "react";
import { default as persian, default as persian_ca } from "react-date-object/calendars/persian";
import persian_en from "react-date-object/locales/persian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import { useTranslation } from "react-i18next";
import DatePicker, { DateObject } from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import "react-multi-date-picker/styles/backgrounds/bg-brown.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import "react-multi-date-picker/styles/backgrounds/bg-gray.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/layouts/prime.css";

import "./styles.css";

import type { Props } from "./types";

export function DatePickerAdapter(props: Props) {
	const { t, i18n } = useTranslation("base");

	const { label = t("date"), helperText, onChange, error, defaultValue } = props;
	const [value, setValue] = useState<Value>();
	const datepicker = useRef();

	useEffect(() => {
		if (defaultValue) {
			setValue(defaultValue);
		}
	}, [defaultValue]);

	const handleInputChange = (val: string) => {
		handleSyncValue(val);
	};

	const handleDatePickerChange = (date: Value) => {
		const val =
			i18n.language === "fa-IR"
				? new DateObject(date! as string).convert(persian, persian_en).format()
				: new DateObject(date! as string).format();
		//	setValue(date);
		handleSyncValue(val);
	};

	const handleSyncValue = (val: string) => {
		setValue(val);
		onChange(val);
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
					locale={i18n.language === "fa-IR" ? persian_fa : undefined}
					monthYearSeparator=" "
					onChange={(value) => handleDatePickerChange(value)}
					ref={datepicker}
					render={<Icon />}
					value={value}
				/>
			}
			error={error}
			helperText={helperText}
			label={label}
			onChange={handleInputChange}
			type="date"
		/>
	);
}

{
	/* <DatePicker
				ref={datepicker}
				render={
					<>
					</>
					// <div onClick={() => setOpen(true)} >sdfsdf</div>
				}
				calendar={appLanguage === 'fa-IR' ? persian_ca : undefined}
				locale={appLanguage === 'fa-IR' ? persian_fa : undefined}
				value={value}
				monthYearSeparator=" "
				inputMode="numeric"
				className="primary"
				style={{ width: '100%' }}
				// className="primary rmdp-mobile"

				inputClass={`${error ? 'error' : ''} datepickerInput`}
				hideOnScroll
				calendarPosition={'top-right'}
				placeholder={placeHolder}
				onChange={(value) => handleChange(value)}
				format={'YYYY/MM/DD'}
				onClose={() => setOpen(false)}
				onOpen={open ? () => true : () => false}
			/> */
}
{
	/* <FormHelperText
				error={error}
				sx={{
					paddingRight: settings.language === 'en-GB' ? '16px' : 'unset',
					paddingLeft: settings.language === 'fa-IR' ? '16px' : 'unset'
				}}
			>
				{helperText}
			</FormHelperText> */
}
