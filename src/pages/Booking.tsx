import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { submitBooking, isClinicOpenNow } from "../api/booking";
import { useTicket } from "../context/TicketContext";
import { BackButton } from "../components/back-button";

interface FormErrors {
  fullName?: string;
  condition?: string;
}

export default function Booking() {
  const navigate = useNavigate();
  const { setTicketStatus } = useTicket();

  const [fullName, setFullName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [condition, setCondition] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clinicOpen = isClinicOpenNow();

  function validate(): FormErrors {
    const next: FormErrors = {};
    if (!fullName.trim()) {
      next.fullName = "Enter your full name.";
    }
    if (!condition.trim()) {
      next.condition = "Describe the reason for your visit.";
    }
    return next;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const ticket = await submitBooking({
        fullName: fullName.trim(),
        patientId: patientId.trim() || undefined,
        condition: condition.trim(),
      });
      setTicketStatus(ticket);
      navigate("/");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!clinicOpen) {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto min-h-screen max-w-[480px] bg-bg px-4 pb-12 pt-6 font-body text-ink outline-none sm:max-w-[640px] sm:pt-8"
      >
        <div className="rounded-lg border border-border bg-surface p-6" role="alert">
          <h1 className="mb-2 font-display text-2xl font-semibold">
            The clinic is closed
          </h1>
          <p className="text-[15px] text-ink-muted">
            Bookings aren't available right now. Please check back during
            operating hours.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="mx-auto min-h-screen max-w-[480px] bg-bg px-4 pb-12 pt-6 font-body text-ink outline-none sm:max-w-[640px] sm:pt-8"
    >
		 
		<BackButton />
		 
		<header className="mb-6">
			<h1 className="mb-6 text-3xl font-semibold uppercase tracking-wide text-ink-muted">
			  Book an appointment
			</h1>
			<p className="font-display text-[20px] font-semibold text-ink">
			  Your details
			</p>
		</header>

		<form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
			<div className="flex flex-col gap-1.5">
				<label htmlFor="fullName" className="text-[15px] font-semibold">
				Full name
				</label>
				<input
				id="fullName"
				name="fullName"
				type="text"
				autoComplete="name"
				maxLength={50}
				value={fullName}
				onChange={(e) => setFullName(e.target.value)}
				aria-invalid={Boolean(errors.fullName)}
				aria-describedby={errors.fullName ? "fullName-error" : undefined}
				className="rounded-md border border-border bg-surface px-3 py-2.5 text-[15px] text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
				/>
				{errors.fullName && (
				<p id="fullName-error" role="alert" className="text-[13px] text-danger">
				  {errors.fullName}
				</p>
				)}
			</div>

			<div className="flex flex-col gap-1.5">
				<label htmlFor="patientId" className="text-[15px] font-semibold">
				Patient ID <span className="font-normal text-ink-muted">(optional)</span>
				</label>
				<input
				id="patientId"
				name="patientId"
				type="text"
				maxLength={50}
				value={patientId}
				onChange={(e) => setPatientId(e.target.value)}
				className="rounded-md border border-border bg-surface px-3 py-2.5 text-[15px] text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
				/>
			</div>

			<div className="flex flex-col gap-1.5">
				<label htmlFor="condition" className="text-[15px] font-semibold">
				Reason for your visit
				</label>
				<p id="condition-hint" className="text-[13px] text-ink-muted">
				Briefly describe how you're feeling. If this is a medical
				emergency, don't use this form — call your local emergency
				number instead.
				</p>
				<textarea
				id="condition"
				name="condition"
				rows={4}
				maxLength={500}
				value={condition}
				onChange={(e) => setCondition(e.target.value)}
				aria-invalid={Boolean(errors.condition)}
				aria-describedby={
				  errors.condition ? "condition-hint condition-error" : "condition-hint"
				}
				className="resize-none rounded-md border border-border bg-surface px-3 py-2.5 text-[15px] text-ink focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
				/>
				{errors.condition && (
				<p id="condition-error" role="alert" className="text-[13px] text-danger">
				  {errors.condition}
				</p>
				)}
			</div>

			<button
			  type="submit"
			  disabled={isSubmitting}
			  aria-busy={isSubmitting}
			  className="mt-2 rounded-md bg-primary px-4 py-3 text-[15px] font-semibold text-white motion-safe:transition-colors motion-safe:duration-150 hover:bg-primary-hover focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-60"
			>
			  {isSubmitting ? "Getting your ticket…" : "Get my ticket"}
			</button>
		</form>
    </main>
  );
}
