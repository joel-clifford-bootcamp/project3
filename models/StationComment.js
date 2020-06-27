
module.exports = function(sequelize, DataTypes) {
    const StationComment = sequelize.define("StationComment", {
        commentText: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    // Associations
    StationComment.associate = function(models) {
 
        StationComment.belongsTo(models.BixiStation, {
          foreignKey: {
            name: 'bixiStationId',
            allowNull: false
          }
        });

        StationComment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId', 
                allowNull: false
            }
        });
    }

    return StationComment;
};