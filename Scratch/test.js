function foo() {
	// console.log(arguments);
	// console.log(arguments.callee);
	// debugger;
	return arguments.callee;
}

console.log(foo());

let bar = function () {
	return arguments.callee;
}

// console.log(bar());





