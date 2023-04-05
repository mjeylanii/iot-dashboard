migrate((db) => {
  const collection = new Collection({
    "id": "df09vddhz1vtanb",
    "created": "2023-04-05 12:02:16.481Z",
    "updated": "2023-04-05 12:02:16.481Z",
    "name": "temperatures",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "5axgdokc",
        "name": "temperature",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("df09vddhz1vtanb");

  return dao.deleteCollection(collection);
})
