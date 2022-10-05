class IndexedDB
{
	static
		CREATE
			=
			class
			{
				/*
				* ******************************************************************************************************
				* Last edited: Wed Oct 05 2022 | 01:39:07 GMT+0700 (Indochina Time)
				* Last edited: Wed Oct 05 2022 | 00:12:47 GMT+0700 (Indochina Time)
				* Last edited: Wed Oct 05 2022 | 00:12:47 GMT+0700 (Indochina Time)
				* ******************************************************************************************************
				*           CREATE THE INDEX FOR THE ObjectStore_Name_INPUT FROM THE IDBOpenDBRequest_OBJECT_INPUT
				* ******************************************************************************************************
				* */
				static Index (IDBOpenDBRequest_OBJECT_INPUT, ObjectStore_Name_INPUT, ObjectStore_keyPath_ARRAY_INPUT, ObjectStore_Index_ARRAY_INPUT)
				{
					/*
					* ********
					* DEBUG 01
					* ********
					* */
					{
						console.log(`IDBOpenDBRequest_OBJECT_INPUT  :`, IDBOpenDBRequest_OBJECT_INPUT);
						console.log(`ObjectStore_Name_INPUT         :`, ObjectStore_Name_INPUT);
						console.log(`ObjectStore_keyPath_ARRAY_INPUT:`, ObjectStore_keyPath_ARRAY_INPUT);
						console.log(`ObjectStore_Index_ARRAY_INPUT  :`, ObjectStore_Index_ARRAY_INPUT);
						console.log(``);
						console.log(``);
						console.log(``);
					}
					/**/
					/**/
					/**/
					let IDBDatabase_OBJECT;
					{
						IDBDatabase_OBJECT = IDBOpenDBRequest_OBJECT_INPUT.result;
						/*
						* **********************************************************************************************
						*                   CHECK THE EXISTENCE OF THE ObjectStore_Name IN THE IDBDatabase_OBJECT
						* **********************************************************************************************
						* */
						let STATUS_ObjectStore;
						{
							STATUS_ObjectStore = IDBDatabase_OBJECT.objectStoreNames.contains(ObjectStore_Name_INPUT);
							/*
							* ********
							* DEBUG 01
							* ********
							* */
							{
								console.log(`IDBDatabase_OBJECT.objectStoreNames:`, IDBDatabase_OBJECT.objectStoreNames);
								console.log(``);
								console.log(``);
								console.log(``);
							}
						}
						/**/
						/**/
						/**/
						if (STATUS_ObjectStore === false)
						{
							let IDBObjectStore_OBJECT;
							{
								IDBObjectStore_OBJECT = IDBDatabase_OBJECT.createObjectStore(ObjectStore_Name_INPUT, ObjectStore_keyPath_ARRAY_INPUT);
							}
							/*
							* ******************************************************************************************
							*                         CREATE THE INDEX FOR THE IDBObjectStore_OBJECT
							* ******************************************************************************************
							* */
							{
								ObjectStore_Index_ARRAY_INPUT
									.forEach
									(
										function (IDBIndex_PARAMETER_OBJECT)
										{
											IDBObjectStore_OBJECT
												.createIndex
												(
													IDBIndex_PARAMETER_OBJECT.name
													,
													IDBIndex_PARAMETER_OBJECT.keyPath
													,
													IDBIndex_PARAMETER_OBJECT.options
												)
										}
									)
							}
						}
						else
						{
							/*
							* ********
							* DEBUG 01
							* ********
							* */
							{
								console.log(`ObjectStore_Name_INPUT: ${ObjectStore_Name_INPUT} already exists`);
								console.log(``);
								console.log(``);
								console.log(``);
							}
						}
					}
				}
				
				
				
				
				/*
				* ******************************************************************************************************
				* Last edited: Wed Oct 05 2022 | 01:39:07 GMT+0700 (Indochina Time)
				* Last edited: Tue Oct 04 2022 | 11:40:18 GMT+0700 (Indochina Time)
				* Last edited: Tue Oct 04 2022 | 11:40:18 GMT+0700 (Indochina Time)
				* ******************************************************************************************************
				*                               CREATE THE ObjectStore_Name IN THE Database_Name
				* ******************************************************************************************************
				* */
				static async ObjectStore (Database_Name, ObjectStore_Name , ObjectStore_keyPath_ARRAY, ObjectStore_Index_ARRAY)
				{
					let STATUS_CREATE_ObjectStore;
					{
						STATUS_CREATE_ObjectStore = false;
					}
					/*
					* **************************************************************************************************
					*                                   CHECK THE EXISTENCE OF THE Database_Name
					* **************************************************************************************************
					* */
					let STATUS_Database, VERSION_Database;
					{
						STATUS_Database
							=
							await
								indexedDB
									.databases()
									.then
									(
										function (IDBDatabase_Information_OBJECT_LIST)
										{
											for (let IDBDatabase_Information_OBJECT of IDBDatabase_Information_OBJECT_LIST)
											{
												if (IDBDatabase_Information_OBJECT.name === Database_Name)
												{
													VERSION_Database = IDBDatabase_Information_OBJECT.version;
													
													return true;
												}
											}
											/* */
											/* */
											/* */
											return false;
										}
									)
						/*
						* ********
						* DEBUG 01
						* ********
						* */
						{
							console.log(`Database_Name      :`, Database_Name);
							console.log(`STATUS_Database    :`, STATUS_Database);
							console.log(`VERSION_Database   :`, VERSION_Database);
							console.log(``);
							console.log(``);
							console.log(``);
						}
					}
					/**/
					/**/
					/**/
					let IDBOpenDBRequest_OBJECT;
					{
						function ERROR_UPGRADE_SUCCESS ()
						{
							IDBOpenDBRequest_OBJECT.onerror = function (Event_OBJECT)
							{
								console.log(`IDBOpenDBRequest_OBJECT.onerror`);
								console.log(`-------------------------------`);
								console.log(`Event_OBJECT`);
								console.log(`------------`);
								console.log(Event_OBJECT);
								console.log(``);
								console.log(``);
								console.log(``);
								/**/
								/**/
								/**/
								STATUS_CREATE_ObjectStore = true;
							}
							
							
							
							/*
							* ******************************************************************************************
							* The upgradeneeded event is fired
							* when
							* an attempt was made
							* to open a database
							* with
							* a version number
							* higher
							* than
							* its current version.
							* ******************************************************************************************
							* This event
							* is not cancelable
							* and
							* does not bubble.
							* ******************************************************************************************
							* */
							IDBOpenDBRequest_OBJECT.onupgradeneeded = function (IDBVersionChangeEvent_OBJECT)
							{
								STATUS_CREATE_ObjectStore = true;
								/*
								* ********
								* DEBUG 01
								* ********
								* */
								{
									console.log(`IDBOpenDBRequest_OBJECT.onupgradeneeded`);
									console.log(`---------------------------------------`);
									console.log(`IDBVersionChangeEvent_OBJECT`);
									console.log(`----------------------------`);
									console.log(IDBVersionChangeEvent_OBJECT);
									console.log(``);
									console.log(``);
									console.log(``);
								}
								/**/
								/**/
								/**/
								IndexedDB.CREATE.Index (IDBOpenDBRequest_OBJECT, ObjectStore_Name, ObjectStore_keyPath_ARRAY, ObjectStore_Index_ARRAY);
							}
							
							
							
							/*
							* ******************************************************************************************
							* [...] fired
							* when
							* the result of a request
							* is
							* successfully returned.
							* ******************************************************************************************
							* */
							IDBOpenDBRequest_OBJECT.onsuccess = function (Event_OBJECT)
							{
								STATUS_CREATE_ObjectStore = true;
								/*
								* ********
								* DEBUG 01
								* ********
								* */
								{
									console.log(`IDBOpenDBRequest_OBJECT.onsuccess`);
									console.log(`---------------------------------`);
									console.log(`Event_OBJECT`);
									console.log(`------------`);
									console.log(Event_OBJECT);
									console.log(``);
									console.log(``);
									console.log(``);
								}
							}
						}
						/**/
						/**/
						/**/
						/**/
						/**/
						if (STATUS_Database)
						{
							await
								new Promise
								(
									function (resolve)
									{
										let AbortController_OBJECT;
										{
											AbortController_OBJECT = new AbortController();
										}
										/**/
										/**/
										/**/
										setInterval
										(
											function ()
											{
												/*
												* ********
												* DEBUG 01
												* ********
												* */
												{
													console.log(`STATUS_CREATE_ObjectStore  :`, STATUS_CREATE_ObjectStore);
													console.log(`IDBOpenDBRequest_OBJECT    : `, IDBOpenDBRequest_OBJECT);
													console.log(`VERSION_Database           :`, VERSION_Database);
													console.log(`Database_Name              :`, Database_Name);
													console.log(`ObjectStore_Name           :`, ObjectStore_Name);
													console.log(``);
													console.log(``);
													console.log(``);
												}
												/**/
												/**/
												/**/
												if (STATUS_CREATE_ObjectStore === false)
												{
													IDBOpenDBRequest_OBJECT = indexedDB.open(Database_Name, VERSION_Database + 1);
													
													ERROR_UPGRADE_SUCCESS();
												}
												else
												{
													console.log(`STATUS_CREATE_ObjectStore  :`, STATUS_CREATE_ObjectStore);
													console.log(`ObjectStore_Name           :`, ObjectStore_Name);
													console.log(``);
													console.log(``);
													console.log(``);
													
													AbortController_OBJECT.abort();
													
													return resolve(true);
												}
											}
											,
											10000
											,
											AbortController_OBJECT.signal
											,
											IDBOpenDBRequest_OBJECT, Database_Name, VERSION_Database, STATUS_CREATE_ObjectStore, ObjectStore_Name
										)
									}
								)
							/*
							* ********
							* DEBUG 01
							* ********
							* */
							{
								console.log(`CHECK ASYNCHRONOUS: STATUS_Database: ${STATUS_Database}`);
								console.log(``);
							}
						}
						else
						{
							IDBOpenDBRequest_OBJECT = indexedDB.open(Database_Name, VERSION_Database);
							/**/
							/**/
							/**/
							ERROR_UPGRADE_SUCCESS();
							/*
							* ********
							* DEBUG 01
							* ********
							* */
							{
								console.log(`CHECK ASYNCHRONOUS: STATUS_Database: ${STATUS_Database}`);
								console.log(``);
							}
						}
					}
					/**/
					/**/
					/**/
				}
			}
}