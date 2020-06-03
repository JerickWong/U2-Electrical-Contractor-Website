function renderMTS(mts) {

    console.log(mts.data())


    db.collection('MTS-Collection').doc(mts.id).collection('products').get().then(snapshot => {
        snapshot.docs.forEach(product => {
            render(product)
        })
    })
}



function render(product) {
  console.log(product.data())  
}

db.collection('MTS-Collection').get().then(mtsSnapshot => {
    mtsSnapshot.docs.forEach(mts =>{
        renderMTS(mts)
    })

    
})

// db.collection('MTS-Collection').doc('1uiJ3esNsDYRMerFZThW').collection('products').get().then(snapshot => {
//     snapshot.docs.forEach(doc => {
//         render(doc)
//     })
// })

var gMtsNo=0;
var gPanelBoardSize=0;
var gPanelBoardPrice=0;


$("#datepicker").keydown(false)

$(document).ready(function(){
    var vHeaderArray = ['QTY', 'UNIT', 'DESCRIPTION','REMARKS','DISCOUNT','PRICE','TOTAL','DELETE'];
    fncCreateTableHeader('TableContainer', vHeaderArray);
    fncCreateRow('myTable');
    //fncView();


// Use this if you want to use the checkbox
/*
    $("#btnDeleteRow").click(function(){
        fncDeleteSelected()
    });
*/   
});

// Use this if you want to use the checkbox
/*
function fncDeleteSelected()
{
    var count=0;
    $("table tbody").find('input[name="selected"]').each(function(){
            if($(this).is(":checked")){
                $(this).parents("tr").remove();
                count++;
            }
        });

        if(count==0){
            alert("Check Atleast one Checkbox")
        }


}  
*/

function fncCreateTableHeader(vDiv, vHeaderArray)
{		
    var vTable = $('#'+vDiv).append($('<table id="myTable" border="1" ><thead><tr></tr><tbody><tfoot>'));
    for(x=0;x<vHeaderArray.length;x++)
    {
        vTable.find('thead > tr').append('<th>'+vHeaderArray[x]+'</th>');
        
    }		

    return vTable;
}

function fncCreateRow(vTableName)
{
    $("#myTable").append("<tr></tr>");
    fncAddRow();	

    // $('#myTable tr').each(function(index, elem) {
    //     //     if (index > 0){
    //     //         console.log(`quantity = ${elem[0].val()}`)
    //     //         console.log(`unit = ${elem[1]}`)
    //     //         console.log(`description = ${elem[2]}`)
    //     //         console.log(`remarks = ${elem[3]}`)
    //     //         console.log(`discount = ${elem[4]}`)
    //     //         console.log(`price = ${elem[5]}`)
    //     //         console.log(`total = ${elem[5]}`)
    //     // }
    //     // if (index==1)
    //     //     alert(elem)
    //     // if (index>0){
    //     // var currentRow=$(this).closest("tr"); 

    //     // var col1=currentRow.find("td:eq(0)").text();                 
    //     // console.log(`this is current row: ${col1}`)
    //     // }
    //     if (index>0){
    //         const row = document.querySelector('')

    //         // const quant = $(this).find('td').each(function(){
    //         //     alert($(this).html());
    //         // })
            
    //     }
        
    // })
}

function fncAddRow()
{

    var vHeaderLength = $('#myTable > thead').find("th").length;

    $("#myTable > tbody > tr:last").append("<td><input type='text' onkeypress='validate(event)' class='inpQty' style='width:40px' /></td>");
    $("#myTable > tbody > tr:last").append("<td><input type='text' class='inpUnit' style='width:50px'/></td>");
    $("#myTable > tbody > tr:last").append("<td><input type='text' class='inpDescription' style='width:250px'/></td>");
    $("#myTable > tbody > tr:last").append("<td><input type='text' class='inpRemarks'/></td>");
    $("#myTable > tbody > tr:last").append("<td><input type='text' onkeypress='validate(event)' class='inpDiscount' /></td>");
    $("#myTable > tbody > tr:last").append("<td><input type='text' onkeypress='validate(event)' class='inpPrice' /></td>");
    $("#myTable > tbody > tr:last").append("<td><input type='text' class='inpTotal' disabled/></td>");
    $("#myTable > tbody > tr:last").append("<td><button class='btnDeleteRow' value='Delete' onclick='deleteRow(this)'>X</button></td>");
    // <input type='checkbox' id='inpSelect'  name='selected'/>
    const row_number = document.querySelector('#myTable').rows.length-2

    $('.inpQty').eq(row_number).keyup(() => {
        let qty = $('.inpQty').eq(row_number).val()
        let price = $('.inpPrice').eq(row_number).val()
        console.log('change')
        if (qty != "" && price != "") {
            qty = parseInt(qty)
            price = parseFloat(price)
            let total = qty*price
            $('.inpTotal').eq(row_number).val(total)
                .trigger('change')
        }
    })

    $('.inpPrice').eq(row_number).keyup(() => {
        let qty = $('.inpQty').eq(row_number).val()
        let price = $('.inpPrice').eq(row_number).val()
        console.log('change')
        if (qty != "" && price != "") {
            qty = parseInt(qty)
            price = parseFloat(price)
            let total = qty*price
            $('.inpTotal').eq(row_number).val(total)
                .trigger('change')
        }
    })

    $('.inpTotal').eq(row_number).change(() => {
        console.log('detected change')
        let total_cost = 0
        console.log(row_number+1)
        for(i=0; i<row_number+1; i++) {
            let cost = $('.inpTotal').eq(i).val()
            cost = parseFloat(cost)
            console.log(cost)
            total_cost = total_cost + cost
        }
        $('#inpTotalCost').val(total_cost)
    })
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function validate(evt)
 {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

$('#datepicker').datepicker({
    uiLibrary: 'bootstrap'
});

function fncMTSModal()
{

    // Get the modal
    var modal = document.getElementById("modalMTSNo");

    

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];


        modal.style.display = "block";
    
    if (gMtsNo<1 || gMtsNo.isInteger==false )
    {
        span.onclick = function() {
          alert("Please put an appropriate MTS number");
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                alert("Please put an appropriate MTS number");
        }
        }

    } 
    else
    {  
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
            modal.style.display = "none";
        }
        }
    }
}

function fncMTSNoSave()
{
    gMtsNo=$("#inpMTSNoModal").val();
    if(gMtsNo=="" || gMtsNo<=0)
    {
        alert("please put an appropriate MTS Number")
    }
    else
    {
        console.log(gMtsNo);
        $('#inpMTSNoTop').val(gMtsNo);
        var modal = document.getElementById("modalMTSNo");
        modal.style.display = "none";
    }
}



function fncToday()
{
    var vDate= new Date();
    var vDay = String(vDate.getDate()).padStart(2, '0');
    var vMonth = String(vDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var vYear = vDate.getFullYear();

    vDate = vMonth + '/' + vDay + '/' + vYear
    $('#datepicker').val(vDate);
    console.log(vDate)
}

function fncAddPanelBoard()
{
    // Get the modal
    var modal = document.getElementById("modalAddPanelBoard");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[1];
    modal.style.display = "block";


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    
}

function fncAddtoTable()
{
    var gPanelBoardSize=   $('#inpPanelBoardSize').val();
    var gPanelBoardPrice=  $('#inpPanelBoardPrice').val();

    if(gPanelBoardSize<1 || gPanelBoardSize.isInteger==false || gPanelBoardPrice<1 || gPanelBoardPrice.isInteger==false )
    {
        alert("please put an appropriate  Number")
    }
    else
    {
        console.log(gPanelBoardSize,gPanelBoardPrice);
        var modal = document.getElementById("modalAddPanelBoard");
        modal.style.display = "none";
    }
}

function fncSaveToDB()
{   
    var vReq = $("#inpRequestedBy").val();

    


    if(vReq=="")
        alert("Enter name into Requested By");
    else {
        const number_products = document.querySelector('#myTable').rows.length-1

        for (i=0; i<number_products; i++) {
            let qty = document.querySelectorAll('.inpQty')[i].value
            let unit = document.querySelectorAll('.inpUnit')[i].value
            let product_name = document.querySelectorAll('.inpDescription')[i].value
            let remarks = document.querySelectorAll('.inpRemarks')[i].value
            let price = document.querySelectorAll('.inpUnit')[i].value

            console.log(qty)
        }


        alert("save to db");
    }
        
}

function fncConfirmToDB()
{
    var vApp = $("#inpApprovedBy").val();

    if(vApp=="")
        alert("Enter name into Approved By");
    else
        alert("Confirmed to db");

}
