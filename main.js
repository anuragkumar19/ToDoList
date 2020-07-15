let delAllBtn = document.getElementById('delAllBtn');
// Delete All Items
delAllBtn.addEventListener('click', ()=> {
  localStorage.removeItem("tasks");
  location.reload();
});

// Chevk if task exist in the localStorage
if (localStorage.tasks === undefined) {
  localStorage.tasks = JSON.stringify([]);
}

// Submit form Local Storage Control
let form = document.getElementById('newTaskForm');
//@Comment
form.addEventListener('submit', (e)=> {
  e.preventDefault();
  //Getting value

  let titleInp = document.getElementById('titleInp').value;
  let descInp = document.getElementById('descInp').value;
  let dateInp = document.getElementById('dateInp').value;
  let dateId = dateInp.replace('-', '')
  dateId = dateId.replace('-', '')
  dateId = parseInt(dateId)



  //Creating Object
  let dataObj = {
    title: titleInp,
    desc: descInp,
    dateString: dateInp,
    dateId
  }

  let dataArr = localStorage.tasks
  dataArr = JSON.parse(dataArr)
  dataArr.push(dataObj)
  dataArr = JSON.stringify(dataArr)
  localStorage.tasks = dataArr

  $('button[data-dismiss="modal"]').click()
  location.reload()
});

//Getting today date id
let date = new Date().getDate().toString()
let month = new Date().getMonth()+1
month = month.toString()
let year = new Date().getFullYear().toString()
let todayDateId = `${year}${(month.length == 2)?month: `0${month}`}${(date.length == 2)?date: `0${date}`}`
todayDateId = parseInt(todayDateId)


// Reading and Displaying forn localStorage

let taskArr = localStorage.tasks
taskArr = JSON.parse(taskArr)
taskArr.forEach(task => {
  let index = taskArr.indexOf(task)

  let trhtml = `
  <tr>
  <th scope="row">${index+1}</th>
  <td>${task.title}</td>
  <td>${task.dateString}</td>
  <td>
  <button class="btn btn-info" data-toggle="modal" data-target="#taskInfoMadal${index}">Show more</button>
  <button class="btn btn-danger" onclick="delOne(${index})">Delete</button>
  </td>
  <td>
  <!-- Modal -->
  <div class="modal fade" id="taskInfoMadal${index}" tabindex="-1" role="dialog" aria-labelledby="taskInfoMadal${index}Label" aria-hidden="true">
  <div class="modal-dialog">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="taskInfoMadal1Labe${index}">${task.title}</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <h4>Date : ${task.dateString}</h4>
  <h4>Description</h4>
  <p>
  ${task.desc}
  </p>
  </div>
  <div class="modal-footer">
  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
  </div>
  </div>
  </div>
  </div>
  <!--/Modal-->
  </td>
  </tr>
  `
  if (task.dateId === todayDateId) {
    $('#tbodyoftoday').append(trhtml)
  } else if (task.dateId < todayDateId) {
    $('#tbodyofpast').append(trhtml)
  } else {
    $('#tbodyofupcoming').append(trhtml)
  }

});

function delOne(index) {
  let dataArr = localStorage.tasks
  dataArr = JSON.parse(dataArr)
  dataArr.splice(index,
    1)

  dataArr = JSON.stringify(dataArr)
  localStorage.tasks = dataArr
  console.log(index)
  location.reload()
}