import Book from "./book.js";
import UI from "./UI.js";
import { convertLower, converUpper } from "./utilities.js";
import { books as defaultBooks } from "./defaultBooks.js";
import "./filter.js";

const modalAdd = document.getElementById("modal__add");
const groupBtnAdd = document.querySelectorAll("button[data-action='openModalAdd']");
const overlay = document.getElementById("overlay");
const formCreate = document.getElementById("form-create");
const titleInput = formCreate.querySelector("#title");
const authorInput = formCreate.querySelector("#author");
const yearInput = formCreate.querySelector("#year");
const pagesInput = formCreate.querySelector("#pages");
const readInputs = formCreate.querySelectorAll('input[name="read__modal"]');
const genreInput = formCreate.querySelector("#genre");
const summaryInput = formCreate.querySelector("#summary");
const defaultMessage = document.querySelector(".library__default");
let editMode = false;
const btnForm = formCreate.querySelector('button[type="submit"');
const containerLibrary = document.getElementById("library");
export const myLibrary = [];
const headerModal = document.getElementById("header__modal");
let currentID;
const nav = document.getElementById("nav-library");
const formFilter = document.getElementById("form-filter");


document.addEventListener("DOMContentLoaded",registerListener);

function registerListener(){
    //Replace with Storage and load here
    createDefaultsBooks();
    openModalAdd();
    modalAdd.addEventListener("click", handleModalAdd);
    overlay.addEventListener("click", handleOverlay);
    formCreate.addEventListener("submit",handleFormCreate);
    containerLibrary.addEventListener("click",handleLibrary);
    nav.addEventListener("click", handleNav);
    
}


const handleFormCreate = (e)=>{
    e.preventDefault();
    
    const title = convertLower(titleInput.value.trim());
    const author = convertLower(authorInput.value.trim());
    const year = convertLower(yearInput.value.trim());
    const pages = convertLower(pagesInput.value.trim());
    const read = Array.from(readInputs).find(input => input.checked)?.value || "";
    const genre = genreInput.value;
    const summary = convertLower(summaryInput.value.trim());

    const dataInputs = {
        title,
        author,
        year,
        pages,
        read,
        genre,
        summary,
    };

   
    
    if (!validateForm(dataInputs)) return;

    if(!editMode){
      
        myLibrary.push(new Book(dataInputs));

        createBook(dataInputs);
        formFilter.reset();
      
        ui.showMessage("success",document.body,"Book successfully added to your library!");
    }
    else{
       
        myLibrary[currentIndex(myLibrary)].edit(dataInputs);
        
        createBook();  
       
        formFilter.reset();
        ui.showMessage("success",document.body,"Book edited successfully");
    }

    resetForm();
   
}

const createBook = ()=>{

    ui.clearHTML(containerLibrary);

    if(myLibrary.length >=1){
        ui.disabled(defaultMessage);

        myLibrary.forEach(book =>{
           book.autoCreate(containerLibrary);
        })
    }
    else{
        ui.active(defaultMessage);
        defaultMessage.textContent = "No results found, start adding books to your collection";
    }

}

const resetForm = ()=>{
    location.href = "#library";

    setTimeout(()=>{
        ui.disabled(modalAdd); 
        ui.disabled(overlay);
        formCreate.reset();

        if(editMode){
            btnForm.textContent = "Create Book";
            editMode = false;
            btnForm.classList.toggle("btn__edit");
            headerModal.textContent = "Add a book to your library";
        }
    },100)
}

const validateForm = data =>{

    const inputsToValidate = [
        titleInput,
        authorInput,
        genreInput,
        ...readInputs 
    ];
    
    inputsToValidate.forEach(input => {
        if (!input.value.trim() && input.type !== "radio") {
            ui.showMessage("error",input.parentElement);
        }
    });

    
    if (![...readInputs].some(input => input.checked)) {
        ui.showMessage("error",readInputs[0].parentElement.parentElement.parentElement); 
    }

    return inputsToValidate.every(input => {
        if (input.type === "radio") {   
            const isChecked = [...readInputs].some(radio => radio.checked);
            return isChecked;
        }
        return input.value.trim() !== "";
    });
    
}


const handleOverlay = (e)=>{
    if(e.target === overlay){
        const modalBook = document.querySelector(".modal__book");

        if(modalAdd.classList.contains("active")){
            ui.disabled(modalAdd); 
            ui.disabled(overlay);
            formCreate.reset();
        }
        
        if(modalBook && modalBook.classList.contains("active")){
            modalBook.remove();
            ui.disabled(overlay);
        }

        if(editMode){
            btnForm.textContent = "Create Book";
            btnForm.classList.toggle("btn__edit");
            editMode = false;
            headerModal.textContent = "Add a book to your library";
        }
    }
}


const handleModalAdd = (e)=>{
    const action = e.target.dataset?.action;
  
    if(action){

        if(action === "close"){
            ui.disabled(modalAdd); 
            ui.disabled(overlay);
            formCreate.reset();
            if(editMode){
                btnForm.textContent = "Create Book";
                editMode = false;
                btnForm.classList.toggle("btn__edit");
                headerModal.textContent = "Add a book to your library";
            }
        }
    }
}


const handleLibrary = (e)=>{
    currentID= e.target.closest("div.book")? parseInt(e.target.closest("div.book").dataset?.id)  : false;

 
    if(e.target.closest("div.book") && !e.target.closest(".book__edit") && !e.target.closest(".book__delete")){
        ui.active(overlay);
        myLibrary[currentIndex(myLibrary)].showInfo();  
    }

    if(e.target.closest(".book__edit")){
       logicEdit();
    }
    else if(e.target.closest(".book__delete")){
          
        ui.dialogModal("Are you sure you want to delete this book?",()=>{
            myLibrary.splice(currentIndex(myLibrary),1);
            formFilter.reset();
            createBook();
        }); 
    }  
}

const logicEdit = ()=>{
    editMode = true;
    headerModal.textContent = "Edit your Book";
    btnForm.textContent = "Update Book";
    btnForm.classList.toggle("btn__edit");
    ui.active(overlay);
    ui.active(modalAdd);

    const inputs = [...formCreate.querySelectorAll("input"),formCreate.querySelector("select"),formCreate.querySelector("textarea")];

    const bookSelected = myLibrary[currentIndex(myLibrary)];
    inputs.forEach(input => {
        const fieldId = input.id;
        
        if (bookSelected[fieldId] !== "" || bookSelected[fieldId] !== undefined) {
            
            if (fieldId === "genre") {
                input.value = bookSelected[fieldId];
            } 
            else if (fieldId === "read__modal_yes" || fieldId === "read__modal_no") {
            
                if(input.value === bookSelected["read"]) input.checked = true;

            } 
            else {

                input.value = converUpper(bookSelected[fieldId]);
            }
        }
    });

}

const handleNav = (e)=>{
    
    if(e.target){
        const action = e.target.dataset?.action;
        logicNav(action);
    }
}

const logicNav = (action)=>{
    switch(action){

        case "clear-library":
        if(myLibrary.length >= 1){
            ui.dialogModal("Are you sure you want to clear your library? All your books will be deleted",()=>{
            myLibrary.splice(0,myLibrary.length);
            formFilter.reset();
            createBook();
            });
        }
        else{
            return;
        }
        break;

        case "sort-library":
            if(myLibrary.length >= 1){
                myLibrary.sort((a,b) => a.title.localeCompare(b.title));
                formFilter.reset();
                createBook(); 
            }
        break;

        case "reset":
            formFilter.reset();
            createBook();
        break;
        default:
        return;
    }
}


const openModalAdd = ()=>{
    groupBtnAdd.forEach(btn => btn.addEventListener("click", ()=> {
        ui.active(overlay);
        ui.active(modalAdd);
    }));
}

const currentIndex = (array) => {
    const index= array.findIndex(book => book.id === parseInt(currentID));
    return index;
}

const createDefaultsBooks = () => {
    
    defaultBooks.forEach((book, index) => { 
        setTimeout(() => {
            myLibrary.push(new Book(book));
            createBook();
            
        }, index * 10);
        
    })

    
};
const ui = new UI();
