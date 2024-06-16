document.addEventListener("DOMContentLoaded", function(event) {
    const dropMenu = document.getElementById("drop-menu");
    const dropIcon = document.getElementById("drop-icon");

    dropIcon.addEventListener("click", function(event) {
        if (dropMenu.style.display === "none") {
            dropMenu.style.display = "block";
        } else {
            dropMenu.style.display = "none";
        }
    });

    document.addEventListener("click", function(event) {
        if (!event.target.closest("#drop-button") && !event.target.closest("#drop-menu")) {
            dropMenu.style.display = "none";
        }
    });
});