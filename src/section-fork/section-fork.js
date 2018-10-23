$($('.header__navbar-nav')[0]).click(function(e){
		$($('.header__navbar-nav')[0]).toggleClass('active');
		let header = $($('.header')[0])
		if(header.css('overflow') == 'visible'){
			header.css('overflow','hidden')
		}
		else{
			header.css('overflow','visible')
		}
})