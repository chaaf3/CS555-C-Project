import { useState, useEffect } from "react";
import { Paper } from "@mui/material";
import Link from "next/link";

function EnergyBill() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const energyBill = {
        balance: 1000,
        energyUsed: 100,
        date: new Date(),
        notes: "Notes...",
      };
      setData(energyBill);
      setLoading(false);
    }
    fetch();
  }, []);

  if (loading) return <p>Loading...</p>;
  else
    return (
      <div>
        <header>Energy Bill</header>
        <nav class="nav-bar">
          <Link
            href="Auth"
            class="page-link"
          >
            Home
          </Link>
          <Link
            href="Calendar"
            class="page-link"
          >
            Calendar
          </Link>
          <Link
            href="EnergyBill"
            class="page-link"
          >
            Billing
          </Link>
          <Link
            href="ImageHandler"
            class="page-link"
          >
            Upload Image
          </Link>
        </nav>  
        <Paper elevation={3} sx={{ width: "50%", textAlign: "center" }}>
          <h3>Bill Details:</h3>
          <p>Balance: ${data.balance}</p>
          <p>Energy Used: {data.energyUsed}</p>
          <p>Date: {data.date.toString()}</p>
          <p>Notes: {data.notes}</p>
        </Paper>
      </div>
    );
}

export default EnergyBill;
