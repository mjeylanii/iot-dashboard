/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgqz67aldv7gtxm")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e2anbv4u",
    "name": "priority",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 2,
      "values": [
        "HIGH",
        "MEDIUM",
        "LOW"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("hgqz67aldv7gtxm")

  // remove
  collection.schema.removeField("e2anbv4u")

  return dao.saveCollection(collection)
})
