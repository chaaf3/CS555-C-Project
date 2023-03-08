import './App.css';
import Calendar from './Calendar.js';

function App() {
  return (

    <div className="App">
      <div class="topnav">
        <a href="home">Home</a>
        <a href="appointment">Appointment</a>
        <a href="contact-us">Contact Us</a>
      </div>

      <div class="header">
        Reserve an Appointment
      </div>

      <div class="content">
        Appointment Date & Time:
        <Calendar/>
      </div>
    </div>
  );
}

export default App;
