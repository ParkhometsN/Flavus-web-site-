import { checkVpnUsage } from "./modules/checkProxy.js";
import { GetHeader } from "./modules/header.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        GetHeader();
        checkVpnUsage();
    } catch (error) {
        console.error(error);
    }
    

}

);