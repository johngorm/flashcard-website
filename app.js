'use strict'
let $frontinput = $('#first-input');
let $backinput = $('#second-input');
let $flashdiv = $('#flashcard-display');
let $basicradio = $('#flash-basic-btn');
let $clozeradio = $('#flash-cloze-btn');
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


function createFlashCard(cardtext1, cardtext2){
	//
	/*conditional statement ? return BasicCard(cardtext1, cardtext2) : 
	return ClozeCard(cardtext1, cardtext2) */

}

$(document).ready(() => {
	


	$('#card-btn').on('click' , () => {	
		alert($('input:radio:checked').val());
		const $first_text = $('#first-input').val();
		const $sec_text = $('#second-input').val();
		console.assert($first_text);
		console.assert($sec_text);	

		createFlashCard($first_text, $sec_text)
		// const flashcard = ClozeCard($front_text, $back_text);
		const flashcard  = BasicCard($front_text, $back_text);
		// let $cardfront = $('<div class="front">').append($('<p>').text(flashcard.partial));
		// let $cardback = $('<div class="back">').append($('<p>').text(flashcard.cloze));
		let $cardfront = $('<div class="front">').append($('<p>').text(flashcard.front));
		let $cardback = $('<div class="back">').append($('<p>').text(flashcard.back));
		let $card = $('<div class="card">').append($cardfront).append($cardback);
		$card.flip();
		clearInputs();
		$flashdiv.append($card);
	});

	$flashdiv.delegate('.card', 'click', function(){
		$(this).flip();
	});
	
})