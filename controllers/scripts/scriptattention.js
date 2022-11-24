
function popupAttention(){
    document.getElementById("attention").innerHTML = `<a href="http://localhost:3000/medicaments/supprimer/<%=user.medicament_id%>">&#10006;</a>`
}
