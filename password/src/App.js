import "./App.css";
import Calendar from "./Calendar.js";
import Project from "./components/Project.js";

function App() {
  return (
    <div className="App">
      <div className="topnav">
        <a href="home">Home</a>
        <a href="appointment">Appointment</a>
        <a href="contact-us">Contact Us</a>
      </div>

      <div className="header">Reserve an Appointment</div>

      <div className="content">
        Appointment Date & Time:
        <Calendar />
        <Project />
      </div>
    </div>
  );
}

export default App;
