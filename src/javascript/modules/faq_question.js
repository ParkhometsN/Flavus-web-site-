
export function faqquestion(){
const items = document.querySelectorAll(".faq_content_ques");

items.forEach(item => {

  const question = item.querySelector(".topblfaq");
  const answer = item.querySelector("h4");

  question.addEventListener("click", () => {

    items.forEach(el => {
      const a = el.querySelector("h4");

      if(el !== item){
        a.style.maxHeight = null;
        el.classList.remove("active");
      }
    });

    if(answer.style.maxHeight){
      answer.style.maxHeight = null;
      item.classList.remove("active");
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      item.classList.add("active");
    }

  });

});
};