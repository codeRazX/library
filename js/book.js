import UI from "./UI.js";
import { converUpper, updateDate } from "./utilities.js";


export default function Book({title,author,year,pages,read, genre,summary,id,dateAdded}){
    this.id = id || Date.now();
    this["date Added"] = dateAdded || updateDate(new Date().toDateString());
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
    this.summary = summary;
   
}


Book.prototype.autoCreate = function(container){
   
    const book = UI.generateHTML("DIV", "book");
    const widgets = UI.generateHTML("DIV", "book__widgets");
    const blockImage = UI.generateHTML("DIV", "book__img");
    const info = UI.generateHTML("DIV","book__info");
    const bookEdit = UI.generateHTML("DIV","book__edit");
    const imgEdit = UI.generateHTML("IMG");
    const bookDelete = UI.generateHTML("DIV","book__delete");
    const imgDelete = UI.generateHTML("IMG");
    const imageBook = UI.generateHTML("IMG");
    const title = UI.generateHTML("P","book__tittle",converUpper(this.title));
    const btnInfo = UI.generateHTML("BUTTON","btn__book","Show Info");


    UI.assignAttributes(imgEdit,"public/edit.svg","Icon Edit","25","25");
    UI.assignAttributes(imgDelete,"public/delete.svg","Icon Delete","25","25");
    UI.assignAttributes(imageBook,"public/book.png","Image Book");
    book.dataset.id = this.id;
        
  
    info.append(title,btnInfo);
    blockImage.appendChild(imageBook);
    bookEdit.appendChild(imgEdit);
    bookDelete.appendChild(imgDelete);
    widgets.append(bookEdit,bookDelete);
    book.append(widgets,blockImage,info);
    container.appendChild(book);
}


Book.prototype.showInfo = function(){
    
    const modalBook = document.createElement("DIV");
    const title = UI.generateHTML("H3",null,converUpper(this.title));
    const image = UI.generateHTML("IMG");
    const list = UI.generateHTML("UL","modal__book__list");
    const closeModal = UI.generateHTML("SPAN","close__modal","X");

    modalBook.className = "modal__book active";
    UI.assignAttributes(image,"public/book.png","Image Book","256","256");
    closeModal.onclick = ()=> {
        modalBook.remove();
        UI.disabledOverlay();
    };

   Object.keys(this).forEach(prop => {

         if(this[prop] !== "" && prop !== "id"){
            const li = UI.generateHTML("LI",null,`${converUpper(prop)}: `);
            const contentLI = UI.generateHTML("SPAN",null,converUpper(this[prop]));
            li.appendChild(contentLI);
            list.appendChild(li);
         }
   });

    modalBook.append(title,image,list,closeModal);
    document.body.appendChild(modalBook);
}


Book.prototype.edit = function(book){
    Object.assign(this, book, {
        id: this.id, 
        "date Added": this["date Added"]
    });
}