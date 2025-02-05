import { myLibrary } from "./index.js";
import UI from "./UI.js";
import { convertLower } from "./utilities.js";

const btnFilter = document.querySelector('button[data-action="filter-library"]');
const titleFilter = document.getElementById("title-modal");
const authorFilter = document.getElementById("author-modal");
const yearFilter = document.getElementById("year-modal");
const checkboxFilter = document.getElementById("checkbox");
const pagesFilter = document.getElementById("pages-modal");
const genreFilter = document.getElementById("genre__modal");
const containerLibrary = document.getElementById("library");
const textDefault = document.querySelector(".library__default");


const createBook = (array)=>{
    ui.clearHTML(containerLibrary);

        array.forEach(book =>{
           book.autoCreate(containerLibrary);
        })
    }
   

    const filterByTitle = (book) => titleFilter.value.trim() === "" || convertLower(book.title).includes(convertLower(titleFilter.value.trim()));
    
    const filterByAuthor = (book) => authorFilter.value.trim() === "" || convertLower(book.author).includes(convertLower(authorFilter.value.trim()));
    
    const filterByYear = (book) => {
        const selectedYearRange = yearFilter.value;  
        if (selectedYearRange === "") {
            return true;
        }
        if (selectedYearRange === "1900") {
            
            const startYear = parseInt(book.year.split('-')[0]);
            return startYear < 1900;
        }
        const [startYear, endYear] = selectedYearRange.split('-').map(Number);
        return book.year >= startYear && book.year <= (endYear || startYear);
    };

    const filterByRead = (book)=>{
       
            if(checkboxFilter.checked){
                return book.read === "Yes";
            }else{
                return true;
            }
    }

    const filterByPages = book => {
        const pagesFilterValue = pagesFilter.value;
        if (pagesFilterValue === "") {
            return true;
        }       
        
        const cleanPages = parseInt(book.pages.replace(/[^\d]/g, ""), 10) || 0;
    
        if (pagesFilterValue.includes("-")) {
            const [minPages, maxPages] = pagesFilterValue.split("-").map(Number);
            return cleanPages >= minPages && cleanPages <= maxPages;
        }
        
        else if (pagesFilterValue === "300") {
            return cleanPages > 300;
        }
    
        return true; 
    };

    const filterByGenre = (book)=>genreFilter.value === "" || convertLower(book.genre).includes(convertLower(genreFilter.value));
    

const handleFilter = (e)=>{
  
    let currentLibrary = myLibrary.map(book => book);
    
        currentLibrary = currentLibrary.filter(filterByTitle).filter(filterByAuthor).filter(filterByYear).filter(filterByRead).filter(filterByPages).filter(filterByGenre);
        createBook(currentLibrary);
        
        if(currentLibrary.length > 0){
            ui.disabled(textDefault);
        }
        else{ 
            if(textDefault.classList.contains("disabled")){
            ui.active(textDefault);
            textDefault.textContent = "No results found, try again";
        }
        }
}

btnFilter.addEventListener("click", handleFilter);
const ui = new UI();





