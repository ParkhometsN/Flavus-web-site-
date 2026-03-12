import { checkVpnUsage } from "./modules/checkProxy.js";
import { faqquestion } from "./modules/faq_question.js";
import { GetFooter } from "./modules/footer.js";
import { GetHeader } from "./modules/header.js";
import { loadStaffData } from "./modules/load_list_barbers.js";
import { tgl } from "./modules/togle.js";

document.addEventListener("DOMContentLoaded", () => {
    try {
        GetHeader();
        GetFooter();
        checkVpnUsage();
        tgl();
        faqquestion();
        loadStaffData();
    } catch (error) {
        console.error(error);
    }
    

}

);