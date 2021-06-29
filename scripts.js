class ShoppingItem {
    constructor(id, crossed, amount, cost) {
        this.id = id;
        this.crossed = crossed;
        this.amount = amount;
        this.cost = cost;
    }
}
let shoppingList = {
    items: {},
    addItem() {
        //get value from new item input
        let itemInput = document.querySelector('#newItem').value;
        if (shoppingList.items.hasOwnProperty(itemInput)) {
            alert(`${itemInput} already is a list item, insert a new value.`);
            return;
        }
        if (itemInput !== '') {
            //create a text node with the value of the input
            let newItem = document.createTextNode(itemInput);
            //create a checkbox inside of a li inside of ul#list
            shoppingList.calculatorFunction();
            let checkBox = document.createElement("input");
            let listItem = document.createElement("li");
            let label = document.createElement("label");
            label.setAttribute("for", itemInput);
            checkBox.setAttribute("type", "checkbox");
            label.append(newItem);
            listItem.appendChild(checkBox); 
            listItem.appendChild(label);
            listItem.classList.add("listItem");
            document.querySelector('#list').prepend(listItem);
            //create a tooltip to be able to delete list items
            const TOOLTIP = document.createElement("span");
            const TOOLTIPTEXT = document.createTextNode("click to delete");
            TOOLTIP.classList.add("tooltip");
            TOOLTIP.append(TOOLTIPTEXT);
            listItem.append(TOOLTIP);
            //add an event listener to each new checkbox that calls crossOut
            //checkBox.addEventListener("click", shoppingList.crossOut());
            //create a object with the key being the user input, the id value being the length of the items object, and the crossed value being set to false
            let itemToAdd = new ShoppingItem(Object.keys(shoppingList.items).length, false, undefined, undefined);
            shoppingList['items'][itemInput] = itemToAdd;
            console.log(shoppingList['items']);
            //set the id of the checkbox to the list text and create classes for li
            checkBox.id = itemInput;
            listItem.id = `${itemInput}-text`;
            listItem.classList = "list-item";
            //reseting the input field
            document.querySelector('#newItem').value = '';
            //checking if the checkbox is already checked and calling the right function accordingly
            checkBox.addEventListener("change", (e) => {
                if (checkBox.checked === true) {
                    let item = e.currentTarget;
                    shoppingList.isChecked(item);
                } else {
                    let item = e.currentTarget;
                    shoppingList.notChecked(item);
                }
            });
        }
    },
    calculatorFunction() {
        const UL = document.querySelector('#calculatorList');
        const LI = document.createElement('li');
        const LITEXT = document.createTextNode(document.querySelector('#newItem').value);
        LI.append(LITEXT);
        UL.prepend(LI);
        const AMOUNT = document.querySelector('#numList');
        let itemNumbers = document.createElement("input");
        itemNumbers.setAttribute("type", "number");
        itemNumbers.setAttribute("placeholder", "number of items")
        const ITEMPRICE = document.createElement("input");
        ITEMPRICE.setAttribute("type", "number");
        ITEMPRICE.setAttribute("placeholder", "item price");
        const PRICE = document.querySelector('#costList');
        AMOUNT.prepend(itemNumbers);
        PRICE.prepend(ITEMPRICE);
        itemNumbers.setAttribute('data-input', 'amount');
        itemNumbers.setAttribute('data-name', document.querySelector('#newItem').value);
        ITEMPRICE.setAttribute('data-name', document.querySelector('#newItem').value);
        ITEMPRICE.setAttribute('data-input', 'price');
        itemNumbers.addEventListener("input", (e) => {
            let item = e.currentTarget;
            shoppingList.calculateTotal(item);
        });
        ITEMPRICE.addEventListener("input", (e) => {
            let item = e.currentTarget;
            shoppingList.calculateTotal(item);
        });
    },
    isChecked(item) {
        console.log(item.id);
        let listId = item.id + "-text";
        document.querySelector(`#${listId}`).style.textDecoration = "line-through";
        shoppingList.items[item.id].crossed = true;
        document.querySelectorAll('span.tooltip').style.textDecoration = "none";
    },
    notChecked(item) {
        let listId = item.id + "-text";
        document.querySelector(`#${listId}`).style.textDecoration = "none";
        shoppingList.items[item.id].crossed = false;
    },
    calculateTotal(item) {
        if (item.dataset.input === 'amount') {
            const OBJ = item.dataset.name;
            const AMOUNT = item.value;
            shoppingList.items[OBJ].amount = parseFloat(AMOUNT);
        } else {
            const OBJ = item.dataset.name;
            const COST = item.value;
            shoppingList.items[OBJ].cost = parseFloat(COST);
        }
        let total = 0;
        for (let list in shoppingList.items) {
            total += (shoppingList.items[list].amount * shoppingList.items[list].cost);
            console.log(shoppingList.items[list].amount);
        }
        console.log(total);
        if (!isNaN(total)) {
            document.querySelector('#total').innerText = `Total: $${total.toFixed(2)}`;
        } else {
            document.querySelector('#total').innerText = `Total: $0`;
        }
    }
}
document.querySelector('#add').addEventListener("click", shoppingList.addItem);