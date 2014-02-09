/* Tries to classify data as int/string/boolean/date etc. */

/* Returns array of types of data */
function csvColumnTypes(data)
{
	var max_rows = 10000;
	var dtypes = new Array();
	var sortType = new Array();
	var ascSorted = new Array();
	for(var i=0; i<data.length || i>=max_rows; i++)
	{

		var columnNo = 0;
		for(var item in data[i])
		{
			if((typeof dtypes[columnNo]) === "undefined")
			{
				dtypes[columnNo] = {'numbertype': 0, 'datetype': 0, 'stringtype': 0};
			}

			if((typeof sortType[columnNo]) === "undefined")
			{
				sortType[columnNo] = new Object();
			}
			
			
			
			

			if(data[i].hasOwnProperty(item)){

				if(!isNaN(+data[i][item]))
				{
					/* Check for sorted columns. Only applicable to numeric columns */
					if((typeof sortType[columnNo]['ascSort']) === "undefined")
					{
						sortType[columnNo]['ascSort'] = true;
						sortType[columnNo]['descSort'] = true;
					}

					if(sortType[columnNo]['ascSort'] && (i < (data.length-5)) && (+data[i][item] > +data[i+1][item]))
					{
						sortType[columnNo]['ascSort'] = false;
					}

					if(sortType[columnNo]['descSort'] && (i < (data.length-5)) && (+data[i][item] < +data[i+1][item]))
						sortType[columnNo]['descSort'] = false;

					if((typeof dtypes[columnNo]['numbertype']) === "undefined")
						dtypes[columnNo]['numbertype'] = 0;
					else
						dtypes[columnNo]['numbertype']++;
				}
				else if(!isNaN(Date.parse(data[i][item]))){
					if((typeof sortType[columnNo]['ascSort']) === "undefined")
					{
						sortType[columnNo]['ascSort'] = true;
						sortType[columnNo]['descSort'] = true;
					}

					if(sortType[columnNo]['ascSort'] && (i < (data.length-5)) && (Date.parse(data[i][item]) > Date.parse(data[i+1][item])))
					{
						sortType[columnNo]['ascSort'] = false;
					}

					if(sortType[columnNo]['descSort'] && (i < (data.length-5)) && (Date.parse(data[i][item]) < Date.parse(data[i+1][item])))
						sortType[columnNo]['descSort'] = false;
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
	console.log(sortType);
	var finaltypes = [];
	for(var i=0; i<dtypes.length; i++)
	{
		if((typeof finaltypes[i]) === "undefined")
			finaltypes[i] = new Array();
		var arr = Object.keys( dtypes[i] ).map(function ( key ) { return dtypes[i][key]; });
		var max = Math.max.apply( null, arr );
		finaltypes[i][0] = returnMaxKey(dtypes[i], max);
		
	}
	var ocn;
	for (var i=0; i<sortType.length; i++)
	{
		if(sortType[i]['ascSort'] || sortType[i]['descSort'])
		{
			ocn = "ordinal";
		}
		else
		{
			if(finaltypes[i][0] == "numbertype")
				ocn = "cardinal";
			else
				ocn = "nominal";
		}
		finaltypes[i][1] = ocn;
	}

	return finaltypes;
}
function returnMaxKey(obj, max)
{
	for(var item in obj)
	{
		if(obj.hasOwnProperty(item)){
			if(obj[item]==max)
				return item;
		}
	}
}
function get_ocn(data)
{
	var finaltypes = csvColumnTypes(data);
	var ocn = new Array();
	for(i=0; i<finaltypes.length); i++)
	{
		ocn.push(finaltypes[i][1]);
	}
	return ocn;
}