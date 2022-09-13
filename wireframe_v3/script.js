$(document).ready(function() {
    var addButton = $("#addbuttn");
    addButton.click({curr_page: 1}, doCall);
});

function doCall(event) {
  var party = $('#party :selected').val();
  var value = $('#voting-share').val()
       
  patt = "/[^a-z0-9]/iu";
  var party_ = party.replace(patt, "");
  patt2 = "/\(\)\+\-/iu"
  var party__ = party_.replace("+", "");
  var party___ = party__.replace("-", "");
      
  var party_value = party___ + '_' + value;
    
  var addedValueId = 'addedValue' + party___;
  var addSelected = [];
  addSelected['added_party'] = "<input disabled='disabled' class='addedInput addedParty' type='text' value='"+party___+"'>";
  addSelected['added_value'] = "<input disabled='disabled' class='addedInput addedValue' id='"+addedValueId+"' type='text' value='"+value+"'>";
  addSelected['button_']     = "<button onclick=removeRow('"+party___+"')"+" class='addedButton' type='button'>X</button>";
  
  html_content =
    "<div id='"+party___+"'>"+
        "<div class='column_3 left' id='added-party'>"+
            addSelected['added_party']+
        "</div>"+
        "<div class='column_3 left' id='added-value'>"+
            addSelected['added_value']+
        "</div>"+
        "<div class='column_3 left' id='added-button'>"+
            addSelected['button_']+
    "</div>";
    // console.log(html_content);

    appendToElementById(html_content)
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
        $("#added-row2").html("<input type = 'text' id ='my_totals' value=" + roundToTwo(total_value) + ">");
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
    if ((newTotals < 0.0) || (newTotals == undefined) || ($(".row.added-row").length == 0) ) {//isEmptyObject()
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