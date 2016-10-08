// From http://jasonnocito.com/js/basics.js

var originalWidth = 0;
var imageWidths = new Array();

$(document).ready(function()
{
// resizeRightImage();

    //store image sizes in array
    $('.largeImage').each(function()
	{
        imageWidths.push($(this).width());
    });

    if($("#photo").length)
    {
        easeIn($("#photo"));
    }

    setTimeout(function()
	{
		$(window).resize();
	},
	1000
	);
});

/*
$(window).resize(function(){
    resizeRightImage();
    resizeLargeImage();
});
*/

function easeIn($wrapper)
{
	$img = $wrapper.children('img');
	if($img.length)
	{
		$wrapper.hide();
		$img.load(function()
		{
			$(this).parent("div").fadeIn();
		});
	setTimeout(function()
	{
		$wrapper.fadeIn()
	},
	1000);
	}
}

function resizeLargeImage()
{
	var photo = $('.largeImage:visible');
	var anchor = photo.parent('a');
	var index = anchor.prevAll('a').length;

	if(photo.length)
	{
		var imgWidth = photo.width();
		var oriWidth = imageWidths[index];

		if(imgWidth)
		{
			var bodyWidth = $(window).width();
			var rightWidth = bodyWidth-300;
			if(imgWidth > rightWidth || imgWidth < oriWidth)
			{
				rightWidth -= 40;
				if (rightWidth > oriWidth) rightWidth = oriWidth;
				photo.width(rightWidth);
				photo.removeAttr('height');
			}
			//    $('#largePhotoGrid').width(photo.width());
		}
	}
}

function resizeRightImage()
{
	var photoDiv = $("#photo");
	var photo = $("#photo").children("img");

	if( photo.length)
	{
		var imgWidth = $("#photo").children("img").width();

		//store orginal width
		if(originalWidth==0)
		{
			originalWidth = imgWidth;
			if(imgWidth > 0)
			photoDiv.width(imgWidth);
		}
	}
}