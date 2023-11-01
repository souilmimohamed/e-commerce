import User from "../../schemas/user.schema";
import {
  Credentials,
  IHandle,
  ResponseModel,
  UserModel,
} from "../../shared/models";
import { generateToken } from "../../shared/utils/tokenGenerator";

export class LoginHandler implements IHandle<ResponseModel<string>> {
  private _data: Credentials;
  constructor(credentials: Credentials) {
    this._data = credentials;
  }

  async handle(): Promise<ResponseModel<string>> {
    try {
      let validation = await this.validate();
      if (!validation.Success) {
        return ResponseModel.failureResponse<string>(validation.Errors);
      }
      const { email, password } = this._data;
      const user = (await User.findOne({ email })) as UserModel;
      if (user && user.password === password) {
        const token = generateToken(user);
        return ResponseModel.successResponse<string>(token);
      } else
        return ResponseModel.failureResponse<string>(["Wrong credentials"]);
    } catch (error: any) {
      return ResponseModel.failureResponse<string>([error.message]);
    }
  }

  async validate(): Promise<ResponseModel<string>> {
    return ResponseModel.validationResponse<string>();
  }
}
