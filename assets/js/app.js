// Tanımladığım elementleri çağırdım.
var videoContainer = document.getElementById('videoContainer');
var video = document.getElementById('video');
var videoControls = document.getElementById('video-controls');
var playpause = document.getElementById('playpause');
var progress = document.getElementById('progress');
var progressBar = document.getElementById('progress-bar');

// Video tag'ının otomatik gelen özelliklerini kapadım.
video.controls = false;

// addEventListener methodu belli bir olay gerçekleştiğinde yapılacak işlevleri ayarlamamızı sağlar.
if (document.addEventListener) {
	// Play pause butonunun çalışmasını sağladım.			
	playpause.addEventListener('click', function(e) {
		if (video.paused || video.ended) video.play();
		else video.pause();
	});			

	// Play ve Pause butonunun değişmesini sağladım
	var changeButtonState = function(type) {
		if (type == 'playpause') {
			if (video.paused || video.ended) {
				playpause.setAttribute('data-state', 'play'); // setAttribute methodu attribute değerini değiştirdi.
			}
			else {
				playpause.setAttribute('data-state', 'pause');
			}
		}
	}
	video.addEventListener('play', function() {
		changeButtonState('playpause');
	}, false);
	video.addEventListener('pause', function() {
		changeButtonState('playpause');
	}, false);

	// Video oynatıldığında progress barında ilerlemesini sağladım.
	video.addEventListener('timeupdate', function() {
		if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
		progress.value = video.currentTime;
		progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
	});

	// Progress bar'a tıkladığımda tıkladığım yere gitmesini sağladım.
	progress.addEventListener('click', function(e) {
		var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
		video.currentTime = pos * video.duration;
	});

}
