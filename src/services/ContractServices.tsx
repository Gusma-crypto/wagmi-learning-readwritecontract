import { useAccount, useReadContract, useSignMessage } from "wagmi";
import abi from "../contracts/vaultvoting.json"
import {CONTRACT} from "../contracts/contract"


export function ceksaldo(){
    return CONTRACT;
}