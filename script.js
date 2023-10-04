document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // ローカルストレージからタスクを読み込み、初期化する
  function initializeTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTask(task));
  }

  // タスクを追加し、ローカルストレージに保存
  function addTask(taskText) {
    const taskItem = document.createElement("li");
    taskItem.innerText = taskText;

    // Add a remove button
    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.addEventListener("click", function () {
      removeTask(taskText);
      taskList.removeChild(taskItem);
    });

    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);
    taskInput.value = "";

    // タスクをローカルストレージに保存
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // タスクを削除し、ローカルストレージからも削除
  function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(taskText);
    if (index !== -1) {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  // タスク追加ボタンがクリックされたときの処理
  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
    }
  });

  // 初期化を呼び出すことで、既存のタスクを読み込む
  initializeTasks();
});
