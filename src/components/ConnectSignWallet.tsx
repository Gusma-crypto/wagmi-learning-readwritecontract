import React, { useState } from "react";
import {
  useAccount,
  useDisconnect,
  useConnect,
  useBalance,
  useSignMessage,
} from "wagmi";
import { injected } from "wagmi/connectors";

import { ceksaldo } from "../services/ContractServices";

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const injectedConnector = connectors.find((c) => c.id === "injected");
  const { disconnect } = useDisconnect();

  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address: isConnected ? address : undefined,
  });

  const saldo = ceksaldo();

  // State untuk simpan signature dari signMessage
  const [signature, setSignature] = useState<string>("");

  // Wagmi signMessage hook
  const { signMessage, data, isPending, error } = useSignMessage({
    mutation:{
        onSuccess(data) {
        setSignature(data);
        },
        onError(error) {
        console.error(error);
        setSignature("");
        },
    }
   
  });

  if (balanceLoading) return <p>Loading balance...</p>;

  return (
    <div style={{ padding: 40 }}>
      <h2>Latihan Wagmi Connected Wallet + Sign Message</h2>
      {!isConnected ? (
        <button
          onClick={() => connect({ connector: injectedConnector! })}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            background: "#4d7cff",
            color: "white",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Connect MetaMask
        </button>
      ) : (
        <div>
          <p>Connected: {address}</p>
          <p>
            Balance Eth: {balanceData?.formatted} {balanceData?.symbol}
          </p>

          <button
            onClick={() => disconnect()}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              background: "#f31212ff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              marginBottom: 20,
            }}
          >
            Disconnect
          </button>

          <p>Alamat contract saat ini: {saldo}</p>

          {/* Sign Message Section */}
          <hr style={{ margin: "20px 0" }} />
          <button
            onClick={() => signMessage({message:"please sign to continue!!"})}
            disabled={isPending}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              background: "#198754",
              color: "white",
              border: "none",
              borderRadius: "8px",
            }}
          >
            {isPending ? "Waiting for signature..." : "Sign Message"}
          </button>

          {signature && (
            <div style={{ marginTop: 10, wordBreak: "break-all" }}>
              <strong>Signature:</strong> {signature}
            </div>
          )}

          {error && (
            <div style={{ marginTop: 10, color: "red" }}>
              Error signing message: {error.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
