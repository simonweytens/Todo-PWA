var ToDo;
var Todos;
var From;
var Till;
var TodoDate;
let db  = new Localbase('db')
var todoToday
var done
var todoDone


window.addEventListener('load', function() {
    Todos = document.getElementById("TableTodos")
    UpdateCalender()
    todoToday = document.getElementById('todo-today')
    todoDone = document.getElementById('done-today')
    renderToday()
    renderDone()
})


function renderDone(){
    var dat = new Date()
    var year =  dat.getFullYear();
    var month = dat.getMonth() +1
    var days = dat.getDate()
    var d = year + "-" + ('0'+ month).slice(-2) + "-" + ('0'+ days).slice(-2)

    var th1 = document.createElement('th')
    th1.innerHTML = "Done"
    db.collection('Done_ToDo').get({keys: true}).then(object => {
        for(var i = 0; i < object.length; i++){ 
                if(d == object[i].data.tododate){
                    var tr1 = document.createElement('tr')
                    todoDone.appendChild(tr1)
                    var td1 = document.createElement("TD")
                    td1.innerHTML = object[i].data.todo
                    tr1.appendChild(td1)

                    var td6 = document.createElement('td')
                    td6.classList.add("material-icons")
                    td6.innerHTML = "delete"
                    td6.setAttribute("id", object[i].key)
                    td6.onclick = function(){deleteDone(this.id)}
                    tr1.appendChild(td6)
                }
            } 
    })   
}

async function renderToday(){
    try {
        var dat = new Date()
        var year =  dat.getFullYear();
        var month = dat.getMonth() +1
        var days = dat.getDate()
        var d = year + "-" + ('0'+ month).slice(-2) + "-" + ('0'+ days).slice(-2)
        console.log(d)

        var th1 = document.createElement("th")
        th1.innerHTML = "Todo"
        todoToday.appendChild(th1)
        var th2 = document.createElement("th")
        th2.innerHTML = "From"
        todoToday.appendChild(th2)
        var th3 = document.createElement("th")
        th3.innerHTML = "Till"
        todoToday.appendChild(th3)
        db.collection('Things_To_Do').get({keys: true}).then(object => {
            for(var j = 0; j < object.length; j++){
                if(d == object[j].data.tododate){
                    fillUp(j, object, todoToday)
                }
            }  
        })
    } catch (error) {
        console.log(error)
    }
}

function AddTodo(){
    ToDo = document.getElementById("todoInput").value
    From = document.getElementById("todoTimeFrom").value
    Till = document.getElementById("todoTimeTill").value
    TodoDate = document.getElementById("dateInput").value
    if(ToDo != "" && From != "" && Till != "" && TodoDate != ""){
        db.collection('Things_To_Do').add({
            todo: ToDo,
            from: From,
            till: Till,
            tododate: TodoDate,
            date: date,
            required: true
        })
        UpdateCalender()
        location.reload()
    }
    else{
        M.toast({html: 'Gelieve alle velden in te vullen', classes: 'rounded', displayLenght: 4000})
    }
    
}

function UpdateCalender(){
    db.collection('Things_To_Do').get({keys: true}).then(object => {
        for(var i = 0; i < object.length; i++){ 
                console.log(object[i].data.tododate)
                var piece = document.getElementById(object[i].data.tododate)
                piece.addEventListener('click', ShowAgenda)
            } 
    })   
}


function ShowAgenda(){
    deleteRows()
    var th1 = document.createElement("th")
    th1.innerHTML = "Todo"
    var th2 = document.createElement("th")
    th2.innerHTML = "From"
    var th3 = document.createElement("th")
    th3.innerHTML = "Till"
    Todos.appendChild(th1)
    Todos.appendChild(th2)
    Todos.appendChild(th3)
    db.collection('Things_To_Do').get({keys: true}).then(object => {
        for(var j = 0; j < object.length; j++){
            if(this.id == object[j].data.tododate){
                fillUp(j, object, Todos)
            }
        }  
    })
}

function deleteTodo(key){
    db.collection('Things_To_Do').doc(key).delete()
    location.reload()
}

function deleteDone(key){
    db.collection('Done_ToDo').doc(key).delete()
    location.reload()
}

function Done(key) {
    db.collection('Things_To_Do').doc(key).get().then(object => {
        done = object.todo
        var donedate = object.tododate
        db.collection('Done_ToDo').add({
            todo: done,
            tododate: donedate
        })
    })
    db.collection('Things_To_Do').doc(key).delete()
    location.reload()
}

function deleteRows(){
    var Parent = document.getElementById('TableTodos');
    while(Parent.hasChildNodes())
    {
       Parent.removeChild(Parent.firstChild);
    }
    
}

function fillUp(j, object, todoToday){
    var tr = document.createElement("TR")
    todoToday.appendChild(tr)
    var td1 = document.createElement("TD")
    td1.innerHTML = object[j].data.todo
    tr.appendChild(td1)
    var td2 = document.createElement("TD")
    td2.innerHTML  = object[j].data.from
    tr.appendChild(td2)
    var td3 = document.createElement("TD")
    td3.innerHTML  = object[j].data.till
    tr.appendChild(td3)
    // var td4 = document.createElement("TD")
    // td4.innerHTML  = object[j].data.tododate
    // tr.appendChild(td4)
    var td5 = document.createElement("td")
    td5.classList.add("material-icons")
    td5.setAttribute("id", object[j].key)
    td5.innerHTML = "delete"
    td5.onclick = function(){deleteTodo(this.id)}
    tr.appendChild(td5)
    var td6 = document.createElement('td')
    td6.classList.add("material-icons")
    td6.innerHTML = "check"
    td6.setAttribute("id", object[j].key)
    td6.onclick = function(){Done(this.id)}
    tr.appendChild(td6)
}
