

module.exports = (sequelize, DataTypes) =>{
    const AcademicLevel =  sequelize.define("AcademicLevel",{
        
            level:{
                type: DataTypes.STRING,
                allowNull:false,
                validate:{
                    notEmpty: true,
                    unique: true
                }
            },
            active:{
                type: DataTypes.BOOLEAN,
                allowNull:false,
                validate:{
                    notEmpty: true
                }
            },
        },{
            defaultScope: {
               
            },
            scopes:{
                userMode:{
                    where: {
                        active: true
                    }
                } 
            }
        }
    
    );



    return AcademicLevel;
}
