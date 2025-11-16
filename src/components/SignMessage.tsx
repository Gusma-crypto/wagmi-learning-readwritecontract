import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export default function SignMessage(){
    const {address, isConnected} = useAccount();
    const [signature, setSignature] = useState<string>("");
    const { signMessage, data, isPending, error } = useSignMessage({
        mutation: {
            onSuccess(signature) {
            setSignature(signature)
        }
        }
    });

    if(!isConnected) return <div>Please connect wallet first.</div>
    
    return(
        <div style={{marginTop:"20px"}}>
            <h3>Connected:{address}</h3>
            <button onClick={()=>signMessage({ message: "Please sign to continue using the dapp"})} disabled={isPending}>
                {isPending ? "Signing..." : "Sign Message"}
            </button>

            {/* jika kondisi assign terpenuhi maka tampilkan signature */}
            {signature && (
                <div>
                <p>Signature:</p>
                <textarea
                    style={{ width: "100%", height: "80px" }}
                    value={signature}
                    readOnly
                />
                </div>
            )}
            {/* jika erorr terpenuhi akan mengirimkan message error */}
            {error && <p>Error: {error.message}</p>}
        </div>
    )

}