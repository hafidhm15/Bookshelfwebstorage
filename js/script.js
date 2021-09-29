document.addEventListener("DOMContentLoaded", function () {

    const formInput = document.getElementById("inputBook");
    const formSearch = document.getElementById("searchBook");

    formInput.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();

        document.getElementById("inputJudul").value = "";
        document.getElementById("inputPenulis").value = "";
        document.getElementById("inputTahun").value = "";
        document.getElementById("inputBookIsComplete").checked = false;
    });

    formSearch.addEventListener("submit", function (event) {
        event.preventDefault();

        const inputSearch = document.getElementById("searchBookTitle").value;
        bookSearch(inputSearch);
    })

    if (isStorageSupported()) {
        fetchJson();
    }
});

document.addEventListener("onjsonfetched", function () {
    renderFromBooks();
});
