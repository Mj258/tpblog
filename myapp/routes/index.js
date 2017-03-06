var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/home', function(req, res, next) {
	var newPath = './public/images';
	var form = new formidable.IncomingForm();  
    form.parse(req, function(err, fields, files) {  
        // console.log('fields',fields);//表单传递的input数据  
        // console.log('files',files);//上传文件数据  
        var types = files.logo.name.split('.');
         var type = types[types.length - 1];

        if (!/bmp|gif|jpg|jpeg|png|psd|tiff|webp|svg/i.test(type)) {
        	return res.status(300).send('upload file type not image')
        }

        var tmp_path = files.logo.path;
        var img_name =  new Date().getTime() + Math.floor(Math.random() * 100) + '.' + type;
      	
        var fileName = newPath + '/' + img_name;
      	
        fs.rename(tmp_path, fileName, function (err) {
		  	if (err) res.status(300).send('生成文件错误：'+err);

		  	fs.unlink(tmp_path, function() {
				if (err) return res.status(300).send('删除临时文件错误：'+err);
		  		return res.status(200).send(img_name);
		  		next();
			});
		});
    }); 
});

router.get('/home/index', function(req, res, next) {
	res.render('home', { title: 'home' });
});

router.get('/users', function(req, res, next) {
	res.render('users', { title: 'home' });
});
module.exports = router;
