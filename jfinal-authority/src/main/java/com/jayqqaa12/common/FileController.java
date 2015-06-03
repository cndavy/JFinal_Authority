package com.jayqqaa12.common;

import java.io.IOException;

import com.jayqqaa12.jbase.jfinal.ext.ctrl.JsonController;
import com.jayqqaa12.jbase.util.upload.FlashUpload;
import com.jayqqaa12.jbase.util.upload.KindEditor;
import com.jfinal.ext.route.ControllerBind;

@ControllerBind(controllerKey = "/common/file")
public class FileController extends JsonController
{
	
	public void flashUpload() throws IOException{
		
		renderJson(FlashUpload.flashUpload(getRequest()));
		
	}
	
	public void upload()
	{
		renderJson(KindEditor.upload(this));
	}

	public void fileManage()
	{
		   renderJson(KindEditor.fileManage(getRequest()));
	}
	

	

}
