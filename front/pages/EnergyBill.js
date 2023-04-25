import { useState, useEffect } from "react";
import { Paper } from "@mui/material";

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
      <Paper elevation={3} sx={{ width: "50%", textAlign: "center" }}>
        <h3>Energy Bill Details:</h3>
        <p>Balance: ${data.balance}</p>
        <p>Energy Used: {data.energyUsed}</p>
        <p>Date: {data.date.toString()}</p>
        <p>Notes: {data.notes}</p>
      </Paper>
    );
}

export default EnergyBill;
