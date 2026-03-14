export function price(){

const items = document.querySelectorAll(".price-category");
const images = document.querySelectorAll(".price_category_img img");

items.forEach((item, index) => {

  const question = item.querySelector(".price-category-header");
  const answer = item.querySelector(".price-category-body");

  // первая категория активна
  if(index === 0){
    answer.style.maxHeight = answer.scrollHeight + "px";
    item.classList.add("active");

    if(images[index]){
        images[index].classList.add("active");
    }
  } 
  else{
    answer.style.maxHeight = null;
  }

  question.addEventListener("click", () => {

    if(item.classList.contains("active")) return;

    items.forEach(el => {

      const a = el.querySelector(".price-category-body");

      a.style.maxHeight = null;
      el.classList.remove("active");

    });

    // убираем все картинки
    images.forEach(img => img.classList.remove("active"));

    // открываем нужную
    answer.style.maxHeight = answer.scrollHeight + "px";
    item.classList.add("active");

    if(images[index]){
      images[index].classList.add("active");
    }

  });

});

}
