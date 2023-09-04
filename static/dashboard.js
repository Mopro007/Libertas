const retrieve_btn = document.getElementById("Retrieve")
const table = document.getElementById("table")
retrieve_btn.addEventListener("click",Retrieve_Func)
function Retrieve_Func(){
    fetch('/Retrieve')
        .then(response => response.json())
        .then(data => {
            const data_dict = data
            for (let key in data_dict){
                setTimeout(() => {
                  console.log(key,data_dict[key]);
                  var row = table.insertRow(-1);
                  var cell1 = row.insertCell(0);
                  var cell2 = row.insertCell(1);
                  var cell3 = row.insertCell(2);
                  cell1.innerHTML = key;
                  cell2.innerHTML = data_dict[key][0];
                  cell3.innerHTML = data_dict[key][1];
                }, 100);
            }
        })
        .catch(error => {console.error('There was a problem with the fetch operation:', error);});
}