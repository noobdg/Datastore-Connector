import DataStore2 from "@rbxts/datastore2";

export interface IDatastoreConnection<T, DSKeyType extends string = string> {
	key: DSKeyType;
	default: T;
}

export default class DatastoreConnection<T, serialized = T, DSKeyType extends string = string>
	implements IDatastoreConnection<T, DSKeyType>
{
	key: DSKeyType;
	default: T;

	player: Player;

	private isTable: boolean;

	// Default: Doesn't change anything
	private serializeFunction?: (obj: T) => serialized;

	// Default: Doesn't change anything
	private deserializeFunction?: (obj: serialized) => T;

	constructor(
		prop: IDatastoreConnection<T, DSKeyType>,
		player: Player,
		isTable: boolean,
		serializeFunction?: (obj: T) => serialized,
		deserializeFunction?: (obj: serialized) => T,
	) {
		this.key = prop.key;
		this.default = prop.default;

		this.player = player;
		this.isTable = isTable;

		if (serializeFunction) this.serializeFunction = serializeFunction;
		if (deserializeFunction) this.deserializeFunction = deserializeFunction;
	}

	public getDatastore(): T {
		if (this.deserializeFunction && this.serializeFunction) {
			return this.deserializeFunction(
				DataStore2<serialized>(this.key, this.player).Get(this.serializeFunction(this.default)),
			);
		} else if (this.isTable) {
			return DataStore2<T>(this.key, this.player).GetTable(<object>(<unknown>this.default));
		} else return DataStore2<T>(this.key, this.player).Get(this.default);
	}

	public setDatastore(newData: T): void {
		if (this.serializeFunction) {
			const serializedData = this.serializeFunction(newData);
			DataStore2<serialized>(this.key, this.player).Set(serializedData);
		} else DataStore2<T>(this.key, this.player).Set(newData);
	}
}
