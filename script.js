"use strict";

const Task = (desc) => {
    const taskId = Date.now();
    let isFinished = false;
    const getDesc = () => desc;
    const getIsFinished = () => isFinished;
    const getTaskId = () => taskId;
    const switchStatus = () => {
        isFinished = !isFinished;
    };

    return {
        getDesc,
        getIsFinished,
        getTaskId,
        switchStatus,
    };
};

const TaskList = () => {
    const items = [];
    const addItem = (item) => {
        items.push(item);
    };
    const removeItem = (itemId) => {
        const removeItemIndex = items.findIndex(
            (item) => item.getTaskId() == itemId
        );
        items.splice(removeItemIndex, 1);
    };
    return { items, addItem, removeItem };
};

const taskList = TaskList();

const renderNewTask = (newTask) => {
    const ul = document.querySelector(".task-list");
    const li = document.createElement("li");
    li.setAttribute("id", `${newTask.getTaskId()}`);
    li.setAttribute("class", "task");
    const span = document.createElement("div");
    span.setAttribute("class", "task_content");
    span.textContent = `${newTask.getDesc()}`;
    const button = document.createElement("button");
    button.setAttribute("class", "task_delete");
    button.textContent = "X";
    li.append(span, button);
    ul.appendChild(li);
};

const submitHandlerForm = (e) => {
    e.preventDefault();
    const input = document.querySelector(".task-input");
    if (input.value !== "") {
        throwMsg("Let's do it!");
        const newTask = Task(input.value.trim());
        taskList.addItem(newTask);
        renderNewTask(newTask);
        input.value = "";
    } else {
        throwMsg("Input cannot be empty!");
    }
};

const throwMsg = (msg) => {
    const input = document.querySelector(".task-input");
    input.setAttribute("placeholder", `${msg}`)
}

const renderRemoveTask = (clickedTaskEle) => {
    clickedTaskEle.remove();
};

const clickHandlerList = (e) => {
    if (e.target.tagName !== "BUTTON") {
        return;
    } else {
        const clickedTaskEle = e.target.parentElement;
        taskList.removeItem(clickedTaskEle.id);
        renderRemoveTask(clickedTaskEle);
        console.log(taskList.items);
        if (taskList.items.length === 0) {
            throwMsg("Congrats! You've done all your task.");
        }
    }
};

const form = document.querySelector(".task-form");
const list = document.querySelector(".task-list");

form.addEventListener("submit", submitHandlerForm);
list.addEventListener("click", clickHandlerList);