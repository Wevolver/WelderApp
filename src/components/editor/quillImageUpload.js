export class ImageUpload {
	constructor(quill, options = {}) {
		this.quill = quill;
		this.options = options;
		this.quill
			.getModule('toolbar')
			.addHandler('image', this.selectLocalImage.bind(this));
	}

	selectLocalImage() {
		const input = document.createElement('input');
		input.setAttribute('type', 'file');
		input.click();

		input.onchange = () => {
			const file = input.files[0];
			if (/^image\//.test(file.type)) {
				const checkBeforeSend =
					this.options.checkBeforeSend || this.checkBeforeSend.bind(this);
				checkBeforeSend(file, this.sendToServer.bind(this));
			} else {
				console.warn('You could only upload images.');
			}
		};
	}

	checkBeforeSend(file, next) {
		next(file);
	}

	sendToServer(file) {
		if (this.options.customUploader) {
			this.options.customUploader(file, dataUrl => {
				this.insert(dataUrl);
			});
		} else {
			const url = this.options.url,
				method = this.options.method || 'POST',
				name = this.options.name || 'file',
				headers = this.options.headers || {},
				callbackOK =
					this.options.callbackOK || this.uploadImageCallbackOK.bind(this),
				callbackKO =
					this.options.callbackKO || this.uploadImageCallbackKO.bind(this);

			if (url) {
				const fd = new FormData();

				fd.append('key', "/" + file.name);
				fd.append('success_action_status', 201);
				fd.append('X-Requested-With', 'xhr');
				fd.append('Content-Type', 'image/png');

        for(var header in this.options.headers.params){
          fd.append(header, this.options.headers.params[header])
        }
				fd.append(name, file);

				if (this.options.csrf) {
					fd.append(this.options.csrf.token, this.options.csrf.hash);
				}

				const xhr = new XMLHttpRequest();
				xhr.open(method, url, true);

				xhr.onload = () => {
					if (xhr.status === 201) {
						callbackOK(xhr.responseXML.getElementsByTagName("Location")[0].innerHTML, this.insert.bind(this));
					} else {
						callbackKO({
							code: xhr.status,
							type: xhr.statusText,
							body: xhr.responseText
						});
					}
				};

				if (this.options.withCredentials) {
					xhr.withCredentials = true;
				}

				xhr.send(fd);
			} else {
				const reader = new FileReader();

				reader.onload = event => {
					callbackOK(event.target.result, this.insert.bind(this));
				};
				reader.readAsDataURL(file);
			}
		}
	}

	insert(dataUrl) {
		const index =
			(this.quill.getSelection() || {}).index || this.quill.getLength();
		this.quill.insertEmbed(index, 'image', dataUrl, 'user');
	}

	uploadImageCallbackOK(response, next) {
		next(response);
	}

	uploadImageCallbackKO(error) {
		console.log(error);
	}
}
