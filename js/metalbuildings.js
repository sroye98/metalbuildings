function contactForm() {
	var self = this;
	
	self.email = ko.observable('').extend({
		required: true,
		email: true
	});
	self.updating = ko.observable(false);
	
	self.init = function () {
		self.email.isModified(false);
	};
	self.submit = function () {
		self.updating(true);
		if (self.email.isValid()) {
			var a = {
				email: self.email()
			};

			$.ajax({
				url: 'https://script.google.com/macros/u/0/s/AKfycbz2aWV0gMH8VGYlfnEdhK6Hp0-VuluxifntCNYWSkbQ_S0_qOHb/exec',
				method: 'GET',
				crossDomain: true,
				dataType: 'json',
				data: JSON.stringify(a)
			}).done(function (d) {
				self.email('');
				self.email.isModified(false);

				self.updating(false);

				$('#contactForm').closeModal();
			}).fail(function (e) {
				console.log(e);
				self.updating(false);
				alert('Something has gone wrong, please try again in a few moments.');
			});
		} else {
            var errors = ko.validation.group([self.email]);
            errors.showAllMessages();
			
			self.updating(false);
		}
	};
	self.validateEmail = function () {
		if (self.email.isValid()) {
			$('input#email').toggleClass('valid invalid');
		} else {
			$('input#email').toggleClass('invalid valid');
		}
	};
}

$(function () {
	
    $('main#slideshow').vegas({
        animation: 'kenburns',
        animationDuration: 100000,
        duration: 120000,
        init: function (globalSettings) {
            $('main').find('.vegas-wrapper').addClass('valign-wrapper');
        },
        overlay: false,
        shuffle: true,
        slides: [
            { src: 'img/slideshow/blueprint-964629_640.jpg' },
            { src: 'img/slideshow/blueprint-964630_640.jpg' },
            { src: 'img/slideshow/blueprints-894779_640.jpg' },
            { src: 'img/slideshow/construction-370588_640.jpg' },
            { src: 'img/slideshow/floor-plan-1474454_640.jpg' }
        ],
        timer: false,
        transition: 'blur'
    });
	
	$('.modal-trigger').leanModal({
		dismissible: false, // Modal can be dismissed by clicking outside of the modal
		//opacity: .5, // Opacity of modal background
		//in_duration: 300, // Transition in duration
		//out_duration: 200, // Transition out duration
		//starting_top: '4%', // Starting top style attribute
		//ending_top: '10%', // Ending top style attribute
		//ready: function() { alert('Ready'); }, // Callback for Modal open
		//complete: function() { alert('Closed'); } // Callback for Modal close
	});
	
    var myViewModel = new contactForm();
    ko.applyBindings(myViewModel, document.getElementById('contactForm'));
	
	$('input#email').autoEmail([
		'gmail.com',
		'googlemail.com',
		'yahoo.com',
		'yahoo.co.uk',
		'hotmail.com',
		'hotmail.co.uk',
		'live.com',
		'msn.com',
		'comcast.net',
		'sbcglobal.net',
		'verizon.net',
		'facebook.com',
		'outlook.com',
		'att.net',
		'gmx.com',
		'icloud.com',
		'me.com',
		'mac.com',
		'aol.com'
	], false).on('keydown', function () {
		myViewModel.email($(this).val());
	});
	
	myViewModel.init();
	
});