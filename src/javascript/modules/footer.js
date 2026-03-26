import { initYmapsWhenNeeded } from "./ymap-loader.js";

export function GetFooter(){
    const footerEl = document.getElementById("footer") ?? document.querySelector("footer");
    if (!footerEl) return;

    if (footerEl.dataset.footerInited === "1") {
        initYmapsWhenNeeded();
        return;
    }
    footerEl.dataset.footerInited = "1";

    footerEl.innerHTML = `

            <div class="right_map_footer">
                <div class="map">
                    <div class="map_stiles" id="map"></div>
                </div>
                <div class="conternt_footer">
                    <img src="./src/assests/img/footer/srcles.svg" alt="айдентика">
                    <center><div class="tinnfont">ONLY FOR MAN</div></center>
                    <div class="contentblokcfooter">
                        <div class="contacntblock">
                            <div class="titlefoter">
                                <h1>КОНТАКТЫ</h1>
                                <h1>]</h1>
                            </div>
                            <div class="adress">
                                <div class="adres_item">
                                    <h3>КОНТАКТЫ</h3>
                                    <ul>
                                        <li><a href="mailto:FLAVUS@GMAIL.COM"><h4>FLAVUS@GMAIL.COM</h4></a></li>
                                        <li><a href="tel:+79110998673"><h4>+7 (911) 099-86-73</h4></a></li>
                                    </ul>
                                </div>
                                <div class="adres_item">
                                    <h3>АДРЕСС</h3>
                                    <ul>
                                        <li><h4>Санкт-Петербург, <br> Ультрамариновая ул., 8</h4></li>
                                    </ul>
                                </div>
                                <div class="adres_item">
                                    <h3>СПРАВОЧНАЯ</h3>
                                    <ul>
                                        <li><h4>ОГРНИП 316774600521210</h4></li>
                                        <li><h4>ИНН 772072835461</h4></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="navigation_block">
                            <nav class="footer_nav">
                            
                                <li><a href="index.html"><h4>главная</h4></a></li>
                                <li><a href="index.html#services"><h4>услуги</h4></a></li>
                                <li><a href="index.html#about"><h4>о нас</h4></a></li>
                                <li><a href="#footer"><h4>контакты</h4></a></li>
                                <li><a href="education.html"><h4>академия</h4></a></li>
                                <li><a href="vacancy.html"><h4>вакансии</h4></a></li>
                                <li><a href="lookbook.html"><h4>lookbook</h4></a></li>
                            </nav>
                            <div class="links_list">
                                <a href="index.html"><h4>ВСЕ ПРАВА ЗАЩИЩЕНЫ</h4></a>
                                <a href="confidenc.html"><h4>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</h4></a>
                            </div>
                        </div>
                    </div>
                    <img class="footer_logo_xl" src="./src/assests/img/footer/logoflavusdk.webp" alt="ewfrgt">
                </div>
            </div>
        </div>
    `;

    initYmapsWhenNeeded();
}