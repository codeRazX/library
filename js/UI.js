const overlay = document.getElementById("overlay");

class UI{

    active = (el)=>{
        el.classList.add("active");
        el.classList?.remove("disabled");
    }

    disabled = (el)=>{
        el.classList?.remove("active");
        el.classList.add("disabled");
    }

    dialogModal = (content, callback)=>{
        this.active(overlay);

        const div = UI.generateHTML("DIV");
        const dialog = UI.generateHTML("DIALOG");
        const message = UI.generateHTML("P",null,content);
        const groupBTN = UI.generateHTML("DIV","group__btn");
        const btnConfirm = UI.generateHTML("BUTTON",null,"Yes");
        const btnCancel = UI.generateHTML("BUTTON","btn__modify","No");
        btnConfirm.className = "btn__modify btn__modify__add";

        btnCancel.onclick = ()=>{
            UI.disabledOverlay();
            div.remove();
        }
        btnConfirm.onclick = ()=> {
            callback();
            UI.disabledOverlay();
            div.remove();
        };
        groupBTN.append(btnConfirm,btnCancel);
        dialog.append(message,groupBTN);
        div.appendChild(dialog);

       
        div.className = "modal__alert active";
        document.body.appendChild(div);
        dialog.showModal();
        return div;

    }

    static disabledOverlay = ()=>{   
        overlay.classList?.remove("active");
        overlay.classList.add("disabled");
    }

    showMessage = (type,container,content)=>{
        const exist = container.querySelector(".error") || container.querySelector(".success");
        exist && exist.remove();
        const message = document.createElement("P");

        switch(type){
            case "error":
            message.classList.add("error");
            message.textContent = "This field is required";
            break;

            case "success":
            message.classList.add("success");
            message.textContent = content;
            break;
        }
        container.appendChild(message);
        setTimeout(()=>message.remove(),3000);
    }

    clearHTML = (container)=>{
        while(container.firstChild){
            container.removeChild(container.firstChild);
        }
    }
    
    static generateHTML = (el,clas = null,content = null)=>{
        const item = document.createElement(el);
        item.classList.add(clas);
        item.textContent = content;
        return item;
    }

    static assignAttributes = (el,root,alt,w = null,h = null)=>{
        el.src = root;
        el.alt = alt;
        el.width = w;
        el.height = h;
        el.loading = "lazy";
    }
}

export default UI;