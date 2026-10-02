import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Settings from "./pages/Settings";

/**
 * Temporary stand-in for screens we haven't built yet. Not a real
 * component to build against — swap each Route's element for the
 * real page as we get to it (Booking, Wait Time, Settings).
 */
function ComingSoon({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-lg px-4 py-10 font-body text-ink">
      <h1 className="font-display text-2xl font-semibold">{title}</h1>
      <p className="mt-2 text-ink-muted">This screen hasn't been built yet.</p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/wait-time" element={<ComingSoon title="Wait time" />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
