export function GetHeader (){
    const header = document.querySelector('.header_container')
    const htmlHeader = `
            <div class="main_header_positon">
                <div class="headerfix">
                    <div  class="header-container stroke_main">
                        <div class="header-content">
                            <nav class="navigation">
                                <li><a href="index.html"><h4>Главная</h4></a></li>
                                <li><a href="index.html#services"><h4>Услуги</h4></a></li>
                                <li><a href="index.html#about"><h4>О нас</h4></a></li>
                                <li><a href="#footer"><h4>Контакты</h4></a></li>
                            </nav>
                            <a  href="index.html" class="logo"><img src="/src/assests/img/main_logo.jpg" alt="логотип барбершопа Flavus"></a>
                            <nav class="navigation">
                                <li><a href="education.html"><h4>Академия</h4></a></li>
                                <li><a href="vacancy.html"><h4>Вакансии</h4></a></li>
                                <li><a href="lookbook.html"><h4>Lookbook</h4></a></li>
                            </nav>
                            <div class="burgerbutton">
                                <input class="burgerclose" type="checkbox" id="checkbox">
                                <label for="checkbox" class="toggle">
                                    <div class="bars" id="bar1"></div>
                                    <div class="bars" id="bar2"></div>
                                    <div class="bars" id="bar3"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mobilefix">
                    <div class="header_mobile stroke_main">
                        <nav class="mobile">
                            <li><a href="index.html"><h4>Главная</h4></a></li>
                            <li><a href="index.html#services"><h4>Услуги</h4></a></li>
                            <li><a href="index.html#about"><h4>О нас</h4></a></li>
                            <li><a href="#footer"><h4>Контакты</h4></a></li>
                            <li><a href="education.html"><h4>Академия</h4></a></li>
                            <li><a href="vacancy.html"><h4>Вакансии</h4></a></li>
                            <li><a href="lookbook.html"><h4>Lookbook</h4></a></li>
                        </nav>
                    </div>
                </div>
            </div>
    `
    header.innerHTML = htmlHeader
    OpenBurgerMenu()
}
function OpenBurgerMenu (){
    const MobileBurger = document.querySelector('.header_mobile')
    const ButtonOpenBurger = document.getElementById('checkbox')
    let isvisible = false
    ButtonOpenBurger.addEventListener('click', function() {
        if (isvisible) {
            MobileBurger.style.display = 'none' 
        } else {
            MobileBurger.style.display = 'block' 
        }
        isvisible = !isvisible
    })
}