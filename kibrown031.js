
let topofpage = document.querySelector('.div-date-value');
let currentDate = new Date;
topofpage.innerHTML = `${currentDate.toLocaleString()}`;   

function showCustomAlert() {
  // Create a custom alert box with SweetAlert
  return Swal.fire({
    title: 'HODGEPODGE',
    text: 'Welcome!',
    timer: 3000,
    confirmButtonText: 'OK'
});

  // swal("Here's a title", "Here's some text", "success", {  button: "I am new button",   });
}

// SweetAlert  https://sweetalert2.github.io/
function loadScript(url) { 
  return new Promise((resolve, reject) => {    // PROMISE
    // debugger
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

loadScript('https://cdn.jsdelivr.net/npm/sweetalert2@11')
.then( message => {
  // Script loaded successfully, do something here
  console.log('https://cdn.jsdelivr.net/npm/sweetalert2@11: Script loaded!', message);
})
.then( () => {
  showCustomAlert()
  .then( () => {} )
})
.catch(error => {
  // Handle error
  console.error('https://cdn.jsdelivr.net/npm/sweetalert2@11: Error loading script:', error);
});






  
  // setTimeout()   setInterval()
document.body.addEventListener( "keydown", (event) => { 
  console.log(`keydown: ${event.key}`); 

  if ( event.key === 'u' ){  // display list of urls
    
    let para = document.getElementById("id-urls")
    para.classList.toggle("div-urls");
  }
});

document.body.addEventListener( "click", (event) => { 
     
    let para = document.getElementById("id-urls")
    para.classList.toggle("div-urls");
  
});

function updateDate () {  // dont define function inside of document.ready()
  let datePicker = document.querySelector('.input-dateclass');
  
  document.querySelector('.div-date-value').innerHTML = datePicker.value;

  datePicker.addEventListener( "change", () => { console.log("change made to datePicker"); } )
}

function clickDatePicker () { // dont define function inside of document.ready()
  console.log('clickDatePicker');
  // document.querySelector('.input-dateclass').click();
  
  document.querySelector('.input-dateclass').showPicker();
  
}

function loadjQueryInDevtools () { // paste directly into console  // dont define function inside of document.ready()
  var jq = document.createElement('script');
  jq.src = "//ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js";
  document.getElementsByTagName('head')[0].appendChild(jq);
  jQuery.noConflict();
}


let fz = 14;
let selectedfile = "notesdb.json";

$(document).ready(function() {

      /*
      Like most jQuery operations, creating an element starts with the dollar function, $(). 
      This is a shortcut to the core jQuery() function. 
      This function has three distinct purposes, it:

            Matches elements, usually ones that already exist in the document

            Creates new elements
            
            Runs a callback function when the DOM is ready
      */
      

      $("input:file").css("background-color", "lightblue");

      $("input:file").change(function(e) {

        selectedfile = this.files[0].name;
        // selectedfile = e.target.files[0].name;

        let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|avif|AVIF|JPG|JPEG|PNG|GIF)$/);
        if (regex.test(selectedfile) ) {
          
          // alert("Match");
          
          var imageUrl = `/image/${selectedfile}`;

          // Create the image element
          var img = $("<img>").attr("src", imageUrl);
          var imgclone = img.clone(); // need to this because objects are passed by reference

          // Append the image to a container
          $(".div-urls").append(img);
          $(".div-main-image").append(imgclone); // need to this because objects are passed by reference
          
        }
      });


      if ( window.matchMedia('(min-width: 768px)').matches ) {
        console.log(" window.matchMedia('(min-width: 768px)': MATCHES" );
      }
      else {
        // alert( "mobile: font-size: 12px");
        $('.div-json-table').css("font-size", "12px");  // on tablet or phone - reduce font-size in table
      }

      $('.button-reload').on('click', function() {
        console.log("REFRESH key pressed");
        location.reload();
        $(window).scrollTop(0);
      });


      $('.button-find').on('click', function() {
        if ( ! find( $('.input-text').val(), 0,0,1 ) ) {
          alert('not found');
          $('.button-reload').click();
        }
      });


      $('.div-json-table').on('click', function(){      // reduce font-size in table by 1 with each click
        fz-= 1;
        $(this).css("font-size", `${fz}px`);
      });


      $(".input-text").keypress(function(event) {
        if (event.which == 13) {
          $('.button-find').click(); // Code to execute when Enter is pressed
          // console.log("Enter key pressed");
        }
      });


      $("div").on("click", "img", function() { // event delegation for dynamically added 'img' elements - hide the images on the page
        $(this).hide();  
      });


      $(".zoom-in").on("click",function(){  // zoon in on the images on the page
        $("img").width($("img").width()+100);
        $("img").height($("img").height()+100);
      });


      $(".zoom-out").on("click", function(){ // zoom out on the images on the page
        $("img").width($("img").width()-100);
        $("img").height($("img").height()-100);
        
      });

      $(".button-accordian").on("click", function() {
        // alert("ACCORDIAN");
        console.log("ACCORDIAN key pressed");
        window.location.href = "/accordian.html";
      });


      $(".button-qrcode").on("click", function() {
        // alert("ACCORDIAN");
        console.log("QRCCODE key pressed");
        window.location.href = "/qrcode.html";
      });


      $(".button-ajax").on("click", function(){  // load schedule.csv file - nothing done with it currently
        
        $.ajax({
          url: '/csv/schedule.csv',
          dataType: 'text',
          success: function(data) {
            const lines = data.split('\n');
            const headers = lines[0].split(',');
        
            const jsonData = [];
        
            for (let i = 1; i < lines.length; i++) {
              const row = lines[i].split(',');
              const obj = {};
        
              for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = row[j];
              }
        
              jsonData.push(obj);
            }
        
            console.log(jsonData); // Your JSON data
            alert('CSV Load SUCCESS!!! - Check console');
          },
          error: function () {
            alert('CSV Load FAILED!!!');
          }
        });

      });


      $(".button-json").on("click", function() {  // <div class="div-json-table"></div>
        // noupdated.json   
        // search.json
        // junk.json
        // minimal.json

        console.log("JSON key pressed");
        
        let regex = /^z0.*$/;              // starts with 'z0'
        let regexAlpha = /^[^A-Za-z].*$/;  // must start with a letter, not a period .
        let regexTrue = /^true$/;           // 'true' last column for elder and pioneer

        
        window.location.href = "/json/notesdb.json"                       // https://keithibrown.org/json/notesdb.json
        window.location.href = "http://127.0.0.1:3000/json/notesdb.json"  // only the last one of these two will be load
        // alert(`/json/${selectedfile}`);


        $.getJSON(`/json/${selectedfile}`, function(data) {  // junk.json contains 'secrets'
          
          $('.div-json-table').empty();

          data.sort((a, b) => a.Name < b.Name ? -1 : 1);

          var table = $("<table>");

          // Create table header
          var header = $("<tr>");
          for (var key in data[0]) {
            header.append("<th>" + key + "</th>");
          }
          table.append(header);

          // Create table rows
          $.each(data, function(index, row) {   // rows

            if ( regexAlpha.test(row.Name) ) { return true; } // starts with '.' so 'continue 
            if ( regex.test(row.Name) ) { return true; }      // starts with 'z0' so 'continue 
            

            var tr = $("<tr>");

            $.each(row, function(key, value) {   // columns within a row     
              
              if ( regexTrue.test(value) ) {  return true; }

              tr.append("<td>" + value + "</td>");
            });
            table.append(tr);
          });

          // alert('Success - JSON Table!!!');
          // console.log(table);

          $('img').hide() // hide all images
          
          $(".div-json-table").append(table);

          $("tr:nth-child(even)").addClass("GFG");
          
        })
        .done(function(data){ $(window).scrollTop(0); console.log( "SUCCESS! from .done()", data ); })
        .fail(function(){})
        .always(function(){});

        
      });

      // added 7/31/2026
      $(".button-calc").on("click", function() {
        // alert("CALCULATOR");
        console.log("CALCULATOR key pressed");
        window.location.href = "/calculator.html";
      });


  
});

/*
$.getJSON(url,data, successCallbacK)
.done(function(){})
.fail(function(){})
.always(function(){});

alert()  prompt()  confirm()
*/