var fs = require('fs');

var parseInstruction = process.argv.slice(2);
var task = {};
var file = 'task.json';
var taskToDo = [];

taskToDo = getTasksFromFile(file);
//console.log(taskToDo);

if (parseInstruction[0] === undefined){
    parseInstruction.push('help');
}
//console.log(parseInstruction[0]);

switch (parseInstruction[0]){
    case undefined:
    case 'help': {
        printHelp();
        break;
    }
    case 'list': {
        printList();
        break; 
    }
    case 'add': {
        task.task = parseInstruction[1];
        addTask(taskToDo, task, file);
        break;
    }
    
    case 'update': {
        var index = Number (parseInstruction[1]) - 1;
        updateTask(taskToDo, index, file); 
        break; 
    }
    
    case 'remove':{
        var index = Number(parseInstruction[1]) - 1;
        removeTask(taskToDo, index, file);
        //removeTask(taskTodo, index, file);
            break;
    }
    case 'reset': {
        
        break;
    }
    default: 
        printHelp();
}

function saveTaskList(taskToDo, file){
    try{
        var obj = JSON.stringify(taskToDo);
        fs.writeFileSync(file, obj);
    }catch (error){
        console.log(error.message);
    }
    
}

function printHelp() {
    var data = '';
    try{
        data = fs.readFileSync('help.txt','utf-8');
        console.log(data);
    }
    catch(error){
        if(error){
            if (error.code === 'ENOENT'){
               console.log("File not found"); 
            }
        }
        else {
            console.log(error.message);
        }
    }
}

function printList(){
    var length = taskToDo.length;
    if (length > 0){
        for (var i = 0; i <taskToDo.length;i++){
        console.log((i + 1) + ': ' + taskToDo[i]. task);
        }
    }
    else{
        console.log("There is no tasks to do");
        console.log(` 
To add an item to your todo's:
e.g.
node index.js add "I need to brush my teeth" `);
   }
}

function addTask(taskToDo, task, file){
    taskToDo.push(task);
    saveTaskList(taskToDo, file);
    console.log("The task has been added.");
}
function updateTask(taskToDo, index, file){
    if ((taskToDo.length > 0)&&(index >= 0) && (index <= taskToDo.length)){
            taskToDo[index].task = parseInstruction[2];
            saveTaskList(taskToDo, file);
            printList();
    }
    else{
        console.log("Wrong task number or the task is not exist.");
    }
}

function removeTask(taskToDo, index, file){
    if ((taskToDo.length > 0)&&(index >= 0) && (index <= taskToDo.length)){
        taskToDo.splice(index, 1);
        saveTaskList(taskToDo, file);
        console.log('the task has been removed');
    }
    else{
        console.log("Wrong task number or the task is not exist.");
    }
}

function resetTasks(taskToDo, index, file){
    var taskNumber = taskToDo.length;
    if(taskNumber > 0){
        taskToDo.length = 0;
        saveTaskList(taskToDo, file);
        console.log("All tasks(" + taskNumber + ") have been deleted");
    }
}
    
function getTasksFromFile(file){
    var data = '';
    var arr =[];
    try{
      data = fs.readFileSync(file,'utf-8');
      //console.log(data)  ;  
    }
    catch(error){
        if(error){
            if (error.code === 'ENOENT'){
                
            }
        }
        else {
            console.log(error.message);
        }
    }
    if (data !== ''){
        data = data.slice(1,data.length-1);
        arr = JSON.parse('['+ data +']') ; 
    }
    
    return arr;
}
