import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
  username: String,
  hashedPassword: String
});

//화살표 함수 사용 시 this가 문서 인스턴스를 못가리킴
//비밀번호를 파라미터로 받아서 계정의 hashedPassword값을 설정 | 1-1.모델 메서드 만들기
UserSchema.methods.setPassword = async function(password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

//파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증 | 1-1.모델 메서드 만들기
UserSchema.methods.checkPassword = async function(password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; //true / false
};

//응답할 데이터에서 hashedPassword 필드 제거
UserSchema.methods.serialize = function() {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

//모델에서 바로 사용할 수 있는 함수 | 1-2.스태틱 메서드 만들기
UserSchema.statics.findByUsername = function(username) {
  return this.findOne({ username });
};

UserSchema.methods.generateToken = function() {
  const token = jwt.sign(
    // 첫번째 파라미터엔 토큰 안에 집어넣고 싶은 데이터를 넣습니다
    {
      _id: this.id,
      username: this.username
    },
    process.env.JWT_SECRET, // 두번째 파라미터에는 JWT 암호를 넣습니다
    {
      expiresIn: "7d" // 7일동안 유효함
    }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);
export default User;
