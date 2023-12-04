
const api_url = "http://192.168.1.15:1234/users";


function loadData(records = []) {
  var table_data = "";
  for (let i = 0; i < records.length; i++) {
    table_data += `<tr>`;
    table_data += `<td>${records[i]["fund_id"]}</td>`;
    table_data += `<td>${records[i]["fund_name"]}</td>`;
    table_data += `<td>${records[i]["fund_type"]}</td>`;
    table_data += `<td>${records[i]["inception_date"]}</td>`;
    table_data += `<td>${records[i]["fund_manager"]}</td>`;
    table_data += `<td>`;
    table_data += `<a href="edit.html?fund_id=${records[i]["fund_id"]}"><button class="btn btn-primary">Edit</button></a>`;
    table_data += '&nbsp;&nbsp;';
    table_data += `<button class= "btn btn-danger" onclick=deleteData('${records[i]["fund_id"]}')>Delete</button>`;
    table_data += `</td>`;
    table_data += `</tr>`;
  }
  console.log(table_data);
  document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      loadData(data);
    });
}

function getDataByID(fund_id) {
  fetch(`${api_url}edit?fund_id=${id}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("fund_id").value = data[0]["fund_id"];
      document.getElementById("fund_name").value = data[0]["fund_name"];
      document.getElementById("fund_type").value = data[0]["fund_type"];
      document.getElementById("inception_date").value = new Date(data[0]['inception_date']).toISOString().split('T')[0];
      document.getElementById("fund_manager").value = data[0]["fund_manager"];
    });
}




function postData() {
        var fund_id = document.getElementById("fund_id").value;
	var fund_name = document.getElementById("fund_name").value;
        var fund_type = document.getElementById("fund_type").value;
        var inception_date = document.getElementById("inception_date").value;
        var fund_manager = document.getElementById("fund_manager").value;

        data = {fund_id:fund_id,fund_name: fund_name, fund_type: fund_type, inception_date: inception_date,fund_manager: fund_manager};

        fetch(api_url, {
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
                window.location.href = "index.html";
        });
}	
 

function putData() {
  var fund_id = document.getElementById("fund_id").value;
  var fund_name = document.getElementById("fund_name").value;
  var fund_type = document.getElementById("fund_type").value;
  var inception_date_input = document.getElementById("inception_date").value;
  var fund_manager = document.getElementById("fund_manager").value;

  // Convert the input date to YYYY-MM-DD format
  var inception_date = new Date(inception_date_input).toISOString().slice(0, 10);

  var data = { fund_id: fund_id, fund_name: fund_name, fund_type: fund_type, inception_date: inception_date, fund_manager: fund_manager };
  console.log(data)
  fetch(api_url, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
      console.table(data);
      window.location.href = "index.html";
    })
}
	

function deleteData(fund_id) {
        console.log(fund_id);
        user_input = confirm("Are you sure you want to delete this record?");
        if(user_input) {
                fetch(api_url+"?fund_id="+fund_id, {
                        method: "DELETE",
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        },
                        //body: JSON.stringify({"id": id})
                })
                .then((response) => response.json())
                .then((data) => {
                        console.log(data);
                        window.location.reload();
                })
        }
}

