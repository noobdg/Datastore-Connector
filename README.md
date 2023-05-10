# Roblox Datastore Connector
A typescript wrapper class that uses the Roblox Datastore2 library. Roblox-TS compiled lua file also available but requires Roblox TS runtime.
Enables the clean creation of type-safe APIs with Datastore2.
## Reference
### Constructor
#### Types Parameters
- T: The deserialized type of the datastore. This is what will be returned by the get function
- serialized: The serialized type of the datastore. This is what will be saved to the datastore. Defaults to the deserialized type.
- DSKeyType: Must extend string. The key parameter passed to the constructor must be of this class. Defaults to string.
#### Constructor Parameters
- `prop` is an interface of `key`, the key to the Datastore, of type `DSKeyType` and `default`, the default value, of type `T`.
- `player` is the player object
- `isTable` is the serialized type that is saved to the datastore a table? This is only used if there are no serialization functions: calls the Datastore2 `.GetTable()` function. (https://kampfkarren.github.io/Roblox/api/#datastoregettable)
- `serializeFunction` [optional] Is given one parameter of type `T`. Must return a `serialized` type.
- `deserializeFunction` [optional] Is given on parameter of type `serialized`. Must return a `deserialized` type.
#### Methods
- `getDatastore` **In:** `void` **Out:** `T`
- `setDatastore` **In:** `T` **Out:** `void`
#### Usage Example
```typescript
// server/DataHandler.ts
// ...imports

// Create tables containing a dictionary (key: UserId, Value: Datastore Connection) for each specific type of data
const CashDS: { [userId: number]: DatastoreConnection<number> } = {};
// ...

// Add user id to dictionaries on connect
Players.PlayerAdded.Connect((plr: Player) => {
  CashDS[plr.UserId] = new DatastoreConnection(
    <IDatastoreConnection<number>>{ // pass key & default value arguments
      key: cash_key,                // type must EXTEND string
      default: default_cash,        // must match deserialized type
    },
    plr,                            // pass player object
    false,                          // is the (serialized/raw) version of the datastore a table?
    (serialized) => deserialized,   // pass deserialization function (optional)
    (deserialized) => serialized,   // pass serialization function (optional)
  );
  
  // ...
});

// Delete player data on disconnect
Players.PlayerRemoving.Connect((plr: Player) => {
  delete CashDS[plr.UserId];
  // ...
});

export {
  CashDS,
  // ...
};
```
---
### Contact
Contact Noobeater#3589 through Discord or create an Issue
