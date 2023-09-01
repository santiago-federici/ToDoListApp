const addBtn = document.querySelector('.add-btn')
const inputField = document.querySelector('.input-field')
const tasksList = document.querySelector('.tasks-list')

const tasksArray = JSON.parse(window.localStorage.getItem('tasksArray')) || []

let todoId = tasksArray.length > 0 ? Math.max(...tasksArray.map(todo => todo.id)) + 1 : 1

function generateNextId() {
  return todoId++
}
function addTask() {
  const text = inputField.value
  if (text) {
    const todo = {
      id: generateNextId,
      text,
      completed: false
    }

    createElements(todo)

    inputField.value = ''
    tasksArray.push(todo)
    console.log(tasksArray)
    saveToLocalStorage()
  } else {
    console.log('no')
    // add a <p>You can't add an empty task</p>
  }
}

function markDone(btn, a, todo) {
  if (btn.classList.contains('done')) {
    btn.classList.remove('done')
    a.style.textDecoration = 'none'
    todo.completed = false
  } else {
    btn.classList.add('done')
    a.style.textDecoration = 'line-through'
    todo.completed = true
  }
  saveToLocalStorage()
}
function removeItem(li, todo) {
  tasksList.removeChild(li)

  const index = tasksArray.findIndex(item => item.id === todo.id)
  if (index !== -1) {
    tasksArray.splice(index, 1)
    saveToLocalStorage()
  }
}

function saveToLocalStorage() {
  window.localStorage.setItem('tasksArray', JSON.stringify(tasksArray))
}

function createElements(todo) {
  const li = document.createElement('li')
  li.classList.add('task-item')
  const checkBtn = document.createElement('button')
  checkBtn.classList.add('check-icon')
  checkBtn.addEventListener('click', () => markDone(checkBtn, a, todo))
  const a = document.createElement('a')
  a.innerHTML = todo.text
  const p = document.createElement('p')
  p.innerHTML = '\u00d7'
  p.addEventListener('click', () => removeItem(li, todo))

  if (todo.completed === true) {
    checkBtn.classList.add('done')
    a.style.textDecoration = 'line-through'
    todo.completed = true
  }

  li.appendChild(checkBtn)
  li.appendChild(a)
  li.appendChild(p)

  tasksList.appendChild(li)
}

window.addEventListener('load', () => {
  for (const todo of tasksArray) {
    createElements(todo)
  }
})

addBtn.addEventListener('click', addTask)
