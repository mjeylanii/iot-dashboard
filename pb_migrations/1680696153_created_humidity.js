migrate((db) => {
  const collection = new Collection({
    "id": "fxhf6byrinnob8o",
    "created": "2023-04-05 12:02:33.943Z",
    "updated": "2023-04-05 12:02:33.943Z",
    "name": "humidity",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jzziyprb",
        "name": "humidity",
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
  const collection = dao.findCollectionByNameOrId("fxhf6byrinnob8o");

  return dao.deleteCollection(collection);
})
