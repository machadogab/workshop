var a = function() {
	console.log("the function A was called")
}

var b = function() {
	setTimeout(function(){ console.log("The function B was called")}, 2000)
}

b()
a()


var c = function() {
	return new Promise((resolve, reject) => {
		resolve("The function C was called")
	})
}

c()
	.then(message => {
		console.log(message)
	})

var d = function() {
	return new Promise((resolve, reject) => {
		reject("The function D was called, with an error")
	})
}

d()
	.catch(error => {
		console.log(error)
	})
