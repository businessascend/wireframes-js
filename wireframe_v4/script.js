$(document).ready(function() {
  var ctryButton = $(".my-buttn");
  ctryButton.click({action: 1}, processClick);
});

function processClick(event) {
  var html_clicked_elem;
  html_clicked_elem = ( $(this).html() );
  console.log(html_clicked_elem);
  // if (html_clicked_elem === 'Bulgaria') {
  //   location.assign("http://localhost/wireframe_v4/member-state/"+html_clicked_elem+".html");
  // }

  
  
}

function appendToElementById(content) {
  // $(element_id).html(content)
  // $("#added-party").append(content['added_party']);
  // $("#added-value").append(content['added_value']);
  $("#added-row").append(content);  
  sumValues();

}

function sumValues() {
  var addingValues = $(".addedValue");
  var total_value = 0;
  // $.each(addingValues, function(key, value) {
  //     // console.log(key)
  //     // console.log(value.value)
  //     total_value += parseInt(value.value);
  //     console.log(total_value);
  //     $("#added-row2").html("<input type = 'text' + id ='" + key + "' value=" + total_value + ">");
  //     // var key2 = key - 1;
  // })
  for ($i = 0; $i < addingValues.length; $i++) {
      total_value += parseFloat( addingValues[$i].value );
      // console.log(total_value);
      $("#added-row2").html("<input type = 'text' + id ='my_totals' value=" + roundToTwo(total_value) + ">");
      // addingValues.shift;
      // addingValues.splice(0,1);
  }
}

function removeRow(idOfRow) {
  var id = '#addedValue' + idOfRow;
  console.log( id )
  var valueOfFieldToDelete = $(id).val(); //div#added-value.column_3.left
  console.log(valueOfFieldToDelete);
  // var valueOfFieldToDelete = $("div#added-value.column_3.left").value;
  var valueOfTotalsField = parseFloat( $('#my_totals').val() );
  console.log(valueOfTotalsField);
  var newTotals = valueOfTotalsField - valueOfFieldToDelete;

  $("#"+idOfRow).remove();
  if (newTotals < 0 || newTotals == undefined || $(".row.added-row").length == 0 ) {//isEmptyObject()
    $('#my_totals').remove();
  } else {
    $("#my_totals").val(roundToTwo(newTotals));
  }
}

// function sumValuesOfRemainingFields() {//After clicking the x button, the 
//   var addingValues = $(".addedValue");
//   var total_value = 0;
//   for ($i = 0; $i < addingValues.length - 1; $i++) {
//       total_value += parseFloat( addingValues[$i].value );
//       console.log(total_value);
//       $("#added-row2").html("<input type = 'text' + id ='" + $i + "' value=" + total_value + ">");
//       // addingValues.shift;
//       // addingValues.splice(0,1);
//   }
// }

function roundToTwo(num) {
return +(Math.round(num + "e+2")  + "e-2");
}