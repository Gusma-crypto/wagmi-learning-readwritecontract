import React, { useState } from "react";
import {
  useAccount,
  useDisconnect,
  useConnect,
  useBalance,
  useSignMessage,
} from "wagmi";
import { injected } from "wagmi/connectors";
import { TransferButton } from "./TransferButton";

function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const injectedConnector = connectors.find((c) => c.id === "injected");
  const { disconnect } = useDisconnect();

  const { data: balanceData, isLoading: balanceLoading } = useBalance({
    address: isConnected ? address : undefined,
  });

  const [signature, setSignature] = useState<string>("");

  const { signMessage, isPending: isSigning, error: signError } = useSignMessage({
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
            Balance Sepolia Eth: {balanceData?.formatted} {balanceData?.symbol}
          </p>

          <button
            onClick={() => {
              setSignature("");
              disconnect();
            }}
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

          {/* Jika belum sign, tampilkan tombol sign */}
          {!signature ? (
            <>
              <strong>Belum sign</strong>
              <button
                onClick={() => signMessage({message:"Please sign to continue using the dapp!!"})}
                disabled={isSigning}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  cursor: "pointer",
                  background: "#198754",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  marginTop: 10,
                }}
              >
                {isSigning ? "Waiting for signature..." : "Sign Message"}
              </button>
              {signError && (
                <div style={{ marginTop: 10, color: "red" }}>
                  Error signing message: {signError.message}
                </div>
              )}
            </>
          ) : (
            <>
              <strong>Signature diterima</strong>
              <div style={{ marginTop: 10, wordBreak: "break-word" }}>
                {signature}
              </div>

              {/* Tampilkan form transfer setelah sign berhasil */}
              <div style={{ marginTop: 20 }}>
                <TransferButton />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
