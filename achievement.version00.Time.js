class Time
{
	/*
	* Last edited: Sat Aug 27 2022 | 18:21:12 GMT+0700 (Indochina Time)
	* Last edited: Mon Jul 25 2022 | 11:09:27 GMT+0700 (Indochina Time)
	* Last edited: Mon Jul 25 2022 | 11:09:27 GMT+0700 (Indochina Time)
	* ******************************************************************************************************************
	*                                                   OK
	* ******************************************************************************************************************
	* */
	static printCurrentTime ()
	{
		console.log(`Last edited: ${new Date().toDateString()} | ${new Date().toTimeString()}`);
	}
	
	
	
	/*
	* Last edited: Tue Jul 26 2022 | 14:21:16 GMT+0700 (Indochina Time)
	* Last edited: Mon Jul 25 2022 | 11:24:18 GMT+0700 (Indochina Time)
	* Last edited: Mon Jul 25 2022 | 11:24:18 GMT+0700 (Indochina Time)
	* ******************************************************************************************************************
	*                                                   OK
	* ******************************************************************************************************************
	* */
	static async delay (timeInput)
	{
		return await new Promise(function (resolve, reject)
		{
			setTimeout(function () {resolve(true)}, timeInput, timeInput)
		})
	}
}

export
{
	Time
}