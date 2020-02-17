var main = new function(){

  this.priority = ['Critical', 'High', 'Medium', 'Low', 'Very low'];
  this.resp = [
                {ID: '1', To_do: 'Create Clojure demo', Priority: this.priority[1], Deadline: '2020-02-20T23:59'},
                {ID: '2', To_do: 'Figure out what Clojure actually is', Priority: this.priority[1], Deadline: '2020-02-20T23:59'},
                {ID: '3', To_do: 'Try to manage your time in a way that will allow you to deliver some sort of valuable demo in a reasonable time', Priority: this.priority[0], Deadline: '2020-02-20T23:59'}
              ];
  this.headers = [];

  //create table that contains data extracted from json objects array
  this.createTable = function(){
    this.table = document.createElement('table');
    this.table.setAttribute('id', 'resp_table');
    var tr = this.table.insertRow(-1);

    for(var i = 0; i < Object.keys(this.headers).length; i++){
      var tableHeader = document.createElement('th');
      tableHeader.innerHTML = this.headers[i].replace('_', ' ');
      tr.appendChild(tableHeader);
    }

    for(var i = 0; i < Object.keys(this.resp).length; i++){
      var tableRow = this.table.insertRow(-1);

      for(var j = 0; j < this.headers.length; j++){
        var tableCell = tableRow.insertCell(-1);
        if(j != 3){
          tableCell.innerHTML = this.resp[i][this.headers[j]];
        }else{
          tableCell.innerHTML = this.resp[i][this.headers[j]].replace('T', ' &#8198 | &#8198 ');
        }
        
      }
      this.td = document.createElement('td');

      tableRow.appendChild(this.td);
      
      // update button
      var updateButton = document.createElement('input');

      updateButton.setAttribute('type', 'button');
      updateButton.setAttribute('value', 'Update');
      updateButton.setAttribute('id', 'Update' + i);
      updateButton.setAttribute('onclick', 'main.update(this)');
      this.td.appendChild(updateButton);
      
      // save button
      tableRow.appendChild(this.td);
      var saveButton = document.createElement('input');

      saveButton.setAttribute('type', 'button');
      saveButton.setAttribute('value', 'Save');
      saveButton.setAttribute('id', 'Save' + i);
      saveButton.setAttribute('style', 'display:none;');  //defaulty hidden 
      saveButton.setAttribute('onclick', 'main.save(this)');
      this.td.appendChild(saveButton);
      
      // cancel button
      tableRow.appendChild(this.td);
      var cancelLabel = document.createElement('label');
      
      cancelLabel.innerHTML = '✖';
      cancelLabel.setAttribute('style', 'display:none;'); //defaulty hidden 
      cancelLabel.setAttribute('title', 'Cancel');
      cancelLabel.setAttribute('id', 'Cancel' + i);
      cancelLabel.setAttribute('onclick', 'main.cancel(this)');
      this.td.appendChild(cancelLabel);
      
      // delete button
      this.td = document.createElement('th');
      tableRow.appendChild(this.td);
      var deleteButton = document.createElement('input');
      deleteButton.setAttribute('type', 'button');
      deleteButton.setAttribute('value', 'Delete');
      deleteButton.setAttribute('style', 'background-color:#ED5650;');
      deleteButton.setAttribute('onclick', 'main.delete(this)');
      this.td.appendChild(deleteButton);
    }

    var div2 = document.getElementById('container');
    
    //clear div every single time function is called
    div2.innerHTML = '';
    //push table to the website
    div2.appendChild(this.table);
  }

  //create panel that is used to add new records
  this.createPanel = function(){
    this.panel = document.createElement('table');
    this.panel.setAttribute('id', 'resp_panel');

    //extract values for the headers
    for(var key in this.resp[0]){
      if(this.headers.indexOf(key) === -1){
        this.headers.push(key);
      }
    }   

    var tr = this.panel.insertRow(-1);
    //start from 1 to ommit ID column
    for(var i = 1; i < Object.keys(this.headers).length; i++){
      var tableHeader = document.createElement('th');
      tableHeader.innerHTML = this.headers[i].replace('_', ' ');
      tr.appendChild(tableHeader);
    }

    tableRow = this.panel.insertRow(-1);
    for(var j = 1; j < this.headers.length; j++){
      var newCell = tableRow.insertCell(-1);
      if(j > 0){

        if(j == 2){
          var dropDown = document.createElement('select');
          dropDown.setAttribute('class', 'dropdown');
          for (k = 0; k < this.priority.length; k++) {
            dropDown.innerHTML = dropDown.innerHTML +
              '<option value="' + this.priority[k] + '">' + this.priority[k] + '</option>';
          }
          newCell.appendChild(dropDown); 
        }
        else if(j == 3){
          var date = document.createElement('input');
          date.setAttribute('class', 'date');
          date.setAttribute('type', 'datetime-local');
          date.setAttribute('id', 'date_input');
          newCell.appendChild(date);
        } 
        else{
          var tBox = document.createElement('input'); 
          tBox.setAttribute('type', 'text');
          tBox.setAttribute('class', 'raw_input');
          tBox.setAttribute('value', '');
          newCell.appendChild(tBox);         
        }
      }
    }

    this.tableCell = document.createElement('td');
    tr = this.panel.insertRow(-1);
    var addRow = document.createElement('td');
    addRow.setAttribute('colspan', '3');
    this.panel.appendChild(addRow);

    //add button
    var addButton = document.createElement('input');
    addButton.setAttribute('type', 'button');
    addButton.setAttribute('value', 'Create');
    addButton.setAttribute('id', 'Save');;
    addButton.setAttribute('onclick', 'main.add(this)');
    addRow.appendChild(addButton);


    var div1 = document.getElementById('panel');
    div1.appendChild(this.panel);
  }

  // method that creates new record
  this.add = function (button) {
    //get relevant row that contains needed data
    var data = document.getElementById('resp_panel').rows[1];
    var obj = {};
    //extact data from the row and collect it inside temporary json object;
    for (i = 1; i < Object.keys(this.headers).length; i++) {
      var td = data.getElementsByTagName("td")[i - 1];
      var value = td.childNodes[0].value;
      if (value != '') {
        obj[this.headers[i]] = value.trim();
      }
      else {
        obj = '';
        alert('all fields are compulsory');
        break;
      }
    }
    //add ID to the object into relevant position
    obj[this.headers[0]] = Object.keys(this.resp).length + 1; 
    //push temporary object into responsibilities array
    if (Object.keys(obj).length > 0){
      this.resp.push(obj);
      this.createTable();
      //remove data inserted by user from the table cells
      for (i = 1; i < Object.keys(this.headers).length; i++) {
        var td = data.getElementsByTagName("td")[i - 1];
        if(i != 2){
          td.childNodes[0].value = ''; 
        }else{
          td.childNodes[0].value = this.priority[0];
        }
      }
    }
  }
  
  // method that updates existing record
  this.update = function(button){
    
    //get current row
    var currentRow = button.parentNode.parentNode.rowIndex;
    var table = document.getElementById('resp_table').rows[currentRow];
    
    //allow user to enter new data
    for (i = 1; i < 4; i++) {
      //dropdown cell
      if (i == 2) {
        var td = table.getElementsByTagName("td")[i];
        
        var dropDown = document.createElement('select');
        dropDown.setAttribute('class', 'dropdown');
        //to keep original value
        dropDown.innerHTML = '<option value="' + td.innerText + '">' + td.innerText + '</option>';
        for (k = 0; k < this.priority.length; k++) {
          dropDown.innerHTML = dropDown.innerHTML +
            '<option value="' + this.priority[k] + '">' + this.priority[k] + '</option>';
        }
        td.innerText = '';
        td.appendChild(dropDown);
      }
      //date cell
      else if(i == 3){
        var td = table.getElementsByTagName('td')[i];
        var date = document.createElement('input');
        date.setAttribute('type', 'datetime-local');
        date.setAttribute('id', 'date_input'); 
        date.setAttribute('value', this.resp[currentRow - 1].Deadline);
        td.innerText = '';
        td.appendChild(date);
      }
      //textbox cell
      else {
        var td = table.getElementsByTagName("td")[i];
        var tBox = document.createElement('input');      // TEXTBOX.
        tBox.setAttribute('type', 'text');
        tBox.setAttribute('value', td.innerText);
        td.innerText = '';
        td.appendChild(tBox);
      }
    }
    
    //hide and display relevant buttons
    //id of the button is always 1 less than currentRow
    var cancelLabel = document.getElementById('Cancel' + (currentRow - 1));
    cancelLabel.setAttribute('style', 'cursor:pointer; display:block;');
    
    var saveButton = document.getElementById('Save' + (currentRow - 1));
    saveButton.setAttribute('style', 'display:block; float:left; margin-right:10px;');
    
    button.setAttribute('style', 'display:none;')
  }
  
  //method that deletes existing record
  this.delete = function (button) {
    var currentRow = button.parentNode.parentNode.rowIndex;
    this.resp.splice((currentRow - 1), 1);
    this.createTable();
  };

  // method that saves the input
  this.save = function(button){
    var currentRow = button.parentNode.parentNode.rowIndex;
    var table = document.getElementById('resp_table').rows[currentRow];  
    
    for(i = 1; i < Object.keys(this.headers).length; i++){
      var td = table.getElementsByTagName('td')[i];
      this.resp[(currentRow - 1)][this.headers[i]] = td.childNodes[0].value;
    }
    this.createTable();
  }

  // method that cancels updating data without losing previous/updated record 
  this.cancel = function(button){
    var currentRow = button.parentNode.parentNode.rowIndex;
    var table = document.getElementById('resp_table').rows[currentRow]; 
    
    for (i = 0; i < Object.keys(this.headers).length; i++) {
      var td = table.getElementsByTagName("td")[i];
      td.innerHTML = this.resp[(currentRow - 1)][this.headers[i]];
    }
    
    //hide cancel button
    button.setAttribute('style', 'display:none; float:none;');
    
    //hide save button
    var saveButton = document.getElementById('Save' + (currentRow - 1));
    saveButton.setAttribute('style', 'display:none;');
    
    //show update button again
    var updateButton = document.getElementById('Update' + (currentRow - 1));
    updateButton.setAttribute('style', 'display:block; margin: auto');

  }

};

//wait until html is loaded and run logic 
document.addEventListener("DOMContentLoaded", function(event) { 
  main.createPanel();
  main.createTable();
});
