import { UnauthenticatedError } from "../errors/index.js";

const checkPermission = (requestUser, resourceUserId) => {
    if(requestUser.userId === resourceUserId.toString()) return
    throw new CustomError.UnauthenticatedError('Not authorized to access this route')
}

export default checkPermission