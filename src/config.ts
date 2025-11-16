
import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi";

export const config = createConfig({
    chains:[sepolia],
    connectors:[injected()],
    transports:{
        [sepolia.id]:http()
    }
})

