function check(event) {
	// Get Values
	var userId  = document.getElementById('userId' ).value;
	var name    = document.getElementById('name'   ).value;
	var password = document.getElementById('password').value;
	
	// Simple Check
	if(userId.length == 0) {
		alert("Invalid userId");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(name.length == 0) {
		alert("Invalid name");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
	if(password.length < 6) {
		alert("Minimum Length of 6 required");
		event.preventDefault();
		event.stopPropagation();
		return false;
	}
}