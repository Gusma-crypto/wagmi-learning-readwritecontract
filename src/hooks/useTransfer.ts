import { useWriteContract, useAccount } from "wagmi";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../services/contract";

export function useTransfer(to: string, amount: bigint) {
  const { address: fromAddress, isConnected } = useAccount();

  const writeContract = useWriteContract();

  function transfer() {
    if (!isConnected || !writeContract.writeContract) return;

    writeContract.writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "transferTo",
      args: [to, amount],
    });
  }

  return {
    isConnected,
    transfer,
    isPending: writeContract.isPending,
    isSuccess: writeContract.isSuccess,
    isError: writeContract.isError,
    error: writeContract.error,
  };
}
