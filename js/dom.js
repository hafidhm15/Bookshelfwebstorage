const INCOMPLETE_BOOK = "incompleteBookshelfList";
const COMPLETE_BOOK = "completeBookshelfList";



function addBook() {
    const idBook = +new Date();
    const inputJudul = document.getElementById("inputJudul").value;
    const inputPenulis = document.getElementById("inputPenulis").value;
    const inputTahun = document.getElementById("inputTahun").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;

    const book = createBook(idBook, inputJudul, inputPenulis, inputTahun, inputBookIsComplete);
    const bookObject = composeBookObject(idBook, inputJudul, inputPenulis, inputTahun, inputBookIsComplete);

    books.push(bookObject);
  
    if (inputBookIsComplete) {
        document.getElementById(COMPLETE_BOOK).append(book);
    } else {
        document.getElementById(INCOMPLETE_BOOK).append(book);
    }

    updateJson();
}

function createBook(idBook, inputJudul, inputPenulis, inputTahun, inputBookIsComplete) {
    const book = document.createElement("article");
    book.setAttribute("id", idBook)
    book.classList.add("card", "my-3");

    const bookTitle = document.createElement("h5");
    bookTitle.classList.add("text-truncate");
    bookTitle.style.color = 'blue';
    bookTitle.style.maxWidth = "500px";
    bookTitle.innerText = inputJudul;



    const bookAuthor = document.createElement("span");
    bookAuthor.classList.add("text-truncate", "d-inline-block");
    bookAuthor.style.maxWidth = "500px";
    bookAuthor.innerText = inputPenulis;

    const bookYear = document.createElement("span");
    bookYear.innerText = inputTahun;

    const br = document.createElement("br");

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-body", "border-start", "border-4", "border-info", "d-flex", "justify-content-between");

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const cardAction = addAction(inputBookIsComplete, idBook);

    cardContent.append(bookTitle, bookAuthor, br, bookYear);
    cardContainer.append(cardContent);
    cardContainer.append(cardAction);
    book.append(cardContainer);

    return book;
}

function addAction(inputBookIsComplete, idBook) {
    const cardActions = document.createElement("div");

    const actionDelete = createActionDelete(idBook);
    const actionRead = createActionRead(idBook);
    const actionUndo = createActionUndo(idBook);

    cardActions.append(actionDelete);

    if (inputBookIsComplete) {
        cardActions.append(actionUndo);
    
    } else {
        cardActions.append(actionRead);
    }

    return cardActions;
}

function createActionDelete(idBook) {
    const actionDelete = document.createElement("button");
    actionDelete.classList.add("btn", "btn-sm", "btn-outline-danger", "mx-1");
    actionDelete.innerHTML = '<p>Delete</p>';

    actionDelete.addEventListener("click", function () {
      
        let confirmation = confirm("apakah anda ingin menghapus buku?");
       

        if (confirmation) {
            const cardParent = document.getElementById(idBook);
            cardParent.addEventListener("eventDelete", function (event) {
                event.target.remove();
               
            });
            cardParent.dispatchEvent(new Event("eventDelete"));

            deleteBookFromJson(idBook);
            updateJson();
            
        }
    });

    return actionDelete;
}

function createActionRead(idBook) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-primary");
    action.innerHTML = '<p>Read</p>';

    action.addEventListener("click", function () {
        let confirmation = confirm("apakah anda sudah baca buku ini?");

        if (confirmation) {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h5").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, true);
        document.getElementById(COMPLETE_BOOK).append(book);

        deleteBookFromJson(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, true);

        books.push(bookObject);
        updateJson();
    }
    })

    return action;
}

function createActionUndo(idBook) {
    const action = document.createElement("button");
    action.classList.add("btn", "btn-sm", "btn-outline-secondary");
    action.innerHTML = '<p>Undo</p>';

    action.addEventListener("click", function () {
        let confirmation = confirm("apakah anda belum baca buku ini ?");
        if (confirmation) {
        const cardParent = document.getElementById(idBook);

        const bookTitle = cardParent.querySelector(".card-content > h5").innerText;
        const bookAuthor = cardParent.querySelectorAll(".card-content > span")[0].innerText;
        const bookYear = cardParent.querySelectorAll(".card-content > span")[1].innerText;

        cardParent.remove();

        const book = createBook(idBook, bookTitle, bookAuthor, bookYear, false);
        document.getElementById(INCOMPLETE_BOOK).append(book);

        deleteBookFromJson(idBook);
        const bookObject = composeBookObject(idBook, bookTitle, bookAuthor, bookYear, false);

        books.push(bookObject);
        updateJson();
        }
    })

    return action;
}

function bookSearch(keyword) {
    const filter = keyword.toUpperCase();
    const titles = document.getElementsByTagName("h5");

    for (let i = 0; i < titles.length; i++) {
        const titlesText = titles[i].textContent || titles[i].innerText;

        if (titlesText.toUpperCase().indexOf(filter) > -1) {
            titles[i].closest(".card").style.display = "";
        } else {
            titles[i].closest(".card").style.display = "none";
        }
    }
}