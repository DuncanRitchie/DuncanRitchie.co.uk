//// Allow no more than one nav tickbox to be ticked at a time.
//// This results in no more than one nav submenu being open at a time.
const navLabels = document.querySelectorAll("nav ul label");
const navTickboxes = document.querySelectorAll("nav ul input");
for (let i = 0; i < navTickboxes.length; i++) {
    navLabels[i].addEventListener("click", (e)=>{
        for (let j = 0; j < navTickboxes.length; j++) {
            if (i !== j) {
                navTickboxes[j].checked = false;
            }
        }
    });
}

//// Hide nav submenus after an item has been clicked.
const navSubmenuItems = document.querySelectorAll("nav ul ul li a");
for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("click", (e)=>{
        for (let j = 0; j < navTickboxes.length; j++) {
            navTickboxes[j].checked = false;
        }
    });
}

//// Keyboard events on nav labels.
//// When a nav label is focused, keypresses should have the effect of clicks (of opening/hiding the submenu)
//// When showing the submenu on Arrow Down/Up, the first/last item receives focus.
for (let i = 0; i < navLabels.length; i++) {
    navLabels[i].addEventListener("keydown", (e)=>{
        //// On Arrow Down.
        if (e.keyCode == 40) {
            //// If the current submenu is open, close it.
            if (document.querySelector("nav input:checked ~ label:focus")) {
                navLabels[i].click();
            }
            //// Otherwise, open the menu and focus the first item.
            else {
                navLabels[i].click();
                document.querySelector("nav label:focus ~ ul li:first-child a").focus();
            }
            return;
        }
        //// On Arrow Up.
        if (e.keyCode == 38) {
            //// If the current submenu is open, close it.
            if (document.querySelector("nav input:checked ~ label:focus")) {
                navLabels[i].click();
            }
            //// Otherwise, open the menu and focus the last item.
            else {
                navLabels[i].click();
                document.querySelector("nav label:focus ~ ul li:last-child a").focus();
            }
            return;
        }
        //// If the key pressed is not Tab or Shift.
        if (e.keyCode !== 9 && e.keyCode !== 16) {
            navLabels[i].click();
        }
    });
}

//// Assumes a submenu is open.
const closeCurrentSubmenu = () => {
    const currentSubmenuLabel = document.querySelector("nav input:checked ~ label");
    currentSubmenuLabel.click();
    currentSubmenuLabel.focus();
}

//// Keyboard events on nav submenu items.
for (let i = 0; i < navSubmenuItems.length; i++) {
    navSubmenuItems[i].addEventListener("keydown", (e)=>{
        switch (e.keyCode) {
            /// Arrow Up.
            case 38:
                //// If the item is the first in its submenu (assuming 2 submenus), close the submenu.
                if (i==0 || i==document.querySelectorAll("nav ul *:first-child li").length) {
                    closeCurrentSubmenu();
                }
                //// Otherwise, go up an item.
                else {
                    navSubmenuItems[i-1].focus();
                }
                break;
            //// Arrow Down.
            case 40:
                //// If the item is the last in its submenu (assuming 2 submenus), close the submenu.
                if (i==document.querySelectorAll("nav ul *:first-child li").length-1 || i == navSubmenuItems.length-1) {
                    closeCurrentSubmenu();
                }
                //// Otherwise, go down an item.
                else {
                    navSubmenuItems[i+1].focus();
                }
                break;
            default:
                break;
        }
    });
}
