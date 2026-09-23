import { createContext, useContext, useState, type ReactNode } from "react";
import type { TicketStatus } from "../types/ticket";

interface TicketContextValue {
  ticketStatus: TicketStatus;
  setTicketStatus: (status: TicketStatus) => void;
}

const TicketContext = createContext<TicketContextValue | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [ticketStatus, setTicketStatus] = useState<TicketStatus>({ state: "none" });

  return (
    <TicketContext.Provider value={{ ticketStatus, setTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
}
