
;(function ($){
	class Login{
		constructor(){
			this._form = document.forms['loginForm'];
			this._allInputReq = document.querySelectorAll('.required');			
			this._inputSavePassword = this._form.elements['check'];
			this._sendFormBtn = this._form.elements['save-pas'];
			this._canSend = true;
			this._formData = {};
			this.regExp = {
				email:/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				pas:/\S+/,
			}
		}

		init(){
			// console.log(this._form, this._allInputReq, this._inputSavePassword, this._sendFormBtn);
			var self = this;
			// this.checkTocken();

			if(this._form == undefined || this._allInputReq == undefined || this._inputSavePassword == undefined){
				console.error('Form elements undefined');
			} else {
				// эл-ты есть, значит начинаем с ними работать
				this.formEvents(self);
			}

			// checkTocken(){

			// }
		}

		formEvents(self){
			this._form.addEventListener('submit', function(e){
				e.preventDefault();

				self._canSend = true;
				self._formData = {};

				self._allInputReq.forEach(input =>{
					if (!self.regExp[input.name].test(input.value)){
						input.classList.add('error');
						self._canSend = false;
					} else {
						input.classList.remove('error');
						self._formData[input.name] = input.value;
						
					}
				});

				console.log(self._formData, self._canSend);
				self._canSend ? self.sendFormAjax(self._formData) : console.error('input regExp test error');
			})
		}
		sendFormAjax(data){
			$.ajax({
				method: 'POST',
				data: JSON.stringify(data),
				contentType: 'application/json',
				// на стороне сервера надо будет распарсить, усли не указано как у нас. как передавать аякс запрос спросить у бэкенда
				url: '../mail.php',
				success: function(res){

					window.location = '/task-manager/app/index.html'
				},
				error: function(err){

				}
			})

		}

		
		// generateTocken(){
			
		// }
	}

	var newLogin = new Login();
	newLogin.init();

})(jQuery);