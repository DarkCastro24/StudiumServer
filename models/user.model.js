const Mongoose = require(("mongoose"));
const Schema = Mongoose.Schema;

const crypto = require("crypto");
const bcrypt = require("bcrypt");
const debug = require("debug")("app:user-model");
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 5,
        maxlength: 50
    },
    nombre:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 45
    },
    tipo:{
        type: Number,
        enum: [1, 2, 3], // Solo tipo 1,2,3
        default: 2
    },
    imagen:{
        type: String
    },
    hashedPassword: {
        type: String
    },
    salt: {
        type: String
    },
    tokens:{
        type: [String],
        default: []
    },
    num_materias: {
        type: Number,
        default: 0
    },
    cum: {
        type: String,
        default: "0.0"
    },
    materias_interes: [{
        materia: {
            type: String,
            required: true
        },
        promedio:{
            type: String,
            required: true,
            match: /^\d+(\.\d{1,2})?$/ // Formato decimal
        },
    }],
},{ timestamps: true});

userSchema.methods = {
    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return bcrypt.hashSync(password, BCRYPT_ROUNDS);
        } catch (error) {
            debug({error});
            return "";
        }
    },
    makeSalt: function(){
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: async function(password){
        if (!this.hashedPassword || !password) {
            return false;
        }

        try {
            if (this.hashedPassword.startsWith("$2")) {
                return await bcrypt.compare(password, this.hashedPassword);
            }

            const legacyPassword = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000,64,
                `sha512`,
            ).toString("hex");

            return this.hashedPassword === legacyPassword;
        } catch (error) {
            debug({error});
            return false;
        }
    }
}

userSchema
    .virtual("password")
    .set(function(password) {
        const _password = password || process.env.DEFAULT_PASSWORD;
        if (!_password) {
            return;
        }

        this.salt = undefined;
        this.hashedPassword = this.encryptPassword(_password);
});

module.exports = Mongoose.model("User",userSchema);