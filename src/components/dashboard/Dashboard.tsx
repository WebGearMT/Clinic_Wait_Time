import { Link } from "react-router-dom";
import type { TicketStatus } from "../../types/ticket";
import { useTicket } from "../../context/TicketContext";

export interface DashboardProps {
  /** Patient's display name for the greeting. Falls back to a neutral greeting if omitted. */
  patientName?: string;
}

function StatusCard({ ticketStatus }: { ticketStatus: TicketStatus }) {
  if (ticketStatus.state === "none") {
    return (
      <div
        className="rounded-lg border border-dashed border-border bg-surface p-6"
        role="status"
      >
        <p className="mb-2 text-[13px] font-semibold tracking-wide text-ink-muted">
          No active ticket
        </p>
        <p className="text-[15px] text-ink-muted">
          Book an appointment to get your place in line.
        </p>
      </div>
    );
  }

  if (ticketStatus.state === "next") {
    return (
      <div
        className="rounded-lg border border-primary bg-primary p-6"
        role="status"
        aria-live="polite"
      >
        <p className="mb-2 text-[13px] font-semibold tracking-wide text-white/85">
          Ticket {ticketStatus.ticketNumber}
        </p>
        <p className="mb-2 font-display text-3xl font-semibold text-white">
          You're next
        </p>
        <p className="text-[15px] text-white/85">
          Please head inside when you're called.
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border border-border bg-surface p-6"
      role="status"
      aria-live="polite"
    >
      <p className="mb-2 text-[13px] font-semibold tracking-wide text-ink-muted">
        Ticket {ticketStatus.ticketNumber}
      </p>
      <p className="mb-2 flex items-baseline gap-2 font-display">
        <span className="text-4xl leading-none tabular-nums">
          {ticketStatus.position}
        </span>
        <span className="font-body text-base text-ink-muted">
          {ticketStatus.position === 1 ? "person ahead of you" : "people ahead of you"}
        </span>
      </p>
      <p className="text-[15px] text-ink-muted">
        About {ticketStatus.estimatedWaitMinutes}{" "}
        {ticketStatus.estimatedWaitMinutes === 1 ? "minute" : "minutes"} until it's
        your turn.
      </p>
    </div>
  );
}

const actions: Array<{
  to: string;
  label: string;
  description: string;
  icon: React.ReactNode;
}> = [
  {
    to: "/booking",
    label: "Book an appointment",
    description: "Get a ticket and hold your place in line.",
    icon: <CalendarIcon />,
  },
  {
    to: "/wait-time",
    label: "Check wait time",
    description: "See your position and estimated wait.",
    icon: <ClockIcon />,
  },
  {
    to: "/settings",
    label: "Settings",
    description: "Language and notification preferences.",
    icon: <GearIcon />,
  },
];

export default function Dashboard({ patientName }: DashboardProps) {
  const { ticketStatus } = useTicket();

  return (
    <main className="mx-auto min-h-screen max-w-[480px] bg-bg px-4 pb-12 pt-6 font-body text-ink sm:max-w-[640px] sm:pt-8">
      <header className="mb-6">
        <p className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-ink-muted">
          Clinic Dashboard
        </p>
        <h1 className="font-display text-3xl font-semibold text-ink">
          {patientName ? `Hi, ${patientName}` : "Welcome"}
        </h1>
      </header>

      <section aria-label="Your ticket status" className="mb-8">
        <StatusCard ticketStatus={ticketStatus} />
      </section>

      <nav aria-label="Dashboard actions">
        <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-3">
          {actions.map((action) => (
            <li key={action.to}>
              <Link
                to={action.to}
                className="flex min-h-16 w-full items-center gap-3 rounded-md border border-border bg-surface p-4 text-left text-ink motion-safe:transition-colors motion-safe:duration-150 hover:border-primary hover:bg-bg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                <span className="shrink-0 text-primary" aria-hidden="true">
                  {action.icon}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold">{action.label}</span>
                  <span className="text-[13px] text-ink-muted">
                    {action.description}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
    >
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 13.5a7.97 7.97 0 000-3l1.7-1.3-2-3.4-2 .6a8 8 0 00-2.6-1.5L14 2h-4l-.5 2.4a8 8 0 00-2.6 1.5l-2-.6-2 3.4L4.6 10.5a7.97 7.97 0 000 3L2.9 14.8l2 3.4 2-.6a8 8 0 002.6 1.5L10 22h4l.5-2.4a8 8 0 002.6-1.5l2 .6 2-3.4-1.7-1.3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
