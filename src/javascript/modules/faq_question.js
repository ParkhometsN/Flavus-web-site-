export function faqquestion() {
    const items = document.querySelectorAll(".faq_content_ques");

    items.forEach(item => {
        const question = item.querySelector(".topblfaq");
        const answer = item.querySelector("h4");
        if (!question || !answer) return;

        question.setAttribute("role", "button");
        question.setAttribute("tabindex", "0");
        question.setAttribute("aria-expanded", "false");

        const toggle = () => {
            items.forEach(el => {
                const a = el.querySelector("h4");
                const q = el.querySelector(".topblfaq");
                if (el !== item && a && q) {
                    a.style.maxHeight = null;
                    el.classList.remove("active");
                    q.setAttribute("aria-expanded", "false");
                }
            });

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                item.classList.remove("active");
                question.setAttribute("aria-expanded", "false");
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                item.classList.add("active");
                question.setAttribute("aria-expanded", "true");
            }
        };

        question.addEventListener("click", toggle);
        question.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle();
            }
        });
    });
}