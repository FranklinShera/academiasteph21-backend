

module.exports = (sequelize, DataTypes) =>{
    const SubjectArea =  sequelize.define("SubjectArea",{
        area:{
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
        active:{
            type: DataTypes.BOOLEAN,
            allowNull:false,
            validate:{
                notEmpty: true
            }
        },
    });



    return SubjectArea;
}
