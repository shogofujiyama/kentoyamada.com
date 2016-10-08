// From http://jasonnocito.com/js/photos.js

var index = 0;
var mode = 'grid';

$(document).keydown(function(e)
{
	switch(e.keyCode)
	{
		//left arrow press
		case 37:
			goToPrevImage();
			break;
		case 39:
			goToNextImage();
			break;
	}
});

/*
$(document).bind('keypress', 'left', function (evt){
	goToPrevImage();
	return false;
});
*/

/*
$(document).bind('keydown', 'right', function (evt){goToNextImage(); return false; });
*/

/*
$(document).bind('keydown', 'right', function(){
  goToNextImage();
});
*/

// jQuery(document).bind('keydown', 'j',function (evt){jQuery('#_j').addClass('dirty'); return false; });

function updateCounters()
{
    $('#pageTotal').text($('div.photoWrapper').length);
    $('#pageCurrent').text(index+1);
    $('#pageWrapper').fadeIn();
}

function resetCounters()
{
    $('#pageTotal').text($('div.photoWrapper').length);
    $('#pageCurrent').text(1);
    $('#pageWrapper').fadeIn();
}

function currentCounters()
{
    $('#pageTotal').text($('div.photoWrapper').length);
    $('#pageCurrent').text(_index);
    $('#pageWrapper').fadeIn();
}

$(document).ready(function()
{
	updateCounters();


	// Calculate the top padding for landscape thumbnails
	$('.photoWrapper img').each(function()
	{
		width = $(this).attr('width');
		height = $(this).attr('height');
		
		if(width > height) 
		{
			boxHeight = $(this).parent().parent().height();
			padding = (boxHeight - height)/2;
			$(this).css('margin-top',padding);
		}
	});

	$('#gridSwitch').click(function()
	{
		if(mode=='grid')
		{        
			enlargeThumb();
			mode = 'large';
			currentCounters()
		}
		else
		{
			showThumbnails();
			mode = 'grid';
			resetCounters()
		}
	});

	$('.photoWrapper').children('a').click(function()
	{
		var wrapper = $(this).parent('div.photoWrapper');

		index = wrapper.prevAll('div.photoWrapper').length;
		enlargeThumb();
		mode = 'large';
	});

    $('#photoPrev').click(function()
	{
		goToPrevImage();
    });

	$('#photoNext').click(function()
	{
		goToNextImage();
	});

	$('#largePhotoGrid').click(function()
	{
		goToNextImage();
	});
});

function showThumbnails()
{
    var gridSwitch = $('#gridSwitch');
    var img = gridSwitch.children('img');

    $('.largeImage').hide();
    $('#photoGrid').fadeIn();

    // gridSwitch.text('View as Full Size');
    img.attr('src','http://nabil.com/common/images/fullViewIcon.jpg');
}

function enlargeThumb()
{
	var gridSwitch = $('#gridSwitch');
	var img = gridSwitch.children('img');
	$('#pageCurrent').text(index+1);

	$('#photoGrid').hide();

	$('.largeImage').hide();
	$('.largeImage').eq(index).fadeIn();

	$('#galleryNameWrapper span').hide();
	$('#galleryNameWrapper span').eq(index).show();

	img.attr('src','http://nabil.com/common/images/gridIcon.jpg');

	resizeLargeImage();
}

function goToPrevImage()
{
    var _index = index - 1;
    goToImage(_index);
}

function goToNextImage()
{
    var _index = index + 1;
    goToImage(_index);
}

function goToImage(_index)
{
	if(mode == 'grid')
	{
		enlargeThumb();
		mode = 'large';
		currentCounters();
		return;
	}

// Comment out the rest to stop photos wrapping
	if (_index < 0)
		index = $('div.photoWrapper').length-1;
	else if (_index > $('div.photoWrapper').length-1)
		index = 0;
	else 
	if (_index > -1 && _index < $('div.photoWrapper').length)
		index = _index;

	enlargeThumb();
	updateCounters();
}