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
    updateSummary();
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
}