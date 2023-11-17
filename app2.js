const express = require("express")
const cors = require("cors")
const app = express()
const fileUpload = require('express-fileupload');
const fs = require ('fs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(fileUpload({
    createParentPath : true
}))

app.post("/upload", (req, res) => {
    
	if(req.files === null)
	{
		res.status(400).json({ msg: "No file was uploaded" });
	}

	// var folder = `${__dirname}/client_react/public/uploads/`;
	
	const file = req.files.file;
    console.log(file)
	file_split = file.name.split(".")
	const fileName = file_split[0]+"."+file_split[1]
	const file_path = `${__dirname}/scans/${fileName}`;
	try
	{
		file.mv(`${__dirname}/scans/${fileName}`, err => {
			if(err)
			{
				console.error(err);
				return res.status(500).send(err);
			}
			
			res.json({ fileName: fileName, filePath: `/scans/${fileName}` });
		});
	}
	catch(err)
	{
		console.error(err);
		return res.status(500).send(err);
	}
	// file.mv(`${__dirname}/client_react/public/uploads/${file.name}`, err => {
	// 	if(err)
	// 	{
	// 		console.error(err);
	// 		return res.status(500).send(err);
	// 	}
		
	// 	res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
	// });
});


app.listen(5000,()=>{
    console.log("port connected");
})
