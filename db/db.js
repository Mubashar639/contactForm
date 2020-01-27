const mysql = require('mysql');

const funcs_ = (dbCredentials) => {
	
	let con = mysql.createConnection(dbCredentials);
	
	insert = () => {
		con.query("insert into form (space_type, address, zip, square_footage, news, interior, renovation, interior_finishes, art_selection, style_guidance, furniture_selection, degree_renovation) VALUES ('"+space_type+"', )", (err, res) => {});
	}
	
	
	
}

module.exports = funcs_;