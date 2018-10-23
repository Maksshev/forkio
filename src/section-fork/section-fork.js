document.addEventListener('click',function(e) {
	if(e.target.closest('.toggle-navbar')){
		document.getElementsByClassName('header__navbar-nav')[0].classList.toggle('active');
		let header = document.getElementsByClassName('header')[0]
		header.style.overflow = header.style.overflow === 'visible' ? 'hidden' : 'visible';
	}
})