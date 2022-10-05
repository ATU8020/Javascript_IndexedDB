/*
* **********************************************************************************************************************
*                                                   LIBRARY
* **********************************************************************************************************************
* */
let Time_Library;





async function importNecessaryLibrary ()
{
	Time_Library = await import(`./achievement.version00.Time.js`);
}

async function initializeNecessaryBackgroundData_for_Library ()
{

}





class Time_Debug
{
	static printCurrentTime_Debug ()
	{
		Time_Library.Time.printCurrentTime();
	}
	
	static async delay_Debug ()
	{
		Time_Library.Time.printCurrentTime();

		await Time_Library.Time.delay(5000);
		
		Time_Library.Time.printCurrentTime();
	}
}





/*
* **********************************************************************************************************************
*                                                   ACTION
* **********************************************************************************************************************
* */
(
	async function ()
	{
		await importNecessaryLibrary()
			.then(function ()
			{
				console.log(`importNecessaryLibrary()                           : DONE`)
			});
		
		await initializeNecessaryBackgroundData_for_Library()
			.then(function ()
			{
				console.log(`initializeNecessaryBackgroundData_for_Library()    : DONE`)
			});
		
		
		
		
		
		await Time_Debug.printCurrentTime_Debug()
	}
)()

