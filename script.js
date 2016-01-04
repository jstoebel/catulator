function calculator () {

	valid_operators = "+-X/";
	valid_operands = "0123456789."

	this.buffer = "";		//buffer to collect user input

	this.left_operand = null	//the left operand

	this.right_operand = null;	//the right operand

	this.operator = null;	//the operator to be used in the next calulation

	this.compute = function() {
		//pre: this.left_operand, this.right_operand and this.operator 
		//are all valid
		//post: computes memory (operator) operand
			//and assigns to memory

		if (this.left_operand !== null && this.right_operand !== null && this.operator !== null ){
			switch(this.operator) {
				case "+":
					this.left_operand = this.left_operand + this.right_operand
					break
				case "-":
					this.left_operand = this.left_operand - this.right_operand
					break
				case "X":
					this.left_operand = this.left_operand * this.right_operand
					break
				case "/":
					this.left_operand = this.left_operand / this.right_operand
					break
			}

		this.display(this.left_operand);
		
		};


	};


	this.operator_push = function(operator) {
		//pre: operator is in "+-*/"
		//post: assigns operator to this.operator

		console.log("got " + operator);

		if (valid_operators.indexOf(operator) > -1) {
			//valid operator
			this.operator = operator;

			//do we have everything we need to compute?
			// this.compute_prep();
			this.compute();
		} else {
			console.log("Illegal operator.")
		}

	};

	this.operand_push = function(string) {
		//pre: string contains only digits or "." and is not empty
		//post: string is assigned to left_operand if it is null
		//otherwise right_operand

		if (isNumeric(string)){		//TODO make sure string is a valid number (no empty strings!)
			if (this.left_operand == null){
				this.left_operand = parseFloat(string);
			} else {
				this.right_operand = parseFloat(string);
			}
		};
	};
	this.buffer_push = function(token) {
		//pre: none
		//post: handles input to the buffer as follows
			//if token is a digit
				//append to buffer.
				//display the current buffer

			//if token is an operator
				//call operator_push with token
				//call operand_push
				//clear buffer

		if (valid_operands.indexOf(token) > -1) {
			//digit
			this.buffer += token
			this.display(this.buffer)
		} else if (valid_operators.indexOf(token) > -1) {
			//operator
			this.operand_push(this.buffer)
			this.buffer = ""
			this.operator_push(token)
			// this.compute()

		}
	};

	this.equal = function() {
		//pre: none
		//post: assigns buffer to left most empty operand
		//and calls compute.
			this.operand_push(this.buffer)
			this.buffer = ""
			this.compute()

	}

	this.percent = function() {
		//pre: this.memory is not null
		//post: divides this.memory by 100 and assigns to itself

		if (this.memory !== null) {
			this.memory /= 100;
			this.update()
		}
	}

	this.display = function(val) {
		//pre: none
		//post: updates the display with val

		$("#display").text(val);
	};

	this.clear = function() {
		//pre: none
		//post: memory, operator and operand are cleared
		
		this.buffer = "";
		this.operator = null;
		this.left_operand = null;
		this.right_operand = null;
		this.display("")

	}

}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

$(document).ready(function() {
	console.log("document ready")

	calc = new calculator()

	//listen for each button

	$("#ac").click(calc.clear.bind(calc))
	$("#ce").click(calc.clear.bind(calc))

	$("#percent").click(calc.percent.bind(calc))

	//handing digits
	$(".digit").click(function(event) {
		var digit = $(this).find(".content").find(".table").find(".table-cell").text();
		console.log("digit button pushed. Value is " + digit);
		calc.buffer_push(digit);
	});

	//handing operators
	$(".operator").click(function(event) {
		var operator = $(this).find(".content").find(".table").find(".table-cell").text();
		calc.buffer_push(operator)
	});

	$("#equal").click(function(event) {
		calc.equal()
	});
	// html body div.container div#one.square.digit.btn div.content div.table div.table-cell

	// $("#add").click(calc.operator_push("+").bind(calc))
	// $("#subtract").click(calc.operator_push("-").bind(calc))
	// $("#times").click(calc.operator_push("*").bind(calc))
	// $("#divide").click(calc.operator_push("/").bind(calc))

	//digits

});