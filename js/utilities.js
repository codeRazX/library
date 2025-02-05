export const convertLower = el => el.toLowerCase();

export const converUpper = el => el.charAt(0).toUpperCase() + el.slice(1, el.length);

export const updateDate = date =>{
    const index = date.indexOf(" ");
    const newDate = date.slice(index+1, date.length);
    const updateDate = newDate.split(" ");
    return updateDate.join("/");
}