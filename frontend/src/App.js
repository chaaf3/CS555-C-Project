import logo from "./logo.svg";
import "./App.css";
import { Scheduler } from "@aldabil/react-scheduler";
import Calendar from "./Components/Calendar";
import Auth from "./Components/Auth";

const App = () => {
  return (
    <div>
      <h1>Schedule your appointments</h1>
      <Calendar />;
    </div>
  );
};

export default App;
