{
  let tasks = [];

  const removeTask = (index) => {
    tasks = [
      ...tasks.slice(0, index), ...tasks.slice(index + 1)
    ]
    render();
  };

  const addNewTask = () => {

    const newTaskContent = document.querySelector(".js-newTask").value.trim()
    const markAllTasksCompltedButton = document.querySelector(".js-markAllDoneTasks")

    if (newTaskContent !== "") {
      tasks = [
        ...tasks,
        {
          content: newTaskContent
        },
      ];
      render();
    };
    document.querySelector(".js-newTask").value = ""
  };

  const toggleTaskDone = (doneButton, index) => {
    tasks = [
      ...tasks.slice(0, index),
      {
        ...tasks[index],
        done: !tasks[index].done
      },
      ...tasks.slice(index + 1)
    ];
    render();
  };

  const markAllTasksComplted = () => {
    const markAllTasksCompltedButton = document.querySelector(".js-markAllDoneTasks");


    const isAnyTaskDone = tasks.some(({
      done
    }) => !done)
    if (isAnyTaskDone) {
      tasks.map(task => task.done = true);
      markAllTasksCompltedButton.disabled = true;
    }

    render();
  };

  const bindRemoveEvent = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index)
      });
    });
  };

  const bindToggleDoneButtonsEvent = () => {
    const doneButtons = document.querySelectorAll(".js-done");

    doneButtons.forEach((doneButton, index) => {
      doneButton.addEventListener("click", () => {
        toggleTaskDone(doneButton, index);
      });
    });
  };

  const bindMarkAllTasksCompltedButtonEvent = () => {

    const markAllTasksCompltedButton = document.querySelector(".js-markAllDoneTasks");

    markAllTasksCompltedButton.addEventListener("click", markAllTasksComplted);
  }

  const renderTaskContent = () => {
    let htmlText = "";

    for (const task of tasks) {
      htmlText +=
        `<li class="section__taskItem">
        <button class="taskItem__button taskItem__button--doneTask js-done">
    ${task.done ?'<i class="js-checkIcon fas fa-check"></i>': '<i class= "js-plusIcon fas fa-plus"></i>'}
        </button>
        <p class="js-paragraph list__paragraph ${ task.done ? "list__paragraph--done" : "" }" > ${task.content}</p> 
        <button class=" taskItem__button taskItem__button--removeTask js-remove">
          <i class="fas fa-trash"></i></button>
      </li>`
    };

    document.querySelector(".js-taskList").innerHTML = htmlText;
  };

  document.querySelector(".js-markAllDoneTasks").addEventListener("click", markAllTasksComplted);

  const render = () => {

    renderTaskContent();
    bindRemoveEvent();
    bindToggleDoneButtonsEvent();
    bindMarkAllTasksCompltedButtonEvent();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    addNewTask();
    document.querySelector(".js-newTask").focus();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
};