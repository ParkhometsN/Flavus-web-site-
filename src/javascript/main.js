import { checkVpnUsage } from "./modules/checkProxy.js";
import { GetFooter } from "./modules/footer.js";
import { GetHeader } from "./modules/header.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        GetHeader();
        GetFooter();
        checkVpnUsage();
    } catch (error) {
        console.error(error);
    }
    

}

);