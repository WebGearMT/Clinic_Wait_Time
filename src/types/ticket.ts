/**
 * Ticket/queue status, as it will eventually come from the Booking API /
 * Queue Store. "next" is a distinct state from "queued" specifically so
 * the UI never has to render a literal "0" for wait time or position —
 * see the acceptance test: zero wait time should read "you're next,"
 * not a number that could look broken.
 */
export type TicketStatus =
  | { state: "none" }
  | {
      state: "queued";
      ticketNumber: string;
      position: number;
      estimatedWaitMinutes: number;
    }
  | { state: "next"; ticketNumber: string };
