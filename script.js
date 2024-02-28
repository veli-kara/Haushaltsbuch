/*function einkommenseite (){
    document.getElementById("einkommen-form").classList.remove("hidden");
    document.getElementById("ausgaben-form").classList.add("hidden");
    document.getElementById("zusammenfassung-form").classList.add("hidden")
    document.getElementById("notification").classList.add("hidden")
}

function ausgabenseite () {
    document.getElementById("ausgaben-form").classList.remove("hidden");
    document.getElementById("einkommen-form").classList.add("hidden");
    document.getElementById("zusammenfassung-form").classList.add("hidden")
    document.getElementById("notification").classList.add("hidden")
}

function zusammenfassungseite () {
    document.getElementById("zusammenfassung-form").classList.remove("hidden");
    document.getElementById("ausgaben-form").classList.add("hidden");
    document.getElementById("einkommen-form").classList.add("hidden")
    document.getElementById("notification").classList.add("hidden")
}*/


document.getElementById("einkommen-button").addEventListener("click", incomePage);

function incomePage (){
    document.getElementById("einkommen-form").classList.remove("hidden");
    document.getElementById("ausgaben-form").classList.add("hidden");
    document.getElementById("zusammenfassung-form").classList.add("hidden")
    document.getElementById("notification").classList.add("hidden")
}

document.getElementById("ausgaben-button").addEventListener("click", expensePage)

function expensePage (){
    document.getElementById("ausgaben-form").classList.remove("hidden");
    document.getElementById("einkommen-form").classList.add("hidden");
    document.getElementById("zusammenfassung-form").classList.add("hidden")
    document.getElementById("notification2").classList.add("hidden")
}

document.getElementById("zusammenfassung-button").addEventListener("click", function(){
    document.getElementById("zusammenfassung-form").classList.remove("hidden");
    document.getElementById("einkommen-liste").classList.remove("hidden");
    document.getElementById("ausgaben-liste").classList.remove("hidden");
    document.getElementById("ausgaben-form").classList.add("hidden");
    document.getElementById("einkommen-form").classList.add("hidden")
    document.getElementById("notification").classList.add("hidden")
})

let eingabe_list = [];


document.getElementById("einkommen-form").addEventListener("submit", submitIncome)

function submitIncome (e){
    if (e){
        e.preventDefault();
    }
    let incomeAmount = parseFloat(document.getElementById("einkommen-betrag").value);
    let incomeKategorie = document.getElementById("einkommenkategorie").value;
    let incomeCycle = document.getElementById("einkommen-zyklus").value;
    let incomeMonth = document.getElementById("einkommen-monat").value;
    if (!incomeAmount || !incomeKategorie) return;
    let newInput = {
        type: "income",
        cycle: incomeCycle,
        category: incomeKategorie,
        month: incomeMonth,
        amount: incomeAmount,
    }
    eingabe_list.push(newInput);
    document.getElementById("notification").classList.remove("hidden");
    //document.getElementById("income").innerHTML += "Ihr Einkommen " + incomeAmount + " Euro ist hinzugefügt";
    updateSummary();
    //tabelle();
}

document.getElementById("ausgaben-form").addEventListener("submit", submitExpense)

function submitExpense(e){
    if (e){
        e.preventDefault();
    }
    let expenseAmount = parseFloat(document.getElementById("ausgaben-betrag").value);
    let expenseKategorie = document.getElementById("ausgabenkategorie").value;
    let expenseCycle = document.getElementById("ausgaben-zyklus").value;
    let expenseMonth = document.getElementById("ausgaben-monat").value;
    if (!expenseAmount || !expenseKategorie) return;
    let newInput = {
        type: "expense",
        cycle: expenseCycle,
        category: expenseKategorie,
        month: expenseMonth,
        amount: expenseAmount,
    }
    eingabe_list.push(newInput);
    document.getElementById("notification2").classList.remove("hidden");
    updateSummary();
    document.getElementById("notification").classList.add("hidden");
    //tabelle();
}

function updateSummary(){
    let incomeSummary = document.getElementById("einkommen-summary");
    let expenseSummary = document.getElementById("ausgaben-summary");

    incomeSummary.innerHTML = '';
    expenseSummary.innerHTML = '';

    let totalIncome = 0;
    let totalExpenses = 0;
    eingabe_list.forEach(function(item, index) {
        if (item.type === "income"){
            totalIncome += item.amount;
            let listItem = document.createElement("li");
            let createBtn = document.createElement("button");
            createBtn.addEventListener("click", function() { deleteEntry(index); })
            let createEditBtn = document.createElement("button");
            createEditBtn.addEventListener("click", function() { editIncomeEntry (index); })
            listItem.textContent = `Monat: ${item.month} Kategorie: ${item.category} Betrag: ${item.amount}`;
            createBtn.textContent = `Löschen`
            createEditBtn.textContent = `Bearbeiten`
            incomeSummary.appendChild(listItem);
            incomeSummary.appendChild(createBtn);
            incomeSummary.appendChild(createEditBtn);
        } else if (item.type === "expense"){
            totalExpenses += item.amount;
            let listItem = document.createElement("li");
            let deleteBtn = document.createElement ("button");
            deleteBtn.addEventListener("click", function() {deleteEntry(index)});
            let editBtn = document.createElement("button");
            editBtn.addEventListener("click", function() { editExpenceEntry (index);})
            listItem.textContent = `Monat: ${item.month} Kategorie: ${item.category}, Betrag: ${item.amount}`;
            deleteBtn.textContent = `Löschen`
            editBtn.textContent= `BEarbeiten`
            expenseSummary.appendChild(listItem);
            expenseSummary.appendChild(deleteBtn);  
            expenseSummary.appendChild(editBtn);          
        }
    })
}

function deleteEntry (index){
    eingabe_list.splice(index,1);
    updateSummary();
}

function editIncomeEntry(index){
    deleteEntry(index);
    incomePage();
}

function editExpenceEntry(index){
    deleteEntry(index);
    expensePage();
}

function monthSelect (){
    
    let selectedMonth = document.getElementById("selected-month").value;
    let filteredEntries = eingabe_list.filter ( entry => entry.month === selectedMonth);
    let summaryList = document.getElementById("zusammenfassung-summary");
    summaryList.innerHTML = '';
    filteredEntries.forEach(entry => {
        let listItem = document.createElement("li");
        listItem.textContent = `Transaktionen vom ${entry.month}: Ausgabetyp: ${entry.type} ${entry.category}, ${entry.amount} Euro`;
        summaryList.appendChild(listItem);
    })

    document.innerHTML("zusammenfassung-summary") += summaryList;
    //document.getElementById("zusammenfassung-summary").classList.remove("hidden");
    //summaryList.innerHTML = '';
    //updateSummary()
}



/*function tabelle (){
    eingabe_list.forEach(item => {
        if (item.type === "income") {
            let row = incomeSummary.insertRow();
            let categoryCell = row.insertCell(0);
            let amountCell = row.insertCell(1);
            categoryCell.textContent = item.category;
            amountCell.textContent = item.amount;
        } else if (item.type === "expense") {
            let row = expenseSummary.insertRow();
            let categoryCell = row.insertCell(0);
            let amountCell = row.insertCell(1);
            categoryCell.textContent = item.category;
            amountCell.textContent = item.amount;
        }
    })
}*/

//console.log(totalIncome);
//console.log(eingabe_list);

/*let new_list = [];
//let strings = JSON.stringify(new_list);
//localStorage.setItem("new_list", Object);
function addincome (){
    event.preventDefault();
    let betrag = parseFloat(document.getElementById("einkommen-betrag").value);
    let kategorie = document.getElementById("einkommenkategorie").value;
    let zyklus = document.getElementById("einkommen-zyklus").value;
    let monat = document.getElementById("einkommen-monat").value;
    if (!betrag || !kategorie) return;
    let income = {
        type : "income",
        title: kategorie,
        circus: zyklus,
        month: monat, 
        amount: betrag,
    }
    new_list.push(income);
    //document.getElementById("income").innerHTML += "Ihr Einkommen " + betrag + "Euro ist hinzugefügt";        
}

function addexpences () {
    event.preventDefault();    
    let betrag = parseFloat(document.getElementById("ausgaben-betrag").value);
    let kategorie = document.getElementById("ausgabenkategorie").value;
    let zyklus = document.getElementById("ausgaben-zyklus").value;
    let monat = document.getElementById("ausgaben-monat").value;
    if (!betrag || !kategorie) return;
        let expence = {
        type : "expence",
        title: kategorie,
        circus: zyklus,
        month: monat, 
        amount: betrag,
        }
    
    new_list.push(expence);
    //document.getElementById("expence").innerHTML += "Ihr Ausgabe " + betrag + "Euro ist hinzugefügt";
}

/*function total (type, new_list) {
    var total= 0;
    new_list.forEach(element => {
        if (element.type == type){
            total += element.amount;
        }        
    });
    return total;
}

function einkommensum (){
    var einkommentotal = 0
    new_list.forEach(element =>{
        if (element.type == "income"){
            einkommentotal += element-amount;
        }
    })
    return einkommentotal
}

//console.log(einkommentotal)

//console.log(total("income", new_list))
/*function toplam (){
    let totaleinkommen= total("income", new_list);
    document.getElementById("toplam").innerHTML += totaleinkommen;
}
/* function updateTotals() {
    let totalIncome = total("income", new_list);
    let totalExpenses = total("expence", new_list);
    document.getElementById("income-total").textContent = "Total Income: " + totalIncome;
    document.getElementById("expenses-total").textContent = "Total Expenses: " + totalExpenses;
}

//let totalIncome = total("income", new_list);
//let totalExpenses = total("expense", new_list);
//console.log("Total Income: " + totalIncome);
//console.log("Total Expenses: " + totalExpenses);


//totaleinkommen = total("income", new_list);
//console.log (totaleinkommen);

/*function calculateTotal (type, new_list){
    let sum =0;
    new_list.forEach(entry => {
        if (entry.type == type){
            sum += entry.amount;
        }
        
    });
    return sum
}

let incomesum = calculateTotal("income", new_list);



/*document.getElementById("earnings").addEventListener("click", function(){
    event.preventDefault()
    var betrag = parseFloat(document.getElementById("einkommen-betrag").value)
    var kategorie = document.getElementById("einkommenkategorie").value;
    var zyklus = document.getElementById("einkommen-zyklus").value;
    var monat = document.getElementById("einkommen-monat").value;
    let income = {
        type : "income",
        title: kategorie,
        circus: zyklus,
        month: monat, 
        amount: betrag,
    }
    new_list.push(income);
    einkommenseite();
})*/

//console.log(new_list)
//console.log(incomesum);