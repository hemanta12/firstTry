function findStaffs(input, arr) {
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    input.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of findStaffsd values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "findStaffs-list");
        a.setAttribute("class", "findStaffs-items");
        /*append the DIV element as a child of the findStaffs container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a inputut field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the findStaffs text field:*/
                    input.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of findStaffsd values,
                    (or any other open lists of findStaffsd values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    input.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "findStaffs-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "findStaffs-active":*/
        x[currentFocus].classList.add("findStaffs-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all findStaffs items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("findStaffs-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all findStaffs lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("findStaffs-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != input) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}

var staffNames = ["Hemant", "Nima", "Biplow", "Bijay", "Laura", "Sushmeeta", "Reshma", "Mavin", "Sachin"];
findStaffs(document.getElementById("myInput"), staffNames);

var passwords = ["1111", "2222", "3333", "4444", "5555"];
var valid = false;

function validate(staffName, password) {

    for (var i = 0; i < staffNames.length; i++) {
        if ((staffName == staffNames[i]) && (password == passwords[i])) {
            valid = true;
            break;
        }
    }
}

// if (valid) {
//     alert("valid credentials");
// } else {
//     alert("invalid credentials");
// }