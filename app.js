'use strict'
let $frontinput = $('#first-input');
let $backinput = $('#second-input');
function BasicCard (front, back){
	if(this instanceof BasicCard){
		this.front = front;
		this.back = back;
		return this;
	}

	else{
		return new BasicCard(front,back);
	}
}


function ClozeCard (fullText, cloze){
	if(fullText.indexOf(cloze) === -1){
		console.error(`${cloze} not found in text`);
		return null;
	}
	else if(this instanceof ClozeCard){
		this.fullText = fullText;
		this.cloze = cloze;
		var clozeIndex = fullText.indexOf(cloze);
		this.partial = fullText.substring(0,clozeIndex) + '_____' + fullText.substring(clozeIndex + cloze.length);
		return this;
	}
	else{
		return new ClozeCard(fullText, cloze);
	}
	
};

BasicCard.prototype.printText = function(){
	console.log(`Question: ${this.front}`);
	console.log(`Answer: ${this.back}`);
}

ClozeCard.prototype.printText = function(){
	console.log(`Partial text: ${this.partial} 
Cloze: ${this.cloze}
Full text: ${this.fullText}`);
};

function clearInputs(){
	// $frontinput.value('');
	// $backinput.value('');
}

$(document).ready(() => {
	

	$('#card-btn').on('click' , () => {	
		const $front_text = $('#first-input').val();
		const $back_text = $('#second-input').val();
		// const flashcard = ClozeCard($front_text, $back_text);
		const flashcard  = BasicCard($front_text, $back_text);
		// let $cardfront = $('<div class="front">').append($('<p>').text(flashcard.partial));
		// let $cardback = $('<div class="back">').append($('<p>').text(flashcard.cloze));
		let $cardfront = $('<div class="front">').append($('<p>').text(flashcard.front));
		let $cardback = $('<div class="back">').append($('<p>').text(flashcard.back));
		let $card = $('<div class="card">').append($cardfront).append($cardback);
		$card.flip();
		clearInputs();
		$('#flashcard-display').append($card);
	});

	$('#flashcard-display').delegate('.card', 'click', function(){
		$(this).flip();
	} )
		
	
})