$(document).ready(function() {
  var ctryButton = $(".my-buttn");
  ctryButton.click({action: 1}, processClick);

  var votingShareInput = $('input[name="voting-share"]');
  votingShareInput.focusout({action: 1}, sumValuesV4 );

  var addNewPartyButton = $('.add-new-party');
  addNewPartyButton.click({action: 1}, addNewParty);

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

function sumValuesV4() {
  var addingValues = $('input[name="voting-share"]');
  console.log(addingValues);
  var total_value = 0.0;
  var share;
  for ($i = 0; $i < addingValues.length; $i++) {
    if ( addingValues[$i].value.trim() == "") {
      share = 0.0;
    } else {
      share = addingValues[$i].value;
    }
    total_value += parseFloat( share );
    $("#added-row2").html(
      "<div class='column_3 left'>" +
        "<input type='text' name='mytotals' id='mytotals' value='TOTAL SHARE'>" +
      "</div>" +
      "<div class='column_3 left-value'>" +
        "<input type='text' name='total_voting-share' id='share_total' Value='" + roundToTwo(total_value) + "'>" +
      "</div>"
    );
  }
}

function addNewParty(event) {
  // console.log(event);
  var addNewPartyDiv = $(this).parent().parent(); //$(this) is the last element that triggered an event.
  // console.log(addNewPartyDiv);
  addNewPartyDiv.after(
    "<div class='party_value add-new-party-div'>" +
      "<div class='column_3 width-65'>" +
        "<input type='text' name='party' class='new_party' value='' placeholder='Add new party'>" +
      "</div>" +
      "<div class='column_3 width-12 margin-left-10'>" +
        "<input type='text' onblur=\"sumValuesV4()\" name='voting-share' class='share_new_party' placeholder='0.0' value=''>" +
      "</div>" +
    "</div>"
  )
    // +
    // "<div class='column_3 width-2 margin-left-10'>" +
    //   "<button type='button' class='add-new-party padding-0 line-height-1-6 margin-top-13 background-color-red boarder-none'>+</button>" +
    // "</div>"
}