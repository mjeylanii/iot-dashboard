migrate((db) => {
  const collection = new Collection({
    "id": "bzg80f0v8yimhwt",
    "created": "2023-04-05 13:07:51.819Z",
    "updated": "2023-04-05 13:07:51.819Z",
    "name": "persons",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "9jlwn2go",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "qutdykgb",
        "name": "phone",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "homfx181",
        "name": "profile",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "ni081pzg",
        "name": "email",
        "type": "email",
        "required": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "njdkwhfj",
        "name": "status",
        "type": "bool",
        "required": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("bzg80f0v8yimhwt");

  return dao.deleteCollection(collection);
})
