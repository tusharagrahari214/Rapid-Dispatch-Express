// Handle the submission of the form to add a new consignment
$("#add_user").submit(function(event) {
    alert("Data Inserted Successfully!");  // Alert on successful data insertion
});

// Handle the submission of the form to update an existing consignment
$("#update_user").submit(function(event) {
    event.preventDefault();  // Prevent default form submission behavior

    var unindexed_array = $(this).serializeArray();  // Serialize form data into an array
    var data = {};

    // Map the serialized array into a key-value object
    $.map(unindexed_array, function(n, i) {
        data[n['name']] = n['value'];  // Create an object with form data
    });

    // Prepare the AJAX request for updating the consignment
    var request = {
        "url": `http://localhost:5000/api/users/${data.id}`,  // URL with the consignment ID
        "method": "PUT",  // HTTP method for update
        "data": data  // Data to be sent in the request
    };

    // Execute the AJAX request
    $.ajax(request).done(function(response) {
        alert("Data Updated Successfully!");  // Alert on successful update
    });
});

// If the current path is for viewing consignments
if (window.location.pathname == "/view") {
    $ondelete = $(".table .myTable td a.delete");  // Select delete links in the table
    $ondelete.click(function() {
        var id = $(this).attr("data-id");  // Get the ID of the consignment to delete

        // Prepare the AJAX request for deletion
        var request = {
            "url": `http://localhost:5000/api/users/${id}`,  // URL with the consignment ID
            "method": "DELETE"  // HTTP method for delete
        };

        // Confirm deletion action
        if (confirm("Do you really want to delete this record?")) {
            $.ajax(request).done(function(response) {
                alert("Data Deleted Successfully!");  // Alert on successful deletion
                location.reload();  // Reload the page to reflect changes
            });
        }
    });
}
