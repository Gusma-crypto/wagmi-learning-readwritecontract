import React, { useState } from "react";
import { useTransfer } from "../hooks/useTransfer";

export function TransferButton() {
  const [to, setTo] = useState("");
  const [amountStr, setAmountStr] = useState("");

  // Konversi ke bigint wei, validasi sederhana agar tidak error
  const amount = (() => {
    try {
      return BigInt(Math.floor(Number(amountStr) * 1e18));
      
    } catch {
      return 0n;
    }
  })();

  const { isConnected, transfer, isPending, isSuccess, isError, error } =
    useTransfer(to, amount);

  if (!isConnected) return <p>Please connect your wallet first.</p>;

  return (
    <div style={{ maxWidth: 400 }}>
      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <input
        type="number"
        placeholder="Amount in ETH"
        step="0.0001"
        value={amountStr}
        onChange={(e) => setAmountStr(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 8 }}
      />
      <button
        onClick={transfer}
        disabled={isPending || !to || amount === 0n}
        style={{
          padding: 12,
          width: "100%",
          backgroundColor: isPending ? "#888" : "#4d7cff",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: isPending ? "not-allowed" : "pointer",
        }}
      >
        {isPending ? "Transferring..." : "Transfer"}
      </button>
      {isSuccess && <p style={{ color: "green" }}>Transfer success!</p>}
      {isError && <p style={{ color: "red" }}>{error?.message}</p>}
    </div>
  );
}
