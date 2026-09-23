import { useId } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { translations } from "../i18n/translations";
import { changeLocale } from "../utils/translate";
import { BackButton } from "../components/back-button";

const themeOptions = [
  { value: "default", label: "Default" },
  { value: "night-time", label: "Night-time" },
  { value: "protanopia-friendly", label: "Protanopia-Friendly" },
  { value: "deuteranopia-friendly", label: "Deuteranopia-Friendly" },
  { value: "tritanopia-friendly", label: "Tritanopia-Friendly" },
  { value: "high-contrast", label: "High contrast" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "french", label: "French" },
  { value: "afrikaans", label: "Afrikaans" },
  { value: "dutch", label: "Dutch" },
];

export default function Settings() {
	[ select, selectedValue ] = useState("english");
	
	const themeId = useId();
	const languageId = useId();
	
	const languageSelect;

	const handleSelectChange = (event) => {
		let value = event.target.value;
		setSelectedValue(value);
		languageSelect = selectedValue;
	};

	return (
	<main
	  id="main-content"
	  tabIndex={-1}
	  className="mx-auto w-full max-w-lg px-4 py-8 outline-none sm:px-6"
	>

		<BackButton />

		<header className="mb-8">
			<h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
			  Settings {}
			</h1>
			<p className="mt-2 text-base leading-6 text-ink-muted">
			  Customize your experience to suit your needs.
			</p>
		</header>

		<div className="space-y-6">
			<section
			  aria-labelledby={`${themeId}-heading`}
			  className="rounded-lg border border-border bg-surface p-5"
			>
			  <h2
				id={`${themeId}-heading`}
				className="font-display text-xl font-semibold text-ink"
			  >
				Appearance
			  </h2>

			  <div className="mt-4">
				<label
				  htmlFor={themeId}
				  className="block text-sm font-semibold text-ink"
				>
				  Theme Options
				</label>

				<select
				  id={themeId}
				  name="theme"
				  defaultValue="default"
				  className="mt-2 block min-h-12 w-full appearance-none rounded-md border border-border bg-surface px-4 py-3 text-base text-ink shadow-sm outline-none transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
				>
				  {themeOptions.map((option) => (
					<option key={option.value} value={option.value}>
					  {option.label}
					</option>
				  ))}
				</select>
			  </div>
		</section>

		<section
		  aria-labelledby={`${languageId}-heading`}
		  className="rounded-lg border border-border bg-surface p-5"
		>
			<h2
			id={`${languageId}-heading`}
			className="font-display text-xl font-semibold text-ink"
			>
			Language
			</h2>

			<div className="mt-4">
				<label
				  htmlFor={languageId}
				  className="block text-sm font-semibold text-ink"
				>
				  Change Interface Language
				</label>

				<select
				  id={languageId}
				  name="language"
				  defaultValue="english"
				  className="mt-2 block min-h-12 w-full appearance-none rounded-md border border-border bg-surface px-4 py-3 text-base text-ink shadow-sm outline-none transition focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
				>
				  {languageOptions.map((option) => (
					<option key={option.value} value={option.value}>
					  {option.label}
					</option>
				  ))}
				</select>
			</div>
		</section>
		</div>
	</main>
	);
}
