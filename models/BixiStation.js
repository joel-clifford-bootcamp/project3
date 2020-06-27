
module.exports = function(sequelize, DataTypes) {
    const BixiStation = sequelize.define("BixiStation", {
        // Unique identifier - Corresponds to 'number' field or JSON object from API call
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        // Index of object in array of stations returned by API call - used for locating object faster 
        idx: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        // Name (location) of station
        name: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.FLOAT(8),
            allowNull: false,
            get(value){
                this.setDatValue('lat', value / 1000000);
            }
        },
        lng: {
            type: DataTypes.FLOAT(8),
            allowNull: false,
            set(value) {
                this.setDataValue('lng', value / 1000000);
            } 
        },
        // Total capacity (calculated as bikes + free)
        capacity: {
            type: DataTypes.INTEGER
        }
    });

    // Associations
    BixiStation.associate = function(models) {
        BixiStation.hasMany(models.StationComment);
    }

    return BixiStation;
};