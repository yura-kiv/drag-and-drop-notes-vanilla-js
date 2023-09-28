let tasks = document.querySelectorAll('.task');
let columns = document.querySelectorAll('.table-column');
let takenDragElem = null;

tasks.forEach(item => item.setAttribute("draggable", true));

tasks.forEach(function(task) {
    task.addEventListener('dragstart', handleDragStart, false);
    task.addEventListener('dragend', handleDragEnd, false);
    // task.addEventListener('dragenter', handleDragEnter, false);
    // task.addEventListener('dragover', handleDragOver, false);
    // task.addEventListener('dragleave', handleDragLeave, false);
    // task.addEventListener('drop', handleDrop, false);
});

columns.forEach(function(column){
    column.addEventListener('dragover', handleDragOverColumn, false)
})

function refreshTasks(){
    tasks = document.querySelectorAll('.task');
}
  
function handleDragStart(event) {
    takenDragElem = this;
    this.style.opacity = "0.3";
    this.classList.add("picked");
    tasks.forEach(item => item.classList.add("over"));
}

function handleDragEnd(event) {
    this.style.opacity = "1";
    this.classList.remove("picked");
    tasks.forEach(item => item.classList.remove("over"));
}

function handleDragOver(event) {
}

function handleDragEnter(event) {
}

function handleDragLeave(event) {
}

function handleDrop(event) {
}

/////// FOR Columns

function handleDragOverColumn(event){
    event.preventDefault(); // Дозволяє вставку
    const afterElement  = getDragAfterElement(this, event.clientY);
    if(afterElement == null){
        this.appendChild(takenDragElem);
    }
    else{
        this.insertBefore(takenDragElem, afterElement);
    }
}

////// Extra functions

function getDragAfterElement(column, y){
   let columnTasks = [...column.querySelectorAll(".task:not(.picked)")];
   return columnTasks.reduce((closest, task) => {
        const box = task.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if(offset < 0 && offset > closest.offset){
            return {element: task }
        }
        else{
            return closest;
        }
   }, {offset: Number.NEGATIVE_INFINITY}).element;
}