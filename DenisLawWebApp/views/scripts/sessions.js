$(document).ready(function(){

    //Grab the JSON file containing the details for previously saved pins
    async function getData() {
      let url = 'assets/data/sessions.json';
      try {
          let res = await fetch(url);
          return await res.json();
          //If this fails, send an error
      } catch (error) {
          console.log(error);
      }
    }
  
    //Function to display previously saved pins from database on map on login
    async function renderPins() {
  
      //Store the details from the grabbed JSON file
      let pins = await getData();
    }
  })