document.addEventListener('click',function(e) {
	if(e.target.closest('.toggle-navbar')){
		document.getElementsByClassName('header__navbar-nav')[0].classList.toggle('active');
		let header = document.getElementsByClassName('header')[0]
		header.style.overflowX = header.style.overflowX === 'visible' ? 'hidden' : 'visible';
	}
})