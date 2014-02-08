/* Tries to classify data as int/string/boolean/date etc. */

/* Returns array of types of data */
function csvColumnTypes(data)
{
	var dtypes = new Array();
	for(var i=0; i<data.length; i++)
	{

		var columnNo = 0;
		for(var item in data[i])
		{
			if((typeof dtypes[columnNo]) === "undefined")
			{
				dtypes[columnNo] = {'numbertype': 0, 'datetype': 0, 'stringtype': 0};
			}


			if(data[i].hasOwnProperty(item)){

				if(!isNaN(+data[i][item]))
				{
					if((typeof dtypes[columnNo]['numbertype']) === "undefined")
						dtypes[columnNo]['numbertype'] = 0;
					else
						dtypes[columnNo]['numbertype']++;
				}
				else if(!isNaN(Date.parse(data[i][item]))){
					if((typeof dtypes[columnNo]['datetype']) === "undefined")
						dtypes[columnNo]['datetype'] = 0;
					else
						dtypes[columnNo]['datetype']++;
				}
				else{
					if((typeof dtypes[columnNo]['stringtype']) === "undefined")
						dtypes[columnNo]['stringtype'] = 0;
					else
						dtypes[columnNo]['stringtype']++;	
				}
			}
			columnNo++;
		}
	}
	console.log(dtypes);
}