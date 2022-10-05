"use strict"

console.clear();

async function createDB ()
{
	let nameOfIDB = "ATU";
	let nameOfObjectStore = "Project: Notes right inside the Website";
	let inputKeyPath = ["nodeAbove", "script"];
	
	let IDBOpenDBRequest = await indexedDB.open(nameOfIDB);
	
	IDBOpenDBRequest.onupgradeneeded = await async function ()
	{
		let IDBDatabase = IDBOpenDBRequest.result;
		let IDBObjectStore = IDBDatabase.createObjectStore(nameOfObjectStore, {keyPath: inputKeyPath});
		
		IDBObjectStore.createIndex("nodeAbove", "nodeAbove", {unique: false});
		IDBObjectStore.createIndex("script", "script", {unique: false});
	}
}

async function checkExistenceDB (nameOfIDB)
{
	return await window.indexedDB
		.databases()
		.then
		(
			async function (IDBDatabaseInfo)
			{
				for (const idbDatabaseInfoKey of IDBDatabaseInfo)
				{
					if (idbDatabaseInfoKey.name === nameOfIDB)
					{
						return true;
					}
				}
				return false;
			}
		)
		.catch(error => console.warn(error))
}

async function checkExistenceObjectStore (nameOfIDB, nameOfObjectStore)
{
	return await new Promise(
		async function (resolve, reject)
		{
			let existenceOfIDB = await checkExistenceDB(nameOfIDB);
			
			if (!existenceOfIDB)
			{
				throw Error("Database don't exist. Infer, the objectStore don't exist, too.");
			}
			else
			{
				let IDBOpenDBRequest = await indexedDB.open(nameOfIDB);
				
				IDBOpenDBRequest.onsuccess = await async function (event)
				{
					let IDBDatabase = IDBOpenDBRequest.result;
					
					if (IDBDatabase.objectStoreNames.contains(nameOfObjectStore))
					{
						return resolve(true);
					}
					else
					{
						return resolve(false);
					}
				}
				
				IDBOpenDBRequest.onupgradeneeded = await async function (event)
				{
					throw Error("indexedDB.open : IDBOpenDBRequest -> *.onupgradeneeded");
				}
			}
		})
		.catch(error => console.warn(error))
}

async function putDBIntoObjectStore (nameOfIDB, nameOfObjectStore, inputDB)
{
	try
	{
		let existenceObjectStore = await checkExistenceObjectStore(nameOfIDB, nameOfObjectStore);
		
		if (existenceObjectStore === true)
		{
			return await new Promise( async function (resolve, reject)
			{
				let IDBOpenDBRequest = await indexedDB.open(nameOfIDB);
				
				IDBOpenDBRequest.onsuccess = await async function ()
				{
					let IDBDatabase = await IDBOpenDBRequest.result;
					let IDBTransaction = await IDBDatabase.transaction(nameOfObjectStore, "readwrite");
					let IDBObjectStore = await IDBTransaction.objectStore(nameOfObjectStore);
					let IDBRequest = await IDBObjectStore.getAllKeys();
					
					console.log(IDBRequest);
					
					let keyPath = await IDBRequest.source.keyPath;
					
					if (Array.isArray(keyPath))
					{
						for (let inputDBElement of inputDB)
						{
							for (let keyPathElement of keyPath)
							{
								if (!Object.getOwnPropertyNames(inputDBElement).includes(keyPathElement))
								{
									console.log(inputDBElement);
									throw Error(`inputDBElement don't have keyPath: ${keyPathElement} required by ObjectStore`);
								}
							}
						}
					}
					else
					{
						for (let inputDBElement of inputDB)
						{
							if (!Object.getOwnPropertyNames(inputDBElement).includes(keyPath.toString()))
							{
								console.log(inputDBElement);
								throw Error(`inputDBElement don't have keyPath: ${keyPath.toString()} required by ObjectStore`);
							}
						}
					}
					
					for (let inputDBElement of inputDB)
					{
						let actionPUT = IDBObjectStore.put(inputDBElement);
						
						actionPUT.onsuccess = function ()
						{
							console.log(inputDBElement, "has been put successfully.");
						}
					}
				}
				
				IDBOpenDBRequest.onupgradeneeded = await async function (event)
				{
					throw Error("indexedDB.open : IDBOpenDBRequest -> *.onupgradeneeded");
				}
			})
		}
		else if (existenceObjectStore === false)
		{
			throw Error("ObjectStore don't exist.");
		}
	}
	catch (error)
	{
		console.warn(error);
	}
}