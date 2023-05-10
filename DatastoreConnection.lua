-- Compiled with roblox-ts v1.3.3
local TS = require(game:GetService("ReplicatedStorage"):WaitForChild("rbxts_include"):WaitForChild("RuntimeLib"))
local DataStore2 = TS.import(script, TS.getModule(script, "@rbxts", "datastore2").src)
local DatastoreConnection
do
	DatastoreConnection = setmetatable({}, {
		__tostring = function()
			return "DatastoreConnection"
		end,
	})
	DatastoreConnection.__index = DatastoreConnection
	function DatastoreConnection.new(...)
		local self = setmetatable({}, DatastoreConnection)
		return self:constructor(...) or self
	end
	function DatastoreConnection:constructor(prop, player, isTable, serializeFunction, deserializeFunction)
		self.key = prop.key
		self.default = prop.default
		self.player = player
		self.isTable = isTable
		if serializeFunction then
			self.serializeFunction = serializeFunction
		end
		if deserializeFunction then
			self.deserializeFunction = deserializeFunction
		end
	end
	function DatastoreConnection:getDatastore()
		if self.deserializeFunction and self.serializeFunction then
			return self.deserializeFunction(DataStore2(self.key, self.player):Get(self.serializeFunction(self.default)))
		elseif self.isTable then
			return DataStore2(self.key, self.player):GetTable((self.default))
		else
			return DataStore2(self.key, self.player):Get(self.default)
		end
	end
	function DatastoreConnection:setDatastore(newData)
		if self.serializeFunction then
			local serializedData = self.serializeFunction(newData)
			DataStore2(self.key, self.player):Set(serializedData)
		else
			DataStore2(self.key, self.player):Set(newData)
		end
	end
end
return {
	default = DatastoreConnection,
}
