{
  const tasks = [{

    content: "clean the kitchen",
    done: false,
  }, {
    content: "call to mama",
    done: false,
  }, ];

  const removeTask = (index) => {
    tasks.splice(index, 1);
    render();
  }


  const changeParagraphColorIfDone = (index) => {
    const tasksToDo = document.querySelectorAll(".js-paragraph");

    tasksToDo.forEach((taskToDo, index) => {

      tasks[index].done === true ? taskToDo.style.backgroundColor = "rgba(0,0,0,.5)" : taskToDo.style.backgroundColor = "transparent";

    })

  }
  const changeButtonColorIfDone = (doneButton, index) => {
    tasks[index].done = !tasks[index].done;

    tasks[index].done === true ? doneButton.style.backgroundColor = "darkgreen" : doneButton.style.backgroundColor = "chartreuse";
  }
  const render = () => {

    let htmlText = "";

    for (const task of tasks) {
      htmlText += ` <li     class="section__taskItem"><button class="taskItem__button taskItem__button--doneTask js-done"><i
      class="js-icon fas fa-plus "></i><i class="js-icon fas fa-check hide"></i></button>
      <p class="js-paragraph list__paragraph">${task.content}</p><button class=" taskItem__button taskItem__button--removeTask js-remove"><i
      class="fas fa-trash"></i></button>
      </li>`

    };

    document.querySelector(".js-taskList").innerHTML = htmlText;

    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index)

      });
    });


    const doneButtons = document.querySelectorAll(".js-done");

    doneButtons.forEach((doneButton, index) => {
      doneButton.addEventListener("click", () => {

        changeButtonColorIfDone(doneButton, index);
        changeParagraphColorIfDone(index);


        //   const icons = document.querySelectorAll(".js-icon")


        //   icons.forEach((icon) => {
        //  icon.classList.toggle("hide")
        //   })


      });
    })

  };

  const addNewTask = () => {

    const newTaskContent = document.querySelector(".js-newTask").value.trim()

    if (newTaskContent !== "") {
      tasks.push({
        content: newTaskContent,
      });

      render();
    };
    document.querySelector(".js-newTask").value = ""
  };


  const onFormSubmit = (event) => {
    event.preventDefault();

    addNewTask();

  };


  const init = () => {


    const form = document.querySelector(".js-form")
    form.addEventListener("submit", onFormSubmit);

    render();
  }
  init()
}