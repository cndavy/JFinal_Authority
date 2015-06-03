;var jQueryWeatherConfig = {
	lang : {
		day : '����',
		night : 'ҹ��',
		temp : '��C',
		wind : '����',
		wangzimo : '����ī'
	},
	convert : function(sky){
		var weatherInfo = {
				cloudy 		: ['����','����ת��','��ת����','��ת����'],
				overcast	: ['��','��','ɳ����','����','��ɳ','ǿɳ����'],
				rainy		: ['����תС��','С��ת����','С��','����','����','����','����','�ش���','����','С��ת����','����ת����','����ת����','����ת����','����ת�ش���','����','������','��������б���'],
				sleet		: ['���ѩ'],
				snow		: ['��ѩ','Сѩ','��ѩ','��ѩ','��ѩ','Сѩת��ѩ','��ѩת��ѩ','��ѩת��ѩ','��ѩתСѩ','��ѩת��ѩ','��ѩת��ѩ'],
				sunshine	: ['��']
			},
			weather = '',
			state = '';
		for( state in weatherInfo ){
			if( $.inArray( sky , weatherInfo[state] ) > -1 ){
				weather = state;
				break;
			}
		} 
		return weather || state || 'sunshine'  ;
	}
};