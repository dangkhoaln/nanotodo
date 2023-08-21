"use strict";

const Task = (desc) => {
    const taskId = Date.now();
    const getDesc = () => desc;
    const getTaskId = () => taskId;
    return {
        getDesc,
        getTaskId,
    };
};

const TaskList = () => {
    const items = [];
    const addItem = (item) => {
        items.push(item);
    };
    const getItem = (taskId) => {
        return items.find(
            (item) => item.getTaskId() == taskId
        )
    }
    const getItemIndex = (taskId) => {
        return items.findIndex(
            (item) => item.getTaskId() == taskId
        )
    };
    const removeItem = (taskId) => {
        items.splice(getItemIndex(taskId), 1);
    };
    return { items, addItem, getItem, getItemIndex, removeItem };
};

const taskList = TaskList();

const renderNewTask = (newTask) => {
    const ul = document.querySelector(".task-list");
    const li = document.createElement("li");
    const span = document.createElement("div");
    const button = document.createElement("button");
    li.setAttribute("id", `${newTask.getTaskId()}`);
    li.setAttribute("class", "task");
    span.setAttribute("class", "task_content");
    span.textContent = `${newTask.getDesc()}`;
    button.setAttribute("class", "task_delete");
    button.textContent = "\u00D7"; // Cross mark for delete button
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

const clickHandlerList = (e) => {
    const clickedEle = e.target;
    if (clickedEle.classList.contains("task")) {
        const taskId = clickedEle.id;
        renderTaskStatus(clickedEle);
    }
    else if (clickedEle.classList.contains("task_content")) {
        const taskId = clickedEle.parentElement.id;
        renderTaskStatus(clickedEle.parentElement);
    }
    else {
        const taskId = clickedEle.parentElement.id;
        clickedEle.parentElement.remove();
    }
}

const renderTaskStatus = (taskEle) => {
    if (!taskEle.classList.contains("task--checked")) {
        taskEle.classList.add("task--checked");
    } else {
        taskEle.classList.remove("task--checked");
    }
}
const throwMsg = (msg) => {
    const input = document.querySelector(".task-input");
    input.setAttribute("placeholder", `${msg}`)
}

const form = document.querySelector(".task-form");
const list = document.querySelector(".task-list");

form.addEventListener("submit", submitHandlerForm);
list.addEventListener("click", clickHandlerList);