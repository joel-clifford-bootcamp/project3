
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
            allowNull: false,
            onDelete: 'cascade'
        });

        StationComment.belongsTo(models.User, {
            allowNull: false,
            onDelete: 'cascade'
        });
    }

    return StationComment;
};