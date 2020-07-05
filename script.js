{
  const tasks = [{

    content: "clean the kitchen",
    done: false,
  }, {
    content: "call to mama",
    done: false,
  }];

  const render = () => {

    let htmlText = "";

    for (const task of tasks) {
      htmlText += ` <li     class="section__taskItem"><button class="taskItem__button taskItem__button--doneTask js-done"><i
      class="fas fa-plus"></i><i class="fas fa-check hide"></i></button>
      <p>${task.content}</p><button class=" taskItem__button taskItem__button--removeTask js-remove"><i
      class="fas fa-trash"></i></button>
      </li>`

    };
    document.querySelector(".js-taskList").innerHTML = htmlText;
  };

  const addNewTask = () => {

    const newTaskContent = document.querySelector(".js-newTask").value.trim()

    if (newTaskContent !== "") {
      tasks.push({
        content: newTaskContent,
      });
      render();
    }
  };
  const onFormSubmit = (event, ) => {
    event.preventDefault();

    addNewTask()
  }

  const init = () => {
    render();
    const form = document.querySelector(".js-form")
    form.addEventListener("submit", onFormSubmit)
  }
  init()
}