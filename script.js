console.log("init0")
document.addEventListener("DOMContentLoaded", () => {
    console.log("init")
    document.querySelector("#menu-button").addEventListener("click", evt => {
        console.log("clicked");
        var menu = document.querySelector("#menu");
        if(menu.classList.contains("mobile-open")) {
            menu.classList.remove("mobile-open");
        } else {
            menu.classList.add("mobile-open");
        }
    });
});