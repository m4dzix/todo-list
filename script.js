{
  let tasks = [];
  let hideDoneTasks = false;

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


  const toggleCompletedTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const markAllTasksComplted = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true
    }));
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

  const bindToggleCompletedTasks = () => {
    const toggleCompletedTasksButton = document.querySelector('.js-toggleHideAllDoneTasks')
    toggleCompletedTasksButton.addEventListener("click", toggleCompletedTasks);
  };

  const bindMarkAllTasksCompltedButtonEvent = () => {

    const markAllTasksCompltedButton = document.querySelector(".js-markAllDoneTasks");
    markAllTasksCompltedButton.addEventListener("click", markAllTasksComplted);
  }

  const renderTaskContent = () => {
    let htmlText = "";

    for (const task of tasks) {
      htmlText +=
        `<li class="section__taskItem ${task.done && hideDoneTasks ? "section__taskItem--hidden" : ""}">
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

  const renderButtons = () => {
    let htmlButtonsText =
      `
      <button class="section__button js-toggleHideAllDoneTasks">
        ${hideDoneTasks ? "show" : "hide"} completed tasks
      </button>
      <button class="section__button js-markAllDoneTasks" ${tasks.every(({
      done}) => done) ? "disabled":""}>
        Mark all tasks as completed
      </button>
      `;

    const sectionButton = document.querySelector(".section__toggleButtons")
    sectionButton.innerHTML = htmlButtonsText;

    if (tasks.length) {
      sectionButton.classList.remove("section__button--hidden")
    } else {
      sectionButton.classList.add("section__button--hidden")
    };
  };

  const render = () => {
    renderButtons();
    renderTaskContent();
    bindRemoveEvent();
    bindToggleDoneButtonsEvent();
    bindToggleCompletedTasks();
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