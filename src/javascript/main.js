import { checkVpnUsage } from "./modules/checkProxy.js";
import { GetFooter } from "./modules/footer.js";
import { GetHeader } from "./modules/header.js";
import { tgl } from "./modules/togle.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        GetHeader();
        GetFooter();
        checkVpnUsage();
        tgl();
    } catch (error) {
        console.error(error);
    }
    

}

);