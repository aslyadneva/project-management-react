import { createFileRoute } from "@tanstack/react-router";
// import logo from '../logo.svg'

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        Index route
      </div>
    </div>
  );
}
