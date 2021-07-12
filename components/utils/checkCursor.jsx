const checkCursor = () => {
    const cursor = document.getElementsByClassName("custom_cursor")[0];
    if (window.innerWidth <= 768) {
        cursor.style.display = "none";
        if (cursor.children[0].classList.contains("hovered")) {
            cursor.children[0].classList.remove("hovered")
            cursor.children[1].classList.remove("hovered")
        }
    } else {
        cursor.removeAttribute("style");
        if (cursor.children[0].classList.contains("hovered")) {
            cursor.children[0].classList.remove("hovered")
            cursor.children[1].classList.remove("hovered")
        }
    }
};

export default checkCursor
