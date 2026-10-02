import type { TicketStatus } from "../types/ticket";

export interface BookingSubmission {
  fullName: string;
  patientId?: string;
  condition: string;
}

const CLINIC_OPEN_HOUR = 8; // 08:00
const CLINIC_CLOSE_HOUR = 17; // 17:00

/**
 * STUB — client-side convenience check only, for demo purposes while
 * there's no backend yet. This is NOT enforcement: client clocks can be
 * wrong or spoofed, so the real Booking API must re-check clinic hours
 * server-side before issuing a ticket, per the "clinic closed" acceptance
 * test.
 */
export function isClinicOpenNow(): boolean {
  const hour = new Date().getHours();
  return hour >= CLINIC_OPEN_HOUR && hour < CLINIC_CLOSE_HOUR;
}

/**
 * STUB — simulates the real Booking API from the technical spec. Replace
 * the body with a real fetch() to the FastAPI backend once it exists.
 * The real endpoint owns: server-side clinic-hours validation, atomic
 * ticket assignment inside the 300ms budget, and queue-position lookup
 * from the Queue Store. This stub's ~150ms delay is NOT a stand-in for
 * that SLA — the real timing can only be verified against the real API.
 */
export async function submitBooking(
  submission: BookingSubmission
): Promise<TicketStatus> {
  await new Promise((resolve) => setTimeout(resolve, 150));

  const ticketNumber = `A${Math.floor(100 + Math.random() * 900)}`;
  const position = Math.floor(Math.random() * 4); // 0–3, demo only

  if (position === 0) {
    return { state: "next", ticketNumber };
  }

  return {
    state: "queued",
    ticketNumber,
    position,
    estimatedWaitMinutes: position * 5,
  };
}
