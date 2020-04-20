let myLibrary = JSON.parse(localStorage.getItem("myLibrary") || "[]");

let table_body = document.getElementById("table-body");
let new_book_button = document.getElementById("form-reveal");
let form_submit = document.getElementById("submit-button");
let book_form = document.getElementById("book-form");
let delete_book_buttons = document.querySelectorAll('.delete-book');
let read_buttons = document.getElementsByClassName('read-button');

for (book of myLibrary) {
    table_body.innerHTML += generateTemplate(book.title, book.author, book.pages, book.read, book.id)
}

function Book(title, author, pages, read, id) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = id
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function generateTemplate(title, author, pages, read, id) {
    return `
    <tr data-book="${id}" id = "book-${id}">
        <td>${title}</td>
        <td>${author}</td>
        <td>${pages}</td>
        <td ><input class='checkbox' style="width:50%; height: 100%;" name="checkbox" type="checkbox" ${read == true ? 'checked' : ''}/>
        </td>
        <td><button class='delete delete-book' id=${id}>Delete</button></td>
    </tr>
    `
}

function render() {
    book = myLibrary[myLibrary.length - 1];
    table_body.innerHTML += generateTemplate(book.title, book.author, book.pages, book.read, book.id)
}

function toggleHidden(element) {
    element.style.display == 'none' ? element.style.display = 'block' : element.style.display = 'none'
}

function toggleDisabled(button) {
    button.disabled = !button.disabled
}

new_book_button.addEventListener('click', () => {
    toggleDisabled(new_book_button);
    toggleDisabled(form_submit);
    toggleHidden(book_form);
});

book_form.addEventListener('submit', (e) => {
    e.preventDefault()
    addBookToLibrary(new Book(e.target.title.value, e.target.author.value, e.target.pages.value, e.target.read.checked, myLibrary.length))
    render()
    toggleDisabled(new_book_button);
    toggleDisabled(form_submit);
    toggleHidden(book_form);
    book_form.reset();

});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-book')) {
        document.getElementById(`book-${e.target.id}`).remove();
        myLibrary.splice(myLibrary.indexOf(myLibrary.find(book => book.id == e.target.id)), 1);
    }

    if (e.target.classList.contains('checkbox')) {
        console.log(e.target.parentNode.parentNode.dataset.book)
        myLibrary[myLibrary.indexOf(myLibrary.find(book => book.id == e.target.parentNode.parentNode.dataset.book))].read = !myLibrary[myLibrary.indexOf(myLibrary.find(book => book.id == e.target.parentNode.parentNode.dataset.book))].read
    }
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
});